import styled from 'styled-components'
import { cardShadow } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
import { Table } from 'antd'
import { validatorMap } from '../../utils/blockchain'
import { Link } from 'react-router-dom'
import { uosmoToOsmo } from '../../utils/converter'

const SecondRow = styled.div`
    width: 100%;
    height: 400px;
    background-color: #ffffff;
    margin-top: 10px;
    box-shadow: ${cardShadow};
    border-radius: ${cardBorderRadius};
    padding: 20px;
`

const RowHeader = styled.div`
    font-size: 18px;
    font-weight: 500;
    height: 50px;
`

const columns = [
    {
        title: 'Validator',
        dataIndex: 'delegatorAddress',
        render: (v) => <Link>{v}</Link>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        render: (v) => uosmoToOsmo(v) + 'osmo',
    },
    {
        title: 'Reward',
        dataIndex: 'reward',
        render: (v) => uosmoToOsmo(v) + 'osmo',
    },
]
export default function DelegationTable({ delegation, loading }) {
    return (
        <SecondRow>
            <RowHeader>Delegation</RowHeader>
            <Table
                columns={columns}
                dataSource={!delegation ? null : delegation}
                loading={loading}
                pagination={{
                    pageSize: 4,
                }}
            ></Table>
        </SecondRow>
    )
}
