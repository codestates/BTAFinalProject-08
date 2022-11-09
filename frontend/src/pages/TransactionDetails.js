import { Card, Divider } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getTransactionMsg, getTransInfo } from '../api/blockchain'
import InfoContent from '../components/TransactionDetailInfoCard'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'
import { subtractNowAndTime } from '../utils/time'
import { Icon } from '@iconify/react'
import TranMsgBox from '../components/TransactionDetailCompo/MsgBox'

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    min-width: 600px;
    height: 100%;
`
const Header = styled.div`
    height: 40px;
    width: 100%;
    font-size: 24px;
    font-weight: 500;
`
const MsgWrapper = styled.div`
    width: 100%;
    height: 400px;
    background-color: #ffffff;
    margin-top: 10px;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
`
const MessageHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
`

export default function TransactionDetail() {
    const { transactionid } = useParams()
    const { data, isLoading } = useQuery(['transDetail', transactionid], () =>
        getTransInfo(transactionid)
    )
    const transactionMsg = useQuery(['transactionMsg', transactionid], () =>
        getTransactionMsg(transactionid)
    )
    console.log(transactionMsg.data, 'msg')

    return (
        <Wrapper>
            <Header>TRANSACTION DETAILS</Header>
            <InfoContent
                chainid={data?.chainId}
                txhash={transactionid}
                status={data?.status}
                height={data?.height}
                time={subtractNowAndTime(data?.time)}
                fee={data?.fee?.amount + data?.fee?.unit}
                gas={` ${data?.gas?.gasUsed} / ${data?.gas?.gasWanted}`}
                Memo={data?.memo}
                loading={isLoading}
                data={data}
            />
            <MsgWrapper>
                <Card style={{ height: '400px' }}>
                    <MessageHeader>
                        <Icon
                            icon="bx:message-alt-detail"
                            style={{ marginRight: '10px' }}
                        />
                        Message
                    </MessageHeader>
                    <Divider></Divider>
                    <TranMsgBox data={transactionMsg.data} />
                </Card>
            </MsgWrapper>
        </Wrapper>
    )
}
