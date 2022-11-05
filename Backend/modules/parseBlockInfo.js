// gas used/wanted 추가해야함
const { SigningStargateClient } = require('@cosmjs/stargate');
const { toHex } = require ("@cosmjs/encoding");
const { sha256 } = require ("@cosmjs/crypto");
const {Block} = require("../models");
const {DATE} = require("sequelize");
const {getFeeFromTxRaw,extractTxInfo} = require("./parseTxInfo");
const axios = require("axios");
const env = process.env;

    async function extractBlockInfo(data) {
        console.log("asdddd")
        const blockData = typeof data === "string" ? JSON.parse(data) : data;
        if (!blockData.result) return null;
        const { result: { block_id: { hash }, block: { header: { chain_id: chainId, height, time, proposer_address: proposerAddress }, data: { txs }, last_commit: { round } } } } = blockData;
        const gas = await getTotalGasFromBlock(height);
        const res = {
            chainId,
            height,
            time,
            hash,
            numOfTx: txs.length,
            gas,
            round,
            proposerAddress, // >> moniker
            txs // tx base64 Encoding >> txHashes array (FE)
        }
        return res;
    }

    async function extractBlockInfoFromSub(data)  { // for subscription (websocket)
        const blockData = typeof data === "string" ? JSON.parse(data) : data;
        if (!blockData.result.data) return null;
        const { result: { data: { value: { block: { header: { chain_id: chainId, height, time, proposer_address: proposerAddress, last_block_id: { hash } }, data: { txs }, last_commit: { round } } } } } } = blockData;
        const gas = await getTotalGasFromBlock(height);
        const res = {
            chainId,
            height,
            time,
            lastBlockHash: hash,
            numOfTx: txs.length,
            gas,
            round,
            proposerAddress,
            txs
        }
        return res;
    }

    async function getTotalGasFromBlock(blockHeight)  {
        const signingClient = await SigningStargateClient.connect(process.env.END_POINT);
        const signedBlock = await signingClient.getBlock(Number(blockHeight));
        const txs = [...signedBlock.txs];
        let result = {
            gasUsed: 0,
            gasWanted: 0,
        }
        if (txs.length === 0) return result;
        for (let i = 0; i < txs.length; ++i) {
            const txHash = toHex(sha256(Buffer.from(txs[i], "base64")));
            const txInfo = await signingClient.getTx(txHash);
            if (txInfo === null) return result;
            const { gasUsed, gasWanted } = txInfo;
            result.gasUsed += gasUsed;
            result.gasWanted += gasWanted;
        }
        return result;
    }
    async function getExtractedBlockInfoOrNullFromBlock(blockHeight) {
        const height = Number(blockHeight);
        const block = await axios.get(process.env.END_POINT + "block?height=" + String(height));
        const data = block.data;
        const blockData = typeof data === "string" ? JSON.parse(data) : data;
        if (!blockData.result) return null;
        const { result: { block: { header: { time }, data: { txs } } } } = blockData;
        const txHashes = txs.map(tx => toHex(sha256(Buffer.from(tx,'base64'))));
        const signingClient = await SigningStargateClient.connect(process.env.END_POINT);
        let extractedTxs = [];
        for(let i = 0; i < txHashes.length; ++i) {
            const txHash = String(txHashes[i]).toUpperCase();
            const txFromHash = await signingClient.getTx(txHash);
            if (!txFromHash) return null;
            const txRaw = txFromHash.tx;
            const fee = getFeeFromTxRaw(txRaw);
            const extractedTx = { // type, result, amount 현재 구현 안되어있음 추후 개발 예정
                txHash,
                type: "TBD",
                result: "TBD",
                amount: "TBD",
                fee,
                height,
                time
            }
            extractedTxs.push(extractedTx);
        }
        return extractedTxs;
    }


module.exports = { extractBlockInfo,extractBlockInfoFromSub,getTotalGasFromBlock,getExtractedBlockInfoOrNullFromBlock, };
