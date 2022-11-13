const env = process.env;
const axios = require('axios');
const { Block } = require('../models');
const Transaction = require('../models/Transaction');
const { MonikerToAddressInfo, VoteOptions } = require('./utils');
require("dotenv").config();

const loadValidatorsInfo = async () => {
    const validators = (await axios.get(env.LCD_END_POINT + "cosmos/staking/v1beta1/validators")).data.validators;
    const activeValidators = (await axios.get(env.LCD_END_POINT + "cosmos/base/tendermint/v1beta1/validatorsets/latest")).data.validators;
    const activePubKeyToVotingPower = new Map();
    activeValidators.forEach(v => {
        activePubKeyToVotingPower.set(v.pub_key.key, v.voting_power);
    });
    let validatorInfoList = [];
    for (const v of validators) {
        const { description: { moniker }, commission: { commission_rates: { rate } } } = v;
        const pubKey = MonikerToAddressInfo[moniker].pubKey;
        const votingPower = activePubKeyToVotingPower.get(pubKey) ? activePubKeyToVotingPower.get(pubKey) : "Inactive Validator";
        const addressInfo = MonikerToAddressInfo[moniker];
        const totalProposals = (await axios.get(env.LCD_END_POINT + "gov/proposals")).data.result.length; // length
        let participation = 0;
        for (let i = 0; i < totalProposals; i++) {
            const votes = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals/" + String(3 + i) + "/votes")).data.votes;
            for (const v of votes) {
                if (v.voter === addressInfo.address) ++participation;
            }
        }
        validatorInfoList.push({
            moniker,
            addressInfo,
            votingPower,
            participation,
            totalProposals,
            isActive: activePubKeyToVotingPower.get(pubKey) ? true : false,
            commistion: rate,
        });
    }
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
    for (const v of activeValidatorsData.validators) {
        if (v.pub_key.key === addressInfo.pubKey) {
            isActive = true;
            votingPower = v.voting_power;
            bondedHeight = activeValidatorsData.block_height;
            break;
        }
    }
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
    });
    const proposedBlocks = Blocks.map(b => {
        return b.dataValues;
    });
    let votes = [];
    const proposalList = (await axios.get(env.LCD_END_POINT + "gov/proposals")).data.result;
    const lenOfProposals = proposalList.length;
    for (let i = 0; i < lenOfProposals; ++i) {
        const { id, content: { value: { title } } } = proposalList[lenOfProposals - i - 1];
        const votesResult = (await axios.get(env.LCD_END_POINT + "gov/proposals/" + id + "/votes")).data.result;
        let answer = "Did not vote";
        for (const v of votesResult) {
            if (v.voter === addressInfo.address) {
                const option = v.option;
                answer = VoteOptions[option];
                break;
            }
        }
        const limit = 10000000;
        const minHeight = 30000;
        const txsData = (await axios.get(env.LCD_END_POINT + "txs?message.action=/cosmos.gov.v1beta1.MsgVote&message.sender=" + addressInfo.address + "&limit=" + limit + "&tx.minheight=" + minHeight)).data;
        let txHash = "";
        let timeSubmitted = "";
        const txs = txsData.txs ? txsData.txs : [];
        const lenOfTxs = txs.length;
        for (let i = 0; i < txs.length; ++i) {
            const proposalId = txs[lenOfTxs - i - 1].tx.value.msg[0].value.proposal_id;
            if (proposalId == id) {
                txHash = txs[lenOfTxs - i - 1].txhash;
                timeSubmitted = txs[lenOfTxs - i - 1].timestamp;
                break;
            }
        }
        votes.push({
            id,
            title,
            txHash,
            answer,
            timeSubmitted,
        });
    }
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
        votes, // txHash(해당 id vote한 것 중 가장 최신이고 Success), Time Submitted(트잭 타임)
    }
}

module.exports = { loadValidatorsInfo, loadValidatorDetails };
