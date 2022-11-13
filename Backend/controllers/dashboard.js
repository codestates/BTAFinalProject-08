const axios = require("axios");
const { Block, Transaction } = require("../models");
const env = process.env;

module.exports = {
    getDashboardData: async (req, res) => {
        try {
            const height = await Block.max("height");
            const transactions = await Transaction.count();
            const bondedTokens = (await axios.get(env.LCD_END_POINT + "staking/pool")).data.result.bonded_tokens;
            const totalSupply = (await axios.get(env.LCD_END_POINT + "cosmos/bank/v1beta1/supply/uosmo")).data.amount.amount;
            const communityPool = (await axios.get(env.LCD_END_POINT + "cosmos/distribution/v1beta1/community_pool")).data.pool[0].amount.split(".")[0];
            const activeValidators = (await axios.get(env.LCD_END_POINT + "cosmos/base/tendermint/v1beta1/validatorsets/latest")).data.validators.length;
            const votingPeriodProposals = (await axios.get(env.LCD_END_POINT + "gov/proposals?status=voting_period")).data.result;
            let votingPeriod = [];
            const lenOfProposals = votingPeriodProposals.length;
            for (let i = 0; i < lenOfProposals; i++) {
                votingPeriod.push({
                    id: votingPeriodProposals[lenOfProposals - i - 1].id,
                    title: votingPeriodProposals[lenOfProposals - i - 1].content.value.title,
                })
            }
            res.status(200).json({
                height,
                transactions,
                bondedTokens,
                totalSupply,
                communityPool,
                activeValidators,
                totalValidators: 3,
                votingPeriod,
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
}