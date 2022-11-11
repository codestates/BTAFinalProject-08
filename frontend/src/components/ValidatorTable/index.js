import { Input, Switch, Table } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const columns = [
    {
        title: 'Validator',
        dataIndex: 'moniker',
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => console.log(value),
        //onFilter: (value, record) => record.name.startsWith(value),
        render: (text, record) => (
            <Link to={`/validators/${record.addressInfo.operatorAddress}`}>
                {text}
            </Link>
        ),
    },
    {
        title: 'Voting Power',
        dataIndex: 'tokens',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        render: (txt) => <> {txt / 1000000}</>,
        mutiple: 4,
    },
    {
        title: 'Uptime',
        dataIndex: 'tokens',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        mutiple: 4,
    },
    {
        title: 'participate',
    },
    {
        title: 'Commissions',
        dataIndex: 'commistionRate',
        render: (txt) => <> {(txt * 100).toFixed(1) + '%'}</>,
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

export default function ValidatorTable({ loading, valArray }) {
    const [checkStrictly, setCheckStrictly] = useState(true)
    //sconsole.log(valArray)

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
            <Table loading={loading} columns={columns} dataSource={valArray} />
        </>
    )
}
