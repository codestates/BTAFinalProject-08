import { Table, Tag } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getTrans } from '../../api/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/converter'

const columnsTransaction = [
    {
        title: 'Tx Hash',
        dataIndex: 'txHash',
        key: 'txHash',
        render: (txt) => (
            <Link to={`/txs/${txt}`}>
                {txt.slice(0, 6) + '...' + txt.slice(-7, -1)}
            </Link>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (txt) => <Tag color="geekblue">{txt}</Tag>,
    },
    {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (txt) => <>{subtractNowAndTime(txt)}</>,
    },
]
export default function HomeTranTable() {
    let limit = 5
    const { isLoading, data } = useQuery(
        ['transaction', limit],
        () => getTrans(limit),
        {
            refetchInterval: refetchTime,
        }
    )
    return (
        <Table
            columns={columnsTransaction}
            loading={isLoading}
            dataSource={!data ? null : data}
            pagination={false}
        />
    )
}
