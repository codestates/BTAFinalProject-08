const { FEES } = require("osmojs");
const { SigningStargateClient } = require('@cosmjs/stargate');
const { getOfflineSignerProto } = require("cosmjs-utils");
const { chains } = require('chain-registry');
const env = process.env;
const endPoint = env.END_POINT // 노드 주소
const faucetMnemonic = env.FAUCET_MNEMONIC // faucet의 니모닉 키
const faucetTokenAmount = "1000000" // 1osmo

module.exports = {
    get1Osmo: async (req, res) => { //  해당 주소에게 1osmo(1,000,000 uosmo) send
        try {
            const { toAddress } = req.body
            const chain = chains.find(({ chain_name }) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const faucetAddress = faucetAccount[0].address // faucet 주소
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
            const tx = await signingClient.sendTokens(faucetAddress, toAddress, [{ denom: 'uosmo', amount: faucetTokenAmount }], feeAmount)
            const returnObj = {
                status: tx.rawLog.includes("failed") ? "Fail" : "Success",
                txHash: tx.transactionHash
            };
            res.status(200).json(returnObj);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },












}

