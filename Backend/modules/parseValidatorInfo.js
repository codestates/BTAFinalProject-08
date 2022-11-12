const env = process.env;
const axios = require('axios');
const { Block } = require('../models');
const { MonikerToAddressInfo } = require('./utils');
require("dotenv").config();

const loadValidatorsInfo = async () => {
    const validators = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators")).data.validators;
    const activeValidators = (await axios.get(env.LCD_END_POINT + "cosmos/base/tendermint/v1beta1/validatorsets/latest")).data.validators;
    const activePubKeyToVotingPower = new Map();
    activeValidators.forEach(v => {
        activePubKeyToVotingPower.set(v.pub_key.key, v.voting_power);
    })
    const validatorInfoList = validators.map(v => {
        const { description: { moniker }, commission: { commission_rates: { rate } } } = v;
        const pubKey = MonikerToAddressInfo[moniker].pubKey;
        const votingPower = activePubKeyToVotingPower.get(pubKey) ? activePubKeyToVotingPower.get(pubKey) : "Inactive Validator";
        const addressInfo = MonikerToAddressInfo[moniker];
        return {//  participation(voting 기능 구현 후), totalProposals(voting 기능 구현 후)
            moniker,
            addressInfo,
            votingPower,
            participation: "TBD",
            totalProposals: "TBD",
            isActive: activePubKeyToVotingPower.get(pubKey) ? true : false,
            commistion: rate
        }
    });
    const activationData = (await axios.get(env.LCD_END_POINT + "cosmos/base/tendermint/v1beta1/validatorsets/latest")).data;
    const activeValidatorNum = activationData.validators.length;
    const bondedTokens = (await axios.get(env.LCD_END_POINT + "staking/pool")).data.result.bonded_tokens;
    const blocks = await Block.findAll({
        attributes: ['height', 'time'],
        order: [["height", "DESC"]],
        offset: 0,
        limit: 3
    })
    const height = blocks[0].height;
    return {
        height,
        activeValidatorNum,
        totalValidatorNum: validatorInfoList.length,
        bondedTokens,
        blockTimeInMs: new Date(blocks[0].time) - new Date(blocks[2].time),
        validators: validatorInfoList
    }
}

const loadValidatorDetails = async (operatorAddress, blockLimit) => {
    const validatorSetData = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators/" + operatorAddress)).data;
    const { description: { moniker, website, details }, commission: { commission_rates: { rate } } } = validatorSetData.validator;
    const addressInfo = MonikerToAddressInfo[moniker];
    const activeValidatorsData = (await axios.get(env.LCD_END_POINT + "cosmos/base/tendermint/v1beta1/validatorsets/latest")).data;
    let isActive = false;
    let votingPower = "Inactive Validator";
    let bondedHeight = "Inactive for the last block";
    activeValidatorsData.validators.forEach(v => {
        if (v.pub_key.key === addressInfo.pubKey) {
            isActive = true;
            votingPower = v.voting_power;
            bondedHeight = activeValidatorsData.block_height;
        }
    });
    const delegationDataList = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators/" + operatorAddress + "/delegations")).data.delegation_responses;
    let selfBonded = "0";
    const delegators = delegationDataList.map(d => {
        if (d.delegation.delegator_address === addressInfo.address) selfBonded = d.balance.amount;
        return {
            delegatorAddress: d.delegation.delegator_address,
            amount: d.balance.amount,
        }
    });
    const Blocks = await Block.findAll({
        attributes: ['height', 'hash', 'numOfTx', 'time'],
        where: {
            proposerAddress: addressInfo.hex,
        },
        order: [["height", "DESC"]],
        offset: 0,
        limit: blockLimit
    })
    const proposedBlocks = Blocks.map(b => {
        return b.dataValues;
    })
    return {
        moniker,
        addressInfo,
        website,
        commission: rate,
        isActive,
        votingPower,
        bondedHeight,
        selfBonded,
        details,
        proposedBlocks,
        delegators,
        votes: [] // voting 기능 추가 후 구현
    }
}

module.exports = { loadValidatorsInfo, loadValidatorDetails };
