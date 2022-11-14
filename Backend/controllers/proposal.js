const axios = require("axios");
const env = process.env;


module.exports = {
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


    getProposalDetails: async (req, res) => { //  --proposal 추가
        try {
            const proposalId = req.query.id
            const proposalInfo = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals/" + proposalId)).data.proposal;
            const depositInfo = (await axios.get(env.LCD_END_POINT + "cosmos/gov/v1beta1/proposals/" + proposalId+"/deposits")).data.deposits[0];
            const tally = (await axios.get(env.LCD_END_POINT + `cosmos/gov/v1beta1/proposals/${proposalId}/tally`)).data.tally;
            const proposer = depositInfo.depositor
            const initialDeposit = depositInfo.amount[0].amount
            const proposal = {
                proposalId: proposalInfo.proposal_id,
                proposalTitle: proposalInfo.content.title,
                proposer:proposer,
                proposalDetails: proposalInfo.content.description,
                status: proposalInfo.status,
                initialDeposit: initialDeposit,
                totalDeposit: proposalInfo.total_deposit[0].amount,
                votingStart: proposalInfo.voting_start_time,
                votingEnd: proposalInfo.voting_end_time,
                submitTime:proposalInfo.submit_time,
                depositEndTime:proposalInfo.deposit_end_time,
                voteResult:proposalInfo.final_tally_result,
                tally:tally
            }
            res.status(200).json(proposal);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },


}


