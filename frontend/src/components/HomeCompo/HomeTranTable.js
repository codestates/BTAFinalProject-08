import { Table } from 'antd'

const columnsTransaction = [
    {
        title: 'Tx Hash',
    },
    {
        title: 'Type',
    },
    {
        title: 'Height',
    },
    {
        title: 'Time',
    },
]
export default function HomeTranTable() {
    return <Table columns={columnsTransaction} />
}
