const { Block, Transaction } = require("../models");
const { loadValidatorsInfo } = require("../modules/parseValidatorInfo");


module.exports = {
    getRecentBlock: async (req, res) => { //  최근 limit 개의 블록 정보 리턴
        try {
            let limit = Number(req.query.limit);
            if (isNaN(limit)) {
                limit = 1;
            }
            let recentBlocks = await Block.findAll({
                attributes: ['height', 'proposerAddress', 'time', 'numOfTx','hash'],
                order: [["height", "DESC"]],
                offset: 0,
                limit: limit
            })
            const validators = await loadValidatorsInfo();
            for (let i of recentBlocks) {
                for (let j of validators.validators)
                    if (i.proposerAddress === j.addressInfo.hex) {
                        i.setDataValue("moniker", j.moniker)
                        i.setDataValue("operatorAddress", j.addressInfo.operatorAddress)
                    }
            }
            res.status(200).json(recentBlocks);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // getBlock: async (req, res) => { //  해당 height 의 블록 정보 리턴
    //     try {
    //         const height = req.query.height;
    //         let gasUsed=0;
    //         let gasWanted=0;
    //         let block = await Block.findOne({
    //             where: { height: height },
    //         })
    //         const transactions = await Transaction.findAll({
    //             attributes:['gasUsed','gasWanted'],
    //             where: { height: height },
    //         })
    //         for(let i of transactions){
    //             gasUsed+=i.gasUsed
    //             gasWanted+=i.gasWanted
    //         }
    //         const validators = await loadValidatorsInfo();
    //         for(let j of validators.validators)
    //             if(block.proposerAddress===j.addressInfo.hex){
    //                 block.setDataValue("moniker",j.moniker)
    //                 block.setDataValue("operatorAddress",j.addressInfo.operatorAddress)
    //             }
    //         block.setDataValue("gasWanted", gasWanted);
    //         block.setDataValue("gasUsed", gasUsed);
    //         res.status(200).json(block);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },

    getBlockDetailsFromHeight: async (req, res) => {
        try {
            const height = req.query.height;
            let gasUsed = 0;
            let gasWanted = 0;
            const block = await Block.findOne({
                where: { height: height },
            })
            const validators = await loadValidatorsInfo();
            for (let i of validators.validators)
                if (block.proposerAddress === i.addressInfo.hex) {
                    block.setDataValue("moniker", i.moniker)
                    block.setDataValue("operatorAddress", i.addressInfo.operatorAddress)
                }
            const txs = await Transaction.findAll({
                where: { height: height },
            })
            for (let j of txs) {
                gasUsed += j.gasUsed
                gasWanted += j.gasWanted
            }
            block.setDataValue("gasUsed", gasUsed)
            block.setDataValue("gasWanted", gasWanted)
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

