import { Card, Divider } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getTransInfo } from '../api/blockchain'
import InfoContent from '../components/TransactionDetailInfoCard'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'
import { subtractNowAndTime } from '../utils/time'

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

export default function TransactionDetail() {
    const { transactionid } = useParams()
    const { data, isLoading } = useQuery(['transDetail', transactionid], () =>
        getTransInfo(transactionid)
    )

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
        </Wrapper>
    )
}
