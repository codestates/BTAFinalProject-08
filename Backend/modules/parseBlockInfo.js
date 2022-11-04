// gas used/wanted 추가해야함
import { SigningStargateClient } from '@cosmjs/stargate';
import { toHex } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import "dotenv/config"

export const parseBlock = async(data) => {
    const blockInfo = JSON.parse(data);
    if (!blockInfo.result) return {};
    const {result: {block: {header: {chain_id: chainId, height, time, last_block_id: {hash}, proposer_address: proposerAddress}, data: {txs}, last_commit: {round}}}} = blockInfo;
    const gas = await getTotalGasFromBlock(height);
    const res = {
        chainId,
        height,
        time,
        hash,
        numOfTx: txs.length,
        gas,
        round,
        proposerAddress,
        txs
    }
    return res;
}

// gas used/wanted 추가해야함
export const parseBlockFromSub = async(data) => {
    const blockInfo = JSON.parse(data);
    if (!blockInfo.result.data) return {};
    const { result: { data: { value: { block: { header: { chain_id: chainId, height, time, proposer_address: proposerAddress, last_block_id: { hash } }, data: { txs }, last_commit: { round } } } } } } = blockInfo;
    const gas = await getTotalGasFromBlock(height);
    const res = {
        chainId,
        height,
        time,
        hash,
        numOfTx: txs.length,
        gas,
        round,
        proposerAddress,
        txs
    }
    return res;
}

export const getTotalGasFromBlock = async (blockHeight) => {
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
