import { Input, Switch, Table } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

const columns = [
    {
        title: 'Validator',
        dataIndex: 'validator',

        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => console.log(value),
        //onFilter: (value, record) => record.name.startsWith(value),
    },
    {
        title: 'Voting Power',
        dataIndex: 'votingPower',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        mutiple: 4,
    },
    {
        title: 'Participation',
        dataIndex: 'participation',
        sorter: {
            compare: (a, b) => a.participation - b.participation,
        },
        mutiple: 3,
    },
    {
        title: 'Uptime',
        dataIndex: 'uptime',
        sorter: {
            compare: (a, b) => a.update - b.uptime,
        },
        mutiple: 2,
    },
    {
        title: 'Commission',
        dataIndex: 'commission',
        sorter: {
            compare: (a, b) =>
                a.commission.slice(0, -1) - b.commission.slice(0, -1),
        },
        mutiple: 1,
    },
]

const data = [
    {
        key: '1',
        validator: 'Cosmostation',
        votingPower: '22222',
        participation: '270',
        uptime: '80',
        commission: '5%',
    },
    {
        key: '2',
        validator: 'Cosmostation2',
        votingPower: '22224',
        participation: '270',
        uptime: '80',
        commission: '6%',
    },
    {
        key: '3',
        validator: 'Cosmostation3',
        votingPower: '22223',
        participation: '270',
        uptime: '80',
        commission: '8%',
    },
]
const ContentBodyHeader = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const ContentBodyHeaderWrapinput = styled.div`
    width: 10%;
    display: flex;
    justify-content: flex-end;
`

export default function ValidatorTable() {
    const [checkStrictly, setCheckStrictly] = useState(true)
    return (
        <>
            <ContentBodyHeader>
                <Input
                    style={{ width: 340, marginRight: 10 }}
                    placeholder="search validator"
                />
                <ContentBodyHeaderWrapinput>
                    <Switch
                        checked={checkStrictly}
                        onChange={setCheckStrictly}
                        checkedChildren="inactive"
                        unCheckedChildren="unactive"
                    />
                </ContentBodyHeaderWrapinput>
            </ContentBodyHeader>
            <Table columns={columns} dataSource={data} />
        </>
    )
}
