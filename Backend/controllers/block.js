const { osmosis, getSigningOsmosisClient, cosmos } = require("osmojs");
const { SigningStargateClient, StargateClient } = require('@cosmjs/stargate');
const env = process.env;
const { Block, Transaction } = require("../models");
const { extractBlockInfo } = require('../modules/parseBlockInfo');
const axios = require("axios");
const {loadValidatorsInfo} = require("../modules/parseValidatorInfo");


const endPoint = env.END_POINT // 노드 주소

// const {createRPCQueryClient} = osmosis.ClientFactory;
// await createRPCQueryClient({rpcEndpoint: endPoint})
// await StargateClient.connect(endPoint)

module.exports = {
    // getBlockHeight: async (req, res) => { // 블록 높이 리턴
    //     try {
    //         const signingClient = await SigningStargateClient.connect(endPoint);
    //         const height_signing = await signingClient.getHeight();
    //         res.status(200).json(height_signing);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },
    //
    // getBlockInfoFromHeight: async (req, res) => { //  해당 height 의 블록 정보 리턴
    //     try {
    //         const height = Number(req.query.height);
    //         // console.log(typeof height);
    //         const block = await axios.get(process.env.END_POINT + "block?height=" + height);
    //         const extractedBlock = await extractBlockInfo(block.data);
    //         if (!extractedBlock) "Parsed block is null!";
    //         // console.log(parsedBlock);
    //         // const block_signing = await signingClient.getBlock(height);
    //         res.status(200).json(extractedBlock);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },

    getRecentBlock: async (req, res) => { //  최근 limit 개의 블록 정보 리턴
        try {
            let limit = Number(req.query.limit);
            if (isNaN(limit)) {
                limit = 1;
            }
            let recentBlocks = await Block.findAll({
                attributes:['height', 'proposerAddress' ,'time','numOfTx'],
                order: [["height", "DESC"]],
                offset: 0,
                limit: limit
            })
            const validators = await loadValidatorsInfo();
            for(let i of recentBlocks){
                for(let j of validators.validators)
                if(i.proposerAddress===j.addressInfo.hex){
                    console.log(i.proposerAddress)
                    console.log(j.addressInfo.hex)
                    i.setDataValue("moniker",j.moniker)
                    i.setDataValue("operatorAddress",j.addressInfo.operatorAddress)
                }
            }
            res.status(200).json(recentBlocks);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getBlock: async (req, res) => { //  해당 height 의 블록 정보 리턴
        try {
            const height = req.query.height;
            let gasUsed=0;
            let gasWanted=0;
            let block = await Block.findOne({
                where: { height: height },
            })
            const transactions = await Transaction.findAll({
                attributes:['gasUsed','gasWanted'],
                where: { height: height },
            })
            for(let i of transactions){
                gasUsed+=i.gasUsed
                gasWanted+=i.gasWanted
            }
            const validators = await loadValidatorsInfo();
            for(let j of validators.validators)
                if(block.proposerAddress===j.addressInfo.hex){
                    block.setDataValue("moniker",j.moniker)
                    block.setDataValue("operatorAddress",j.addressInfo.operatorAddress)
                }
            block.setDataValue("gasWanted", gasWanted);
            block.setDataValue("gasUsed", gasUsed);
            res.status(200).json(block);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getBlockDetailsFromHeight: async (req, res) => {
        try {
            const height = req.query.height;
            const block = await Block.findOne({
                where: { height: height },
            })
            const txs = await Transaction.findAll({
                where: { height: height },
            })
            const blockDetails = {
                blockInfo: block,
                txs
            }
            res.status(200).json(blockDetails);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }



}

