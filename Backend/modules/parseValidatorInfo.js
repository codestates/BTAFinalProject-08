const env = process.env;
const axios = require('axios');
const { Block } = require('../models');
const { Op } = require("sequelize");
const { MonikerToAddressInfo } = require('./utils');
require("dotenv").config();

const loadValidatorsInfo = async () => {
    const validatorSetData = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators")).data;
    const { validators } = validatorSetData;
    const validatorInfoList = validators.map(v => {
        const { tokens, delegator_shares: delegatorShares, description: { moniker }, commission: { commission_rates: { rate } } } = v;
        const addressInfo = MonikerToAddressInfo[moniker];
        return {
            moniker,
            addressInfo,
            tokens,
            delegatorShares,
            commistionRate: rate
        }
    });
    const height = await Block.max("height");
    const activeValidatorNum = 3;
    const blockTime = 10;
    return {
        height,
        activeValidatorNum,
        totalValidatorNum: validatorInfoList.length,
        blockTime,
        validators: validatorInfoList
    }
}

const loadValidatorDetails = async (operatorAddress) => {
    const validatorSetData = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators/" + operatorAddress)).data;
    const { tokens, delegator_shares: delegatorShares, description: { moniker, website, details }, commission: { commission_rates: { rate } } } = validatorSetData.validator;
    const addressInfo = MonikerToAddressInfo[moniker];
    return {
        moniker,
        addressInfo,
        tokens,
        delegatorShares,
        commistionRate: rate,
        website,
        details
    }
}

module.exports = { loadValidatorsInfo, loadValidatorDetails };
