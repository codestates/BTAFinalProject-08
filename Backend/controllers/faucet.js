const { osmosis, getSigningOsmosisClient, cosmos } = require("osmojs");
const { SigningStargateClient, StargateClient } = require('@cosmjs/stargate');
const env = process.env;
const endPoint = env.END_POINT // 노드 주소



module.exports = {


    getOsmo: async (req, res) => { //  해당 height 의 블록 정보 리턴
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

    sendOsmosis: async (toAddress) => {  // 입력한 양의 코인을 송금한 후 해당 트랜잭션 정보 리턴
        const {send} = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
        const msg = send({
            amount: [
                {
                    denom: 'uosmo',
                    amount: 1000000
                }
            ],
            toAddress: toAddress,
            fromAddress: fromAddress
        });

        const fee = {
            amount: [
                {
                    denom: 'uosmo',
                    amount: feeAmount.amount.amount
                }
            ],
            gas: feeAmount.gas
        };
        return await signingClient.signAndBroadcast(fromAddress, [msg], fee);
    },








}

