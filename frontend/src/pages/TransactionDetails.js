import { Card, Divider } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getTransactionMsg, getTransInfo } from '../api/blockchain'
import InfoContent from '../components/TransactionDetailInfoCard'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'
import { subtractNowAndTime } from '../utils/converter'
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

    return (
        <Wrapper>
            <Header>TRANSACTION DETAILS</Header>
            <InfoContent
                chainid={data?.txInfo.chainId}
                txhash={transactionid}
                status={data?.txInfo.status}
                height={data?.txInfo.height}
                time={subtractNowAndTime(data?.txInfo.time)}
                fee={data?.txInfo.fee + 'uosmo'}
                gas={` ${data?.txInfo.gasUsed} / ${data?.txInfo?.gasWanted}`}
                Memo={data?.txInfo?.memo}
                loading={isLoading}
                data={data}
            />
            {data?.messages && (
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
                        {data.messages.map((v, i) => {
                            return (
                                <TranMsgBox type={data?.txInfo.type} data={v} />
                            )
                        })}
                    </Card>
                </MsgWrapper>
            )}
        </Wrapper>
    )
}
