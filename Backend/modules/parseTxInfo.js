const {decodeTxRaw} = require('@cosmjs/proto-signing');
const {SigningStargateClient, StargateClient} = require('@cosmjs/stargate');
const {toHex} = require("@cosmjs/encoding");
const {sha256} = require("@cosmjs/crypto");
const env = process.env;
const axios = require('axios');


async function extractTxInfo(data) {
    const signingClient = await SigningStargateClient.connect(env.END_POINT);
    const txData = typeof data === "string" ? JSON.parse(data) : data;
    if (txData.result) { // from axios get (query: txHash)
        const {result: {hash, height, tx_result: {gas_wanted: gasWanted, gas_used: gasUsed}}} = txData;
        const block = await axios.get(env.END_POINT + "block?height=" + String(height));
        if (!block || !block.data.result) return null;
        const blockData = block.data;
        const {result: {block: {header: {chain_id: chainId, time}, data: {txs}}}} = blockData;
        const txHashes = txs.map(tx => toHex(sha256(Buffer.from(tx, 'base64'))));
        let fee;
        for (let i = 0; i < txHashes.length; ++i) {
            const txHash = String(txHashes[i]).toUpperCase();
            if (txHash === hash) {
                const txFromHash = await signingClient.getTx(txHash);
                console.log(txFromHash);
                if (!txFromHash) return null;
                const txRaw = txFromHash.tx;
                fee = getFeeFromTxRaw(txRaw);
                const txInfoAfterSigned = decodeTxRaw(txRaw);
                const {body: {messages, memo}} = txInfoAfterSigned;
                const res = { // type : send / get reward / delegate / etc
                    chainId,
                    hash,
                    type: "TBD",
                    status: "TBD",
                    height,
                    time,
                    fee,
                    gas: {gasUsed, gasWanted},
                    memo,
                    messages
                }
                return res;
            }
        }
        return null;
    } else if (txData.height) { // from signing client method
        const {hash, height, gasUsed, gasWanted} = txData;
        const block = await axios.get(env.END_POINT + "block?height=" + String(height));
        if (!block || !block.data.result) return null;
        const blockData = block.data;
        const {result: {block: {header: {chain_id: chainId, time}, data: {txs}}}} = blockData;
        const txHashes = txs.map(tx => toHex(sha256(Buffer.from(tx, 'base64'))));
        let fee;
        for (let i = 0; i < txHashes.length; ++i) {
            const txHash = String(txHashes[i]).toUpperCase();
            if (txHash === hash) {
                const txFromHash = await signingClient.getTx(txHash);
                if (!txFromHash) return null;
                const txRaw = txFromHash.tx;
                fee = getFeeFromTxRaw(txRaw);
                const txInfoAfterSigned = decodeTxRaw(txRaw);
                const {body: {messages, memo}} = txInfoAfterSigned;
                const res = { // type : send / get reward / delegate / etc
                    chainId,
                    hash,
                    type: "TBD",
                    status: "TBD",
                    height,
                    time,
                    fee,
                    gas: {gasUsed, gasWanted},
                    memo,
                    messages
                }
                return res;
            }
        }
        return null;
    } else {
        return null;
    }
}

async function getFeeFromTxRaw(txRaw) {
    const txInfoAfterSigned = decodeTxRaw(txRaw);
    const {authInfo: {fee: {amount}}} = txInfoAfterSigned;
    const fee = {
        amount: 0,
        unit: "uosmo"
    }
    amount.forEach((it) => {
        fee.amount += Number(it.amount);
    });
    return fee;
}

// const txHash = "DF5AE9D7EC95FD2140C75C1794BB95EF5B534AE7570B314C8331BE360D64503D";
// const txFromHash = await signingClient.getTx(txHash);
// const ex = await extractTxInfo(txFromHash);
// console.log(ex);
// const decoder = new TextDecoder();
// console.log(decoder.decode(ex.messages[1].value));

module.exports = { extractTxInfo,getFeeFromTxRaw };