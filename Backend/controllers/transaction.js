const {Transaction} = require("../models");
const {StargateClient} = require("@cosmjs/stargate");

module.exports = {
    // getTxHashFromTxRaw: async (req, res) => { // txRaw로부터 해당 트랜잭션 해쉬 리턴 Tx Raw to Tx Hash
    //     try {
    //         let { txRaw } = req.body;
    //         console.log(txRaw)
    //         const txHash_signing = toHex(sha256(Buffer.from(txRaw, 'base64')));
    //         res.status(200).json(txHash_signing);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },
    //
    // getTxInfoFromTxRaw: async (req, res) => { // txRaw로부터 해당 트랜잭션 정보 리턴
    //     try {
    //         let { txRaw } = req.body;
    //         const txInfo_signing = decodeTxRaw(txRaw);
    //         res.status(200).json(txInfo_signing);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },
    //
    // getTxInfoFromTxHash: async (req, res) => { // txHash로부터 해당 트랜잭션 정보 리턴
    //     try {
    //         const signingClient = await SigningStargateClient.connect(endPoint)
    //         let txHash = req.query.hash;
    //         const txInfoAfterSigned = await signingClient.getTx(txHash);
    //         const extractedTx = await extractTxInfo(txInfoAfterSigned);
    //         res.status(200).json(extractedTx);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // },
    getRecentTransaction: async (req, res) => { //  최근 limit 개의 트랜잭션 정보 리턴
        try {
            let limit = Number(req.query.limit);
            if (isNaN(limit)) {
                limit = 1;
            }
            const recentTransactions = await Transaction.findAll({
                attributes:['txHash','type','height','time'],
                order: [["time", "DESC"]],
                offset: 0,
                limit: limit
            })
            res.status(200).json(recentTransactions);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getTransaction: async (req, res) => { //  해당 txHash 의 트랜잭션 정보 리턴
        try {
            const txHash = req.query.hash;
            const tx = await Transaction.findOne({
                where: { txHash: txHash },
            })
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getTransactionFromHeight: async (req, res) => { //  해당 height에 속한 트랜잭션 정보 리턴
        try {
            const height = req.query.height;
            const tx = await Transaction.findAll({
                where: { height: height },
            })
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getTransactionsFromAddress: async (req, res) => {
        try {
            const address = req.params.address;
            const client = await StargateClient.connect(process.env.END_POINT)
            let transactions = await client.searchTx({sentFromOrTo:address}) // 해당 주소와 관련된 모든 트랜잭션 리턴
            let resultObject=[]
            for(let i of transactions){
                const tx=await Transaction.findOne({
                    attributes:['txHash','type','status','fee','height','time'],
                    where: { txHash: i.hash }
                })
                resultObject.push(tx)
            }
            resultObject.sort(function(a, b) { //시간순 정렬
                return a.time>b.time ? -1 : a<b ? 1 : 0;
            })
            res.status(200).json(resultObject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

}