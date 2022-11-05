import { SigningStargateClient } from '@cosmjs/stargate';
import {decodeTxRaw} from '@cosmjs/proto-signing';
import axios from 'axios';
import { toHex } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import "dotenv/config"
import { getFeeFromTxRaw } from './parseTxInfo.js';

export const extractBlockInfo = async(data) => {
    const blockData = typeof data === "string" ? JSON.parse(data) : data;
    if (!blockData.result) return null;
    const {result: {block: {header: {chain_id: chainId, height, time, last_block_id: {hash}, proposer_address: proposerAddress}, data: {txs}, last_commit: {round}}}} = blockData;
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

export const extractBlockInfoFromSub = async(data) => { // subscribe (ws)
    const blockData = typeof data === "string" ? JSON.parse(data) : data;
    if (!blockData.result.data) return null;
    const { result: { data: { value: { block: { header: { chain_id: chainId, height, time, proposer_address: proposerAddress, last_block_id: { hash } }, data: { txs }, last_commit: { round } } } } } } = blockData;
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

export const getExtractedBlockInfoOrNullFromBlock = async (blockHeight) => { //  DB에 블록 정보 저장 및 싱크 맞출 때 사용
    const height = Number(blockHeight);
    const block = await axios.get(process.env.END_POINT + "block?height=" + height);
    if (!block) return null;
    const extractedBlock = await extractBlockInfo(block.data);
    return extractedBlock;
}

export const getExtractedTxsOrNullFromBlock = async (blockHeight) => { // Block 상세 페이지 Transactions (Array로 반환)
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




