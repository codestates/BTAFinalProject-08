import { Table, Tag } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getTrans } from '../../api/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'

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
        render: (txt) => <Tag color="geekblue">{txt}</Tag>,
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
export default function HomeTranTable() {
    let limit = 5
    const [toggle, setToggle] = useState(false)
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
