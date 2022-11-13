import styled from 'styled-components'
import DivMsg from './DivMsg'

const Wrapper = styled.div`
    height: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const DivMsgMainHeader = styled.div`
    font-weight: 500;
    font-size: 18px;
`

const DivMsgHeader = styled.div`
    font-weight: 500;
    width: 20%;
`
const DivMsgContent = styled.div`
    width: 80%;
`
export default function TranMsgBox({ data, type }) {
    //console.log('get', data.tx.body.messages)
    if (!data) {
        return
    }

    let msg = data
    //console.log(msg, 'msg')
    switch (type) {
        case 'Send':
            return (
                <Wrapper>
                    <DivMsgMainHeader>SEND</DivMsgMainHeader>
                    <DivMsg header={'from address'} body={msg.fromAddress} />
                    <DivMsg header={'to address'} body={<>{msg.toAddress}</>} />
                    <DivMsg header={'amount'} body={msg.amount + 'uosmo'} />
                </Wrapper>
            )
        case 'CreateValidator':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Create validator</DivMsgMainHeader>
                    <DivMsg
                        header={'Delegator address'}
                        body={msg.delegatorAddress}
                    />
                    <DivMsg
                        header={'Validator address'}
                        body={msg.validatorAddress}
                    />
                    <DivMsg header={'address'} body={msg.address} />
                </Wrapper>
            )
        case 'WithdrawDelegationReward':
            return (
                <Wrapper>
                    <DivMsgMainHeader>
                        Withdraw delegation reward
                    </DivMsgMainHeader>
                    <DivMsg
                        header={'Delegator address'}
                        body={msg.delegatorAddress}
                    />
                    <DivMsg
                        header={'Validator address'}
                        body={msg.validatorAddress}
                    />
                    <DivMsg header={'Amount'} body={msg.amount + 'uosmo'} />
                </Wrapper>
            )
        case 'Delegate':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Delegate</DivMsgMainHeader>
                    <DivMsg
                        header={'Delegator address'}
                        body={msg.delegatorAddress}
                    />
                    <DivMsg
                        header={'Validator address'}
                        body={msg.validatorAddress}
                    />
                    <DivMsg header={'Amount'} body={msg.amounts + 'uosmo'} />
                </Wrapper>
            )
        case 'Vote':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Vote</DivMsgMainHeader>
                    <DivMsg header={'Voter address'} body={msg.voter} />
                    <DivMsg header={'Proposal id'} body={msg.proposalId} />

                    <DivMsg header={'Tx type'} body={msg.txType} />
                    <DivMsg header={'option'} body={msg.option} />
                </Wrapper>
            )
        case 'Deposit':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Deposit</DivMsgMainHeader>
                    <DivMsg header={'Depositor address'} body={msg.depositor} />
                    <DivMsg header={'Proposal id'} body={msg.proposalId} />

                    <DivMsg header={'Amount'} body={msg.amount} />
                    <DivMsg header={'Tx type'} body={msg.txType} />
                </Wrapper>
            )
        case 'SubmitProposal':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Submit Proposa;</DivMsgMainHeader>
                    <DivMsg header={'Proposer address'} body={msg.proposer} />
                    <DivMsg header={'title'} body={msg.title} />
                    <DivMsg header={'description'} body={msg.description} />
                    <DivMsg
                        header={'initialDeposit'}
                        body={msg.initialDeposit}
                    />
                    <DivMsg header={'Tx type'} body={msg.txType} />
                </Wrapper>
            )

        default:
            return null
    }
}
