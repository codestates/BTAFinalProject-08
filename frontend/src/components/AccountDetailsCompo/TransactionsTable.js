import styled from 'styled-components'
import { cardShadow } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { subtractNowAndTime, uosmoToOsmo } from '../../utils/converter'

const ThirdRow = styled.div`
    padding: 20px;
    width: 100%;
    height: 400px;
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
const columns = [
    {
        title: 'tx Hash',
        dataIndex: 'txHash',
        render: (v) => <Link to={`/txs/${v}`}>{v}</Link>,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: (v) => <Tag color="blue">{v}</Tag>,
    },
    {
        title: 'Result',
        dataIndex: 'status',
    },
    {
        title: 'Fee',
        dataIndex: 'fee',
        render: (v) => uosmoToOsmo(v) + 'osmo',
    },
    {
        title: 'Height',
        dataIndex: 'height',
        render: (v) => <Link to={`/blocks/${v}`}>{v}</Link>,
    },
    {
        title: 'Time',
        dataIndex: 'time',
        render: (v) => subtractNowAndTime(v),
    },
]
export default function TransactionsTable({ loading, transactions }) {
    return (
        <ThirdRow>
            <RowHeader>Transactions</RowHeader>
            <Table
                loading={loading}
                columns={columns}
                dataSource={!transactions ? null : transactions}
                pagination={{ pageSize: 4 }}
            ></Table>
        </ThirdRow>
    )
}
