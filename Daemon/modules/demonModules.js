const axios = require("axios");
const env = process.env;
const {SigningStargateClient} = require('@cosmjs/stargate');
const endPoint = env.END_POINT // 노드 주소
const {Block} = require("../models")

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
    const {result: {last_height: lastHeight, block_metas: blocksInfo}} = blocks.data;
    let result = [];
    blocksInfo.forEach(blockInfo => {
        const {
            block_id: {hash},
            header: {chain_id: chainId, height, time, proposer_address: proposerAddress},
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
                console.log(i.height+"번째 생성완료");
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
                console.log(i.height+"번째 생성완료");
            }
            console.log("created " + (db + 1) + " to " + height)
        }
    }, 5000);


}

module.exports = {extractBlocksInfoFromMinHeightToMaxHeight, getCurrentHeight, pushBlock};