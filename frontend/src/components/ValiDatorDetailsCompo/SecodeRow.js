import { Table } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getDelegations } from '../../api/blockchain'
import { cardShadow, defaultColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
import { subtractNowAndTime, uosmoToOsmo } from '../../utils/converter'
const SecondRowRoot = styled.div`
    margin-top: 10px;
    height: 400px;
    min-width: 780px;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
`
const SecondRowCol = styled.div`
    width: 49%;
    background-color: #ffffff;
    box-shadow: ${cardShadow};
    height: 100%;
    padding: 10px;
    border-radius: ${cardBorderRadius};
`

const SecondRowColHeader = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${defaultColor};
`

const SecondRowColBody = styled.div`
    width: 100%;
    height: 90%;
`

//const ThirdRow
const column1 = [
    {
        title: 'Delegator Address',
        dataIndex: 'delegatorAddress',
        render: (txt) => <Link to={`/account/${txt}`}>{txt}</Link>,
    },
    {
        title: 'balance',
        dataIndex: 'amount',
        render: (txt) => uosmoToOsmo(txt) + 'osmo',
    },
]

const column2 = [
    {
        title: 'Height',
        dataIndex: 'height',
        render: (v) => <Link to={`/blocks/${v}`}>{v}</Link>,
    },
    {
        title: 'Block Hash',
        dataIndex: 'hash',
        render: (v, record) => (
            <Link to={`/blocks/${record.height}`}>
                {v.slice(0, 5) + '...' + v.slice(-5)}
            </Link>
        ),
    },
    {
        title: 'Txs',
        dataIndex: 'numOfTx',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        render: (v) => subtractNowAndTime(v),
    },
]

export default function SecondRow({ proposedData, delegators, loading }) {
    //console.log(valiAddress)
    //console.log(delegations.data.data.result)

    //console.log(proposedData)
    return (
        <SecondRowRoot>
            <SecondRowCol>
                <SecondRowColHeader>Delegators</SecondRowColHeader>
                <SecondRowColBody>
                    <Table
                        columns={column1}
                        dataSource={!delegators ? null : delegators}
                        loading={loading}
                        pagination={{ pageSize: 4 }}
                    ></Table>
                </SecondRowColBody>
            </SecondRowCol>
            <SecondRowCol>
                <SecondRowColHeader>Proposed Blocks</SecondRowColHeader>
                <SecondRowColBody>
                    <Table
                        loading={loading}
                        pagination={{ pageSize: 4 }}
                        columns={column2}
                        dataSource={!proposedData ? null : proposedData}
                    ></Table>
                </SecondRowColBody>
            </SecondRowCol>
        </SecondRowRoot>
    )
}
