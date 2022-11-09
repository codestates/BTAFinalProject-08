const { decodeTxRaw } = require('@cosmjs/proto-signing');
const { SigningStargateClient, StargateClient } = require('@cosmjs/stargate');
const { toHex } = require("@cosmjs/encoding");
const { sha256 } = require("@cosmjs/crypto");
const env = process.env;
const axios = require('axios');
const { Block } = require('../models');
const { Op } = require("sequelize");
const { TxTypes, getAddressFromPubKey } = require('./utils');
require("dotenv").config();

const extractMessagesFromTxHash = async (txHash) => {
    const txData = (await axios.get(env.LCD_END_POINT + "txs?tx.hash=" + txHash)).data;
    if (!txData) return null;
    const txInfo = txData.txs[0];
    const { tx: { value: { msg } }, logs } = txInfo;
    const txType = msg[0].type.split('/')[1].slice(3);
    let messages = [];
    console.log(txType);
    switch (txType) {
        case TxTypes.SEND:
            messages = msg.map(m => {
                const { value: { from_address: fromAddress, to_address: toAddress, amount } } = m;
                let totalAmount = 0n;
                amount.forEach(amnt => {
                    totalAmount += BigInt(amnt.amount);
                });
                return {
                    fromAddress,
                    toAddress,
                    amount: totalAmount.toString(),
                }
            });
            return messages;
        case TxTypes.CREATE_VALIDATOR:
            messages = msg.map(m => {
                const { description: { moniker }, delegator_address: delegatorAddress, validator_address: validatorAddress, pubkey } = m.value;
                const address = getAddressFromPubKey(pubkey);
                return {
                    moniker,
                    delegatorAddress,
                    validatorAddress,
                    address,
                }
            })
            return messages;
        case TxTypes.DELEGATE:
            messages = msg.map(m => {
                const { value: { delegator_address: delegatorAddress, validator_address: validatorAddress, amount: { amount } } } = m;
                return {
                    delegatorAddress,
                    validatorAddress,
                    amounts: BigInt(amount).toString()
                }
            })
            return messages;
        case TxTypes.WITHDRAW_DELEGATOR_REWARD:
            msg.forEach(m => {
                const { value: { delegator_address: delegatorAddress, validator_address: validatorAddress } } = m;
                let amount = 0n;
                const events = logs[0].events;
                events.forEach(e => {
                    if (e.type === "withdraw_rewards") {
                        const attributes = e.attributes;
                        attributes.forEach(a => {
                            if (a.key === "amount") amount += BigInt(a.value.slice(0, -5));
                        });
                    }
                });
                if (delegatorAddress) {
                    messages.push({
                        delegatorAddress,
                        validatorAddress,
                        amount: amount.toString()
                    })
                }
            });
            return messages;
        default:
            return null;
    }
}

module.exports = { extractMessagesFromTxHash };