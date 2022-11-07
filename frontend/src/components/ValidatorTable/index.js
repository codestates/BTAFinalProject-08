import { Input, Switch, Table } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const columns = [
    {
        title: 'Validator',
        dataIndex: 'description',

        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => console.log(value),
        //onFilter: (value, record) => record.name.startsWith(value),
        render: (text, record) => (
            <Link to={`/validators/${record.operator_address}`}>
                {record.description.moniker}
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
        title: 'Update Time',
        dataIndex: 'commission',
        render: (txt) => <> {txt.update_time}</>,
    },
    {
        title: 'Commissions',
        dataIndex: 'commission',
        render: (txt) => <> {txt.commission_rates.rate * 100}</>,
    },
]

const data = {
    height: '5237',
    result: [
        {
            operator_address:
                'osmovaloper1w6k4anx2juthw8ka0zyxej26wvdlccwq09x0c6',
            consensus_pubkey: {
                type: 'tendermint/PubKeyEd25519',
                value: 'hSx2cwvzoi3dhRDnOpTZO6icB0ZImX+T5kZHWLSmD9U=',
            },
            status: 3,
            tokens: '999000000',
            delegator_shares: '999000000.000000000000000000',
            description: {
                moniker: 'cothi',
            },
            unbonding_time: '1970-01-01T00:00:00Z',
            commission: {
                commission_rates: {
                    rate: '0.100000000000000000',
                    max_rate: '0.200000000000000000',
                    max_change_rate: '0.010000000000000000',
                },
                update_time: '2022-11-04T14:00:32.303790139Z',
            },
            min_self_delegation: '1',
        },
        {
            operator_address:
                'osmovaloper1erhzfvsfhue4tz6cz9czrgucecxp3uddf3dds4',
            consensus_pubkey: {
                type: 'tendermint/PubKeyEd25519',
                value: '/3802T/tAnDPqNbyNHQQLhMDM0dZDZ1yWFCEesAcM6Q=',
            },
            status: 3,
            tokens: '990000000',
            delegator_shares: '990000000.000000000000000000',
            description: {
                moniker: 'calvin',
            },
            unbonding_time: '1970-01-01T00:00:00Z',
            commission: {
                commission_rates: {
                    rate: '0.100000000000000000',
                    max_rate: '0.200000000000000000',
                    max_change_rate: '0.010000000000000000',
                },
                update_time: '2022-11-04T14:14:35.279835472Z',
            },
            min_self_delegation: '1',
        },
        {
            operator_address:
                'osmovaloper1mhfgfenrp88d2p5dttyw59x8frfk7u9lujg49y',
            consensus_pubkey: {
                type: 'tendermint/PubKeyEd25519',
                value: 'cVTM6Vw4f2uSpQKQNCyf5Fmj6N76E19MbbEVUtQPcT0=',
            },
            status: 3,
            tokens: '1000000',
            delegator_shares: '1000000.000000000000000000',
            description: {
                moniker: 'codemonkeyshin',
                details: 'codemonkeyshin node',
            },
            unbonding_time: '1970-01-01T00:00:00Z',
            commission: {
                commission_rates: {
                    rate: '0.070000000000000000',
                    max_rate: '1.000000000000000000',
                    max_change_rate: '0.010000000000000000',
                },
                update_time: '2022-11-04T13:27:44.332595126Z',
            },
            min_self_delegation: '1',
        },
    ],
}
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
    //console.log(valArray)

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
            <Table
                loading={loading}
                columns={columns}
                dataSource={valArray.result}
            />
        </>
    )
}
