const env = process.env;
const axios = require('axios');
const { TxTypes, getAddressFromPubKey, VoteOptions } = require('./utils');
require("dotenv").config();

const extractMessagesFromTxHash = async (txHash) => {
    const txData = (await axios.get(env.LCD_END_POINT + "txs?tx.hash=" + txHash)).data;
    if (!txData) return null;
    const txInfo = txData.txs[0];
    const { tx: { value: { msg } }, logs } = txInfo;
    const txType = msg[0].type.split('/')[1].slice(3);
    let messages = [];
    switch (txType) {
        case TxTypes.SEND:
            messages = msg.map(m => {
                const { value: { from_address: fromAddress, to_address: toAddress, amount } } = m;
                let totalAmount = 0n;
                amount.forEach(amnt => {
                    totalAmount += BigInt(amnt.amount);
                });
                return {
                    txType,
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
                    txType,
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
                    txType,
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
                        txType,
                        delegatorAddress,
                        validatorAddress,
                        amount: amount.toString()
                    })
                }
            });
            return messages;
        case TxTypes.SUBMIT_PROPOSAL:
            messages = msg.map(m => {
                const { value: { content: { value: { title, description } }, initial_deposit: deposit, proposer } } = m;
                return {
                    txType,
                    title,
                    description,
                    initialDeposit: deposit[0].amount,
                    proposer,
                }
            });
            return messages;
        case TxTypes.DEPOSIT:
            messages = msg.map(m => {
                const { value: { proposal_id: proposalId, depositor, amount } } = m;
                return {
                    txType,
                    proposalId,
                    depositor,
                    amount: amount[0].amount,
                }
            });
            return messages;
        case TxTypes.VOTE:
            messages = msg.map(m => {
                const { value: { proposal_id: proposalId, voter, option } } = m;
                return {
                    txType,
                    proposalId,
                    voter,
                    option,
                }
            });
            return messages;
        default:
            return null;
    }
}

module.exports = { extractMessagesFromTxHash };