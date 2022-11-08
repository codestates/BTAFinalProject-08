import { Table } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getTrans } from '../../api/blockchain'
import { refetchTime } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'

const columnsTransaction = [
    {
        title: 'Tx Hash',
        dataIndex: 'txhash',
        render: (txt) => (
            <Link to={`/txs/${txt}`}>
                {txt.slice(0, 6) + '...' + txt.slice(-7, -1)}
            </Link>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'tx',
        render: (txt) => (
            <>
                {!txt?.value?.msg[0]?.type
                    ? null
                    : txt.value.msg[0].type.split('/')[1].slice(3)}
            </>
        ),
    },
    {
        title: 'Height',
        dataIndex: 'height',
    },
    {
        title: 'Time',
        dataIndex: 'timestamp',
        render: (txt) => <>{subtractNowAndTime(txt)}</>,
    },
]
export default function HomeTranTable() {
    const [toggle, setToggle] = useState(false)
    const { isLoading, data } = useQuery(['transaction'], getTrans, {
        refetchInterval: refetchTime,
    })
    return (
        <Table
            columns={columnsTransaction}
            dataSource={!data ? null : data.txs.slice(-5).reverse()}
            pagination={false}
        />
    )
}
