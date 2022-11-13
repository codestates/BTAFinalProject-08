import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/converter'
import { getBlocks } from '../../api/blockchain'
import { validatorMap } from '../../utils/blockchain'

const columnsBlock = [
    {
        title: 'Height',
        dataIndex: 'height',
        render: (txt) => <Link to={`/blocks/${txt}`}>#{txt}</Link>,
    },
    {
        title: 'Block Hash',
        dataIndex: 'hash',
        render: (txt, v) => (
            <Link to={`/blocks/${v.height}`}>
                {txt.slice(0, 15) + '...' + txt.slice(-15, -1)}
            </Link>
        ),
    },
    {
        title: 'Proposer',
        dataIndex: 'proposerAddress',
        render: (txt, v) => (
            <>
                <Link to={`/validators/${v.proposerAddress}`}>
                    {validatorMap[txt]}
                </Link>
            </>
        ),
    },
    {
        title: 'Txs',
        dataIndex: 'numOfTx',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        render: (txt) => <>{subtractNowAndTime(txt)}</>,
    },
]

export default function BlocksTable() {
    let limit = 20
    const { isLoading, data } = useQuery(
        ['blocks', 20],
        () => getBlocks(limit),
        {
            refetchInterval: refetchTime,
        }
    )
    console.log(data)

    return (
        <Table
            columns={columnsBlock}
            dataSource={!data ? null : data}
            loading={isLoading}
            pagination={false}
        />
    )
}
