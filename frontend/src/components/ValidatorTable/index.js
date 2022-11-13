import { Input, Switch, Table, Tag } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const columns = [
    {
        title: 'Validator',
        dataIndex: 'moniker',
        filterMode: 'tree',
        filterSearch: true,
        //onFilter: (value, record) => console.log(value),
        //onFilter: (value, record) => record.name.startsWith(value),
        render: (text, record) => (
            <Link to={`/validators/${record.addressInfo.operatorAddress}`}>
                {text}
            </Link>
        ),
    },
    {
        title: 'Voting Power',
        dataIndex: 'votingPower',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        render: (txt) => <> {txt}</>,
        mutiple: 4,
    },
    {
        title: 'Uptime',
        dataIndex: 'isActive',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        render: (v) => {
            const color = v ? 'geekblue' : '#f19494'
            return <Tag color={color}>{v ? 'active' : 'inactive'}</Tag>
        },
        mutiple: 4,
    },
    {
        title: 'participation',
        dataIndex: ['participation', 'totalProposals'],
        render: (temp, obj) => {
            return <>{obj.participation + ' / ' + obj.totalProposals}</>
        },
    },
    {
        title: 'Commissions',
        dataIndex: 'commistion',
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
                <ContentBodyHeaderWrapinput>
                    {/*<Switch
                        checked={checkStrictly}
                        onChange={setCheckStrictly}
                        checkedChildren="inactive"
                        unCheckedChildren="unactive"
                    />*/}
                </ContentBodyHeaderWrapinput>
            </ContentBodyHeader>
            <Table loading={loading} columns={columns} dataSource={valArray} />
        </>
    )
}
