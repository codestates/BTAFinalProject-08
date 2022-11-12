const { chains } = require("chain-registry");
const { getOfflineSignerProto } = require("cosmjs-utils");
const { FEES } = require("osmojs");
const { SigningStargateClient } = require("@cosmjs/stargate");
const env = process.env;
const endPoint = env.END_POINT // 노드 주소
const faucetMnemonic = env.FAUCET_MNEMONIC // faucet의 니모닉 키

module.exports = {
    staking: async (req, res) => { //  스테이킹
        try {
            const { validatorAddress, amount, memo } = req.body;
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const delegatorAddress = faucetAccount[0].address
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.

            // 신경써주셔야 할것
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const tx = await signingClient.delegateTokens(delegatorAddress, validatorAddress, { denom: 'uosmo', amount: amount }, feeAmount, memo)
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    unStaking: async (req, res) => { //  언스테이킹
        try {
            const { validatorAddress, amount, memo } = req.body;
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const delegatorAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
            const tx = await signingClient.undelegateTokens(delegatorAddress, validatorAddress, { denom: 'uosmo', amount: amount }, feeAmount, memo)
            res.status(200).json(tx.transactionHash);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getStakingReward: async (req, res) => { //  스테이킹리워드
        try {
            const { validatorAddress, memo } = req.body;
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const delegatorAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
            const tx = await signingClient.withdrawRewards(delegatorAddress, validatorAddress, feeAmount, memo)
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getStakingAmount: async (req, res) => { //  스테이킹된 총량
        try {
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const delegatorAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const tx = await signingClient.getBalanceStaked(delegatorAddress)
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getStakingAmountForAddress: async (req, res) => { //  해당 validatorAddress에 스테이킹된 총량
        try {
            const { validatorAddress } = req.body;
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const delegatorAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const tx = await signingClient.getDelegation(delegatorAddress, validatorAddress);
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },


}

