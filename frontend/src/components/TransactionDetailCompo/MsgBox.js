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
export default function TranMsgBox({ data }) {
    //console.log('get', data.tx.body.messages)
    if (!data) {
        return
    }

    let msg = data.tx.body.messages[0]
    console.log(msg, 'msg')
    switch (msg['@type']) {
        case '/cosmos.bank.v1beta1.MsgSend':
            return (
                <Wrapper>
                    <DivMsgMainHeader>SEND</DivMsgMainHeader>
                    <DivMsg header={'from address'} body={msg.from_address} />
                    <DivMsg
                        header={'to address'}
                        body={<>{msg.to_address}</>}
                    />
                    <DivMsg
                        header={'amount'}
                        body={msg.amount[0].amount + msg.amount[0].denom}
                    />
                    <DivMsg
                        header={'fee'}
                        body={
                            data.tx.auth_info.fee.amount[0].amount +
                            data.tx.auth_info.fee.amount[0].denom
                        }
                    />
                </Wrapper>
            )
        case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Withdraw reward</DivMsgMainHeader>
                    <DivMsg
                        header={'Delegator address'}
                        body={msg.delegator_address}
                    />
                    <DivMsg
                        header={'Validator address'}
                        body={msg.validator_address}
                    />
                    <DivMsg
                        header={'Amount'}
                        body={
                            data.tx_response.logs[0].events[0].attributes[1]
                                .value
                        }
                    />
                    <DivMsg
                        header={'Fee'}
                        body={
                            data.tx.auth_info.fee.amount[0].amount +
                            data.tx.auth_info.fee.amount[0].denom
                        }
                    />
                </Wrapper>
            )
        case '/cosmos.staking.v1beta1.MsgDelegate':
            return (
                <Wrapper>
                    <DivMsgMainHeader>Delegate</DivMsgMainHeader>
                    <DivMsg
                        header={'Delegator address'}
                        body={msg.delegator_address}
                    />
                    <DivMsg
                        header={'Validator address'}
                        body={msg.validator_address}
                    />
                    <DivMsg
                        header={'Amount'}
                        body={msg.amount.amount + msg.amount.denom}
                    />
                </Wrapper>
            )
        default:
            return null
    }
}
