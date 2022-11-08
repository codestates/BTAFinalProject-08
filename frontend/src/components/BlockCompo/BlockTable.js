import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'
import { getBlocks } from '../../api/blockchain'
import { validatorMap } from '../../utils/blockchain'

const columnsBlock = [
    {
        title: 'Height',
        dataIndex: 'header',
        render: (txt) => (
            <Link to={`/blocks/${txt.height}`}>#{txt.height}</Link>
        ),
    },
    {
        title: 'Block Hash',
        dataIndex: 'header',
        render: (txt) => (
            <Link to={`/blocks/${txt.height}`}>
                {txt.app_hash.slice(0, 15) +
                    '...' +
                    txt.app_hash.slice(-15, -1)}
            </Link>
        ),
    },
    {
        title: 'Proposer',
        dataIndex: 'header',
        render: (txt) => <Link>{validatorMap[txt.proposer_address]}</Link>,
    },
    {
        title: 'Txs',
        dataIndex: 'num_txs',
    },
    {
        title: 'Time',
        dataIndex: 'header',
        render: (txt) => <>{subtractNowAndTime(txt.time)}</>,
    },
]

export default function BlocksTable() {
    const { isLoading, data } = useQuery(['blocks'], getBlocks, {
        refetchInterval: refetchTime,
    })

    return (
        <Table
            columns={columnsBlock}
            dataSource={!data ? null : data.result.block_metas}
            loading={isLoading}
            pagination={false}
        />
    )
}
