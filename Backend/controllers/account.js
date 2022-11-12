const { AddressToOperatorAddress } = require("../modules/utils");
const { Transaction } = require("../models");
const { StargateClient } = require("@cosmjs/stargate");
const axios = require("axios");
const env = process.env;

module.exports = {
    getAccountDetails: async (req, res) => {
        try {
            const address = req.params.address;
            if (!AddressToOperatorAddress[address]) throw "address is not valid";
            const operatorAddress = AddressToOperatorAddress[address];
            const stakingReward = (await axios.get(env.LCD_END_POINT + "cosmos/distribution/v1beta1/delegators/" + address + "/rewards")).data.total[0].amount;
            const balances = (await axios.get(env.LCD_END_POINT + "cosmos/bank/v1beta1/balances/" + address)).data.balances;
            let availableTokens = 0n;
            balances.forEach(b => {
                if (b.denom === "uosmo") availableTokens += BigInt(b.amount);
            })
            const delegationDataListAsDelegator = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/delegations/" + address)).data.delegation_responses;
            let bondedTokens = 0n;
            delegationDataListAsDelegator.forEach(d => {
                if (d.balance.amount) bondedTokens += BigInt(d.balance.amount);
            });
            const delegationDataListToValidator = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators/" + operatorAddress + "/delegations")).data.delegation_responses;
            let delegations = [];
            for (let d of delegationDataListToValidator) {
                const rewards = (await axios.get(env.LCD_END_POINT + "cosmos/distribution/v1beta1/delegators/" + d.delegation.delegator_address + "/rewards/" + operatorAddress)).data.rewards;
                let reward = 0.0;
                rewards.forEach(r => {
                    if (r.denom === "uosmo") reward += Number(r.amount);
                })
                delegations.push({
                    delegatorAddress: d.delegation.delegator_address,
                    amount: d.balance.amount,
                    reward: reward.toFixed(),
                });
            }
            const client = await StargateClient.connect(process.env.END_POINT);
            const txsData = await client.searchTx({ sentFromOrTo: address }); // 해당 주소와 관련된 모든 트랜잭션 리턴
            let transactions = [];
            for (let i of txsData) {
                const tx = await Transaction.findOne({
                    attributes: ['txHash', 'type', 'status', 'fee', 'height', 'time'],
                    where: { txHash: i.hash }
                })
                transactions.push(tx)
            }
            transactions.sort((a, b) => { //시간순 정렬
                return a.time > b.time ? -1 : a < b ? 1 : 0;
            })
            res.status(200).json({
                stakingReward: Number(stakingReward).toFixed(),
                availableTokens: availableTokens.toString(),
                bondedTokens: bondedTokens.toString(),
                totalTokens: (BigInt(Number(stakingReward).toFixed()) + availableTokens + bondedTokens).toString(),
                votes: [], // voting기능 구현 후 추가
                delegations,
                transactions,
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}