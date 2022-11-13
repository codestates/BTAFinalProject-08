import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'
import FirstRow from '../components/AccountDetailsCompo/FirstRow'
import { Table } from 'antd'
import { useQuery } from 'react-query'
import { getAccountDetails } from '../api/blockchain'
import SecondTable from '../components/AccountDetailsCompo/DelegationTable'
import DelegationTable from '../components/AccountDetailsCompo/DelegationTable'
import TransactionsTable from '../components/AccountDetailsCompo/TransactionsTable'
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
    const { isLoading, data } = useQuery(['addressDetail', addressid], () =>
        getAccountDetails(addressid)
    )
    console.log('[address Details]', addressid)
    console.log('[address Details]', data)
    return (
        <Wrapper>
            <Header>ACCOUNT DETAIL</Header>
            <FirstRow addressid={addressid} staData={!data ? null : data} />
            <DelegationTable delegation={!data ? null : data.delegations} />

            <TransactionsTable
                transactions={!data ? null : data.transactions}
                loading={isLoading}
            ></TransactionsTable>
        </Wrapper>
    )
}
