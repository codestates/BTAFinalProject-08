import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'
import FirstRow from '../components/AccountDetailsCompo/FirstRow'
import { Table } from 'antd'
const Wrapper = styled.div`
    max-width: 1200px;
    min-width: 900px;
    width: 100%;
`

const Header = styled.div`
    height: 50px;
    font-size: 28px;
    font-weight: 500;
`

const SecondRow = styled.div`
    width: 100%;
    height: 400px;
    background-color: #ffffff;
    margin-top: 10px;
    box-shadow: ${cardShadow};
    border-radius: ${cardBorderRadius};
    padding: 20px;
`
const ThirdRow = styled.div`
    padding: 20px;
    width: 100%;
    height: 300px;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
    background-color: #ffffff;
    margin-top: 10px;
`
const RowHeader = styled.div`
    font-size: 18px;
    font-weight: 500;
    height: 50px;
`

export default function AddressDetails() {
    const { addressid } = useParams()
    return (
        <Wrapper>
            <Header>ACCOUNT DETAIL</Header>
            <FirstRow addressid={addressid} data={''} />
            <SecondRow>
                <RowHeader>Delegation</RowHeader>
                <Table></Table>
            </SecondRow>
            <ThirdRow>
                <RowHeader>Transactions</RowHeader>
                <Table></Table>
            </ThirdRow>
        </Wrapper>
    )
}
