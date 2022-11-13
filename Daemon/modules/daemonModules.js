const axios = require("axios");
const env = process.env;
const { SigningStargateClient } = require('@cosmjs/stargate');
const { Block,Transaction } = require('../models');
const endPoint = env.END_POINT // 노드 주소

async function getCurrentHeight() {
    const signingClient = await SigningStargateClient.connect(endPoint);
    return await signingClient.getHeight();
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

async function subscribeTransaction(){


}

async function pushBlock() {
    setInterval(async function () {
        console.log("start!!")
        let height = await getCurrentHeight()
        let db = await Block.count()
        if (height >= (db + 20)) {
            let blocks = await extractBlocksInfoFromMinHeightToMaxHeight(db + 1, db + 20)
            for (let i of blocks.reverse()) {
                try{
                    await Block.create({
                        chainId: i.chainId,
                        height: i.height,
                        time: i.time,
                        hash: i.hash,
                        numOfTx: i.numOfTxs,
                        proposerAddress: i.proposerAddress
                    });
                    console.log("[Block] "+i.height + "번째 생성완료");
                }catch (e){
                    console.log(e)
                }
            }
            console.log("[Block] created " + (db + 1) + " to " + (db + 20))
        } else if (Number(db) === height) {
            console.log("[Block] Everything is up to date.")

        } else {
            let blocks = await extractBlocksInfoFromMinHeightToMaxHeight(db + 1, height)
            for (let i of blocks.reverse()) {
                try{
                    await Block.create({
                        chainId: i.chainId,
                        height: i.height,
                        time: i.time,
                        hash: i.hash,
                        numOfTx: i.numOfTxs,
                        proposerAddress: i.proposerAddress
                    });
                    console.log("[Block] "+i.height + "번째 생성완료");
                }catch (e){
                    console.log(e)
                }
            }
        }
    }, 5000);
}


async function pushTransaction() {
    setInterval(async function () {
        let recentHeight= await Transaction.max("height")
        if(!recentHeight){
            recentHeight=1;
        }else {
            recentHeight++;
        }
        const transactions = (await axios.get(env.LCD_END_POINT + "txs?tx.minheight=" + recentHeight)).data;
        if(!transactions.txs){
            console.log("[Transaction] Everything is up to date.")
        }else{
            for(let i of transactions.txs){
                let fee = 0;
                for(let j of i.tx.value.fee.amount){
                    fee+=Number(j.amount)
                }
                try{
                    await Transaction.create({
                        chainId:"mintchoco",
                        txHash:i.txhash,
                        type:i.tx.value.msg[0].type.split("/")[1].slice(3),
                        status:i.logs?"Success":"Fail",
                        height:i.height,
                        time:i.timestamp,
                        fee,
                        gasUsed:Number(i.gas_used),
                        gasWanted:Number(i.gas_wanted),
                        memo:i.memo,
                    })
                }catch (e){
                    console.log(e)
                }
                console.log("[Transaction] "+i.txhash+" 생성완료")
            }
        }
    }, 8000);
}

module.exports = {  pushBlock,pushTransaction,subscribeTransaction };