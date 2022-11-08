import { Table } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getBlocks } from '../../api/blockchain'
import { validatorMap } from '../../utils/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'
const columnsBlock = [
    {
        title: 'Height',
        dataIndex: 'height',
        render: (txt) => <Link to={`/blocks/${txt}`}>#{txt}</Link>,
    },
    {
        title: 'Proposer',
        dataIndex: 'proposerAddress',
        render: (txt) => <Link>{validatorMap[txt]}</Link>,
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
export default function HomeBlockTable() {
    let limit = 5
    const { isLoading, data } = useQuery(
        ['blocks', 5],
        () => getBlocks(limit),
        {
            refetchInterval: refetchTime,
        }
    )

    console.log('block', data)
    return (
        <Table
            columns={columnsBlock}
            pagination={false}
            loading={isLoading}
            dataSource={!data ? null : data}
        />
    )
}
