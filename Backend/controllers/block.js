const { osmosis, getSigningOsmosisClient, cosmos } = require("osmojs");
const { SigningStargateClient, StargateClient } = require('@cosmjs/stargate');
const env = process.env;
const { Block, Transaction } = require("../models");
const { extractBlockInfo } = require('../modules/parseBlockInfo');
const axios = require("axios");


const endPoint = env.END_POINT // 노드 주소

// const {createRPCQueryClient} = osmosis.ClientFactory;
// await createRPCQueryClient({rpcEndpoint: endPoint})
// await StargateClient.connect(endPoint)

module.exports = {
    getBlockHeight: async (req, res) => { // 블록 높이 리턴
        try {
            const signingClient = await SigningStargateClient.connect(endPoint);
            const height_signing = await signingClient.getHeight();
            res.status(200).json(height_signing);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getBlockInfoFromHeight: async (req, res) => { //  해당 height 의 블록 정보 리턴
        try {
            const height = Number(req.query.height);
            // console.log(typeof height);
            const block = await axios.get(process.env.END_POINT + "block?height=" + height);
            const extractedBlock = await extractBlockInfo(block.data);
            if (!extractedBlock) "Parsed block is null!";
            // console.log(parsedBlock);
            // const block_signing = await signingClient.getBlock(height);
            res.status(200).json(extractedBlock);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getRecentBlock: async (req, res) => { //  최근 limit 개의 블록 정보 리턴
        try {
            let limit = Number(req.query.limit);
            if (isNaN(limit)) {
                limit = 1;
            }
            console.log(limit)
            const recentBlocks = await Block.findAll({
                order: [["height", "DESC"]],
                offset: 0,
                limit: limit
            })
            res.status(200).json(recentBlocks);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getBlock: async (req, res) => { //  해당 height 의 블록 정보 리턴
        try {
            const height = req.query.height;
            const block = await Block.findOne({
                where: { height: height },
            })
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

