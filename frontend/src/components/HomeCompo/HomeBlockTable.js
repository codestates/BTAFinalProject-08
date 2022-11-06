import { Table } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getBlocks } from '../../api/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'
const columnsBlock = [
    {
        title: 'Height',
        dataIndex: 'header',
        render: (txt) => (
            <Link to={`/blocks/${txt.height}`}>#{txt.height}</Link>
        ),
    },

    {
        title: 'Proposer',
        dataIndex: 'header',
        render: (txt) => <Link>{txt.proposer_address.slice(0, 10)}</Link>,
    },
    {
        title: 'Txs',
        dataIndex: 'num_txs',
    },
    {
        title: 'Time',
        dataIndex: 'header',
        render: (txt) => <>{subtractNowAndTime(txt.time) + 's ago'}</>,
    },
]
export default function HomeBlockTable() {
    const { isLoading, data } = useQuery(['blocks'], getBlocks, {
        refetchInterval: refetchTime,
    })

    return (
        <Table
            columns={columnsBlock}
            pagination={false}
            loading={isLoading}
            dataSource={!data ? null : data.result.block_metas.slice(0, 5)}
        />
    )
}
