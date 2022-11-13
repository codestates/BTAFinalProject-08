import { Table, Tag } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getBlocks, getTrans } from '../../api/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime, uosmoToOsmo } from '../../utils/converter'

const columnsTransaction = [
    {
        title: 'Tx Hash',
        dataIndex: 'txHash',
        render: (txt) => (
            <Link to={`/txs/${txt}`}>
                {txt.slice(0, 6) + '...' + txt.slice(-7, -1)}
            </Link>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: (txt) => <Tag color="blue">{txt}</Tag>,
    },
    {
        title: 'Result',
        dataIndex: 'status',
        render: (txt) => <>success</>,
    },

    {
        title: 'Fee',
        dataIndex: 'fee',
        render: (txt) => <>{uosmoToOsmo(txt) + 'osmo'}</>,
    },
    {
        title: 'Height',
        dataIndex: 'height',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        render: (txt) => <>{subtractNowAndTime(txt)}</>,
    },
]

export default function TransTable() {
    let limit = 20
    //const [toggle, setToggle] = useState(false)
    const { isLoading, data } = useQuery(
        ['transaction', limit],
        () => getTrans(limit),
        {
            refetchInterval: refetchTime,
        }
    )
    //console.log(Array(data.txs).reverse())

    return (
        <Table
            columns={columnsTransaction}
            dataSource={!data ? null : data}
            pagination={false}
            loading={isLoading}
        />
    )
}
