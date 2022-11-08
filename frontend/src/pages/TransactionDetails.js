import { Card, Divider } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import InfoContent from '../components/TransactionDetailInfoCard'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'

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
    console.log(transactionid)
    return (
        <Wrapper>
            <Header>TRANSACTION DETAILS</Header>
            <InfoContent
                chainid={'mintchoco'}
                txhash={transactionid}
                status={'success'}
                height={'1'}
                time={'2022-11-06'}
                fee={100}
                gas={' 407,264 / 444,240'}
                Memo={'null'}
            />
        </Wrapper>
    )
}
