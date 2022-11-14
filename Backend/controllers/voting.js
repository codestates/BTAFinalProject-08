const {chains} = require("chain-registry");
const {getOfflineSignerProto} = require("cosmjs-utils");
const {FEES, cosmos} = require("osmojs");
const {SigningStargateClient} = require("@cosmjs/stargate");
const { VoteOption} = require("cosmjs-types/cosmos/gov/v1beta1/gov");
const {longify} = require("@cosmjs/stargate/build/queryclient");
const env = process.env;
const endPoint = env.END_POINT // 노드 주소
const faucetMnemonic = env.FAUCET_MNEMONIC // faucet의 니모닉 키
const { vote,deposit} = cosmos.gov.v1beta1.MessageComposer.withTypeUrl


module.exports = {
    vote: async (req, res) => { //  proposal 에 투표
        try {
            const chain = chains.find(({chain_name}) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const fromAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
            const voteMsg = vote({
                    proposalId: longify("3"),
                    voter: fromAddress,
                    option: VoteOption.VOTE_OPTION_YES,
            })
            const tx = await signingClient.signAndBroadcast(fromAddress, [voteMsg], feeAmount, "");
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    deposit: async (req, res) => { //  proposal 에 deposit
        try {
            const chain = chains.find(({chain_name}) => chain_name === "osmosis")
            const signer = await getOfflineSignerProto({
                mnemonic: faucetMnemonic,
                chain
            });
            const faucetAccount = await signer.getAccounts()
            const fromAddress = faucetAccount[0].address
            const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
            const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
            const voteMsg = deposit({amount:[{denom: 'uosmo', amount: "10000000"}],depositor:fromAddress,proposalId:longify("7")})
            const tx = await signingClient.signAndBroadcast(fromAddress, [voteMsg], feeAmount, "");
            res.status(200).json(tx);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },
}


