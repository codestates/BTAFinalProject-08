const {chains} = require("chain-registry");
const {getOfflineSignerProto} = require("cosmjs-utils");
const {FEES, cosmos, osmosis} = require("osmojs");
const {SigningStargateClient, StargateClient} = require("@cosmjs/stargate");
const {TextProposal, VoteOption} = require("cosmjs-types/cosmos/gov/v1beta1/gov");
const {longify} = require("@cosmjs/stargate/build/queryclient");
const {GetTxsEventRequest, OrderBy} = require("cosmjs-types/cosmos/tx/v1beta1/service");
const axios = require("axios");
const env = process.env;
const endPoint = env.END_POINT // 노드 주소
const faucetMnemonic = env.FAUCET_MNEMONIC // faucet의 니모닉 키
const {submitProposal, vote, deposit} = cosmos.gov.v1beta1.MessageComposer.withTypeUrl

const {createRPCQueryClient} = osmosis.ClientFactory;

module.exports = {
    // test: async (req, res) => { //  proposal 추가
    //     try {
    //         const chain = chains.find(({chain_name}) => chain_name === "osmosis")
    //         const signer = await getOfflineSignerProto({
    //             mnemonic: faucetMnemonic,
    //             chain
    //         });
    //         const faucetAccount = await signer.getAccounts()
    //         const fromAddress = faucetAccount[0].address
    //         const signingClient = await SigningStargateClient.connectWithSigner(endPoint, signer)
    //         const feeAmount = FEES.osmosis.swapExactAmountIn("low"); // 수수료를 높여봤자 블록생성속도가 느려서 의미가 없다.
    //         const rpcClient = await createRPCQueryClient({rpcEndpoint: endPoint});
    //         const tendermintClient = await StargateClient.connect(endPoint);
    //         const signingClient2 = await SigningStargateClient.connect(endPoint);
    //         const eventRequest = {
    //             events: [
    //                 "message.action='/cosmos.gov.v1beta1.MsgVote'",
    //                 "message.sender='osmo175370qgysqzwz40uakqjmmp88529jyf9mm2ulg'",
    //             ],
    //
    //             orderBy: OrderBy.ORDER_BY_ASC,
    //         }
    //
    //
    //        const result = await rpcClient.cosmos.tx.v1beta1.getTxsEvent(eventRequest);
    //
    //         res.status(200).json(result.txResponses[0].events);
    //     } catch (err) {
    //         res.status(400).json({message: err.message});
    //     }
    // },


    getProposals: async (req, res) => { //  proposal 추가
        try {
            const proposals = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals")).data.proposals;
            let resultObject = []
            for (let i of proposals) {
                if(i.status==="PROPOSAL_STATUS_VOTING_PERIOD"){
                    const tally = (await axios.get(env.LCD_END_POINT + `cosmos/gov/v1beta1/proposals/${i.proposal_id}/tally`)).data.tally;
                    let proposal = {
                        proposalId: i.proposal_id,
                        proposalTitle: i.content.title,
                        status: i.status,
                        submitTime: i.submit_time,
                        totalDeposit: i.total_deposit[0],
                        tally:tally
                    }
                    resultObject.push(proposal)

                }else{
                    let proposal = {
                        proposalId: i.proposal_id,
                        proposalTitle: i.content.title,
                        status: i.status,
                        submitTime: i.submit_time,
                        totalDeposit: i.total_deposit[0],
                    }
                    resultObject.push(proposal)
                }
            }
            res.status(200).json(resultObject);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    // getVotingPeriodProposals: async (req, res) => { //  proposal 추가
    //     try {
    //         const proposals = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals")).data.proposals;
    //         let resultObject = []
    //         for (let i of proposals) {
    //             const tally = (await axios.get(env.LCD_END_POINT + `cosmos/gov/v1beta1/proposals/${i.proposal_id}/tally`)).data.tally;
    //             if(i.status==="PROPOSAL_STATUS_VOTING_PERIOD"){
    //                 let proposal = {
    //                     proposalId: i.proposal_id,
    //                     proposalTitle: i.content.title,
    //                     status: i.status,
    //                     votingStart: i.voting_start_time,
    //                     votingEnd: i.voting_end_time,
    //                     submitTime: i.submit_time,
    //                     totalDeposit: i.total_deposit[0],
    //                     tally:tally
    //                 }
    //                 resultObject.push(proposal)
    //             }
    //         }
    //         res.status(200).json(resultObject);
    //     } catch (err) {
    //         res.status(400).json({message: err.message});
    //     }
    // },
    //
    // getProposalDetails: async (req, res) => { //  proposal 추가
    //     try {
    //         const proposalId = req.query.id
    //         const proposalInfo = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals/" + proposalId)).data.proposal;
    //         const depositInfo = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals/" + proposalId+"/deposits")).data.deposits[0];
    //         const proposer = depositInfo.depositor
    //         const initialDeposit = depositInfo.amount[0].amount
    //         const proposal = {
    //             proposalId: proposalInfo.proposal_id,
    //             proposalTitle: proposalInfo.content.title,
    //             proposer:proposer,
    //             proposalDetails: proposalInfo.content.description,
    //             status: proposalInfo.status,
    //             initialDeposit: initialDeposit,
    //             totalDeposit: proposalInfo.total_deposit[0].amount,
    //             votingStart: proposalInfo.voting_start_time,
    //             votingEnd: proposalInfo.voting_end_time,
    //             submitTime:proposalInfo.submit_time,
    //             depositEndTime:proposalInfo.deposit_end_time,
    //             voteResult:proposalInfo.final_tally_result
    //         }
    //         res.status(200).json(proposal);
    //     } catch (err) {
    //         res.status(400).json({message: err.message});
    //     }
    // },


}


