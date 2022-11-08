const axios = require("axios");
const env = process.env;
const { decodeTxRaw } = require('@cosmjs/proto-signing');
const { SigningStargateClient, StargateClient } = require('@cosmjs/stargate');
const { toHex } = require("@cosmjs/encoding");
const { sha256 } = require("@cosmjs/crypto");
const { Block } = require('../models');
const { Op } = require("sequelize");
const endPoint = env.END_POINT // 노드 주소

async function getCurrentHeight() {
    const signingClient = await SigningStargateClient.connect(endPoint);
    const height = await signingClient.getHeight();
    return height;
}

async function extractBlocksInfoFromMinHeightToMaxHeight(minHeight, maxHeight) {
    if (typeof minHeight !== "number" || typeof maxHeight !== "number") null;
    if ((maxHeight - minHeight) >= 20) null;
    const blocks = await axios.get(env.END_POINT + "blockchain?minHeight=" + minHeight + "&maxHeight=" + maxHeight);
    if (!blocks || !blocks.data) return null;
    const { result: { last_height: lastHeight, block_metas: blocksInfo } } = blocks.data;
    let result = [];
    blocksInfo.forEach(blockInfo => {
        const {
            block_id: { hash },
            header: { chain_id: chainId, height, time, proposer_address: proposerAddress },
            num_txs: numOfTxs
        } = blockInfo;
        const extractedBlockInfo = {
            chainId,
            height: Number(height),
            time,
            hash,
            numOfTxs: Number(numOfTxs),
            proposerAddress: proposerAddress, // >> moniker
        }
        result.push(extractedBlockInfo);
    });
    return result;
}

async function pushBlock() {
    setInterval(async function () {
        console.log("start!!")
        let height = await getCurrentHeight()
        let db = await Block.count()
        if (height >= (db + 20)) {
            let blocks = await extractBlocksInfoFromMinHeightToMaxHeight(db + 1, db + 20)
            for (let i of blocks.reverse()) {
                await Block.create({
                    chainId: i.chainId,
                    height: i.height,
                    time: i.time,
                    hash: i.hash,
                    numOfTx: i.numOfTxs,
                    proposerAddress: i.proposerAddress
                });
                console.log(i.height + "번째 생성완료");
            }
            console.log("created " + (db + 1) + " to " + (db + 20))
        } else if (Number(db) === height) {
            console.log("Everything is up to date.")

        } else {
            let blocks = await extractBlocksInfoFromMinHeightToMaxHeight(db + 1, height)
            for (let i of blocks.reverse()) {
                await Block.create({
                    chainId: i.chainId,
                    height: i.height,
                    time: i.time,
                    hash: i.hash,
                    numOfTx: i.numOfTxs,
                    proposerAddress: i.proposerAddress
                });
                console.log(i.height + "번째 생성완료");
            }
            console.log("created " + (db + 1) + " to " + height)
        }
    }, 5000);
}


function getFeeFromDecodedTx(decodedTx) {
    const { authInfo: { fee: { amount } } } = decodedTx;
    const fee = {
        amount: 0,
        unit: "uosmo"
    }
    amount.forEach((it) => {
        fee.amount += Number(it.amount);
    });
    return fee;
}

function getMemoFromDecodedTx(decodedTx) {
    return decodedTx.body.memo;
}

async function getBlockHeightListWithTxsFromDB() { // DB로부터 Tx 포함한 블록 height 리스트를 가지고 옴
    let result = [];
    const blocks = await Block.findAll({
        where: {
            numOfTx: {
                [Op.ne]: 0
            }
        }
    })
    blocks.forEach(block => {
        result.push(block.dataValues.height);
    })
    return result;
}

async function getTxInfoListFromBlocksWithTxs(heightList) { // height list로부터 Tx Info 추출해서 리스트로 반환
    if (heightList.length === 0) throw "The length of list is zero";
    let result = [];
    for (let i = 0; i < heightList.length; ++i) {
        const block = await axios.get(env.END_POINT + "block?height=" + String(heightList[i])); // node api (block 정보 필요한 것들)
        if (!block || !block.data) throw "block data is not valid"
        const blockData = block.data;
        const { result: { block: { header: { chain_id: chainId, time, height }, data: { txs } } } } = blockData; // chainId, time, height, txs
        for (let j = 0; j < txs.length; ++j) {
            const txRaw = Buffer.from(txs[j], 'base64');
            const decodedTx = decodeTxRaw(txRaw);
            const { body: { messages } } = decodedTx;
            const type = messages[0].typeUrl.split(".")[3].slice(3); // type
            const memo = getMemoFromDecodedTx(decodedTx); // memo
            const fee = getFeeFromDecodedTx(decodedTx); // fee
            const hash = String(toHex(sha256(txRaw))).toUpperCase(); // hash
            if (!hash) throw "tx hash is not valid";
            const tx = await axios.get(env.END_POINT + "tx?hash=0x" + hash); // node api (tx 정보 필요한 것들)
            const { result: { tx_result: { gas_wanted: gasWanted, gas_used: gasUsed, log } } } = tx.data;
            const status = log[0] === "[" ? "Success" : "Fail";
            const extractedTxInfo = {
                chainId,
                hash,
                type,
                status,
                height,
                time,
                fee,
                gas: { gasUsed, gasWanted },
                memo,
            }
            result.push(extractedTxInfo);
        }
    }
    return result;
}

module.exports = { extractBlocksInfoFromMinHeightToMaxHeight, getCurrentHeight, pushBlock, getTxInfoListFromBlocksWithTxs };