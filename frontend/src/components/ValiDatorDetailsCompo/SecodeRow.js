import { Table } from 'antd'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getDelegations } from '../../api/blockchain'
import { cardShadow, defaultColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
import { subtractNowAndTime } from '../../utils/time'
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
        dataIndex: 'delegation',
        render: (txt) => <a>{txt.delegator_address}</a>,
    },
    {
        title: 'balance',
        dataIndex: 'balance',
        render: (txt) => <a>{txt.amount + txt.denom}</a>,
    },
]

const column2 = [
    {
        title: 'Height',
        dataIndex: 'height',
    },
    {
        title: 'Block Hash',
        dataIndex: 'hash',
        render: (v) => <a>{v.slice(0, 5) + '...' + v.slice(-5)}</a>,
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

export default function SecondRow({ valiAddress, proposedData }) {
    const delegations = useQuery(['delegations', valiAddress], () =>
        getDelegations(valiAddress)
    )
    //console.log(valiAddress)
    //console.log(delegations.data.data.result)

    return (
        <SecondRowRoot>
            <SecondRowCol>
                <SecondRowColHeader>Delegators</SecondRowColHeader>
                <SecondRowColBody>
                    {delegations?.data?.data && (
                        <Table
                            columns={column1}
                            dataSource={delegations.data.result}
                            size="small"
                        ></Table>
                    )}
                </SecondRowColBody>
            </SecondRowCol>
            <SecondRowCol>
                <SecondRowColHeader>Proposed Blocks</SecondRowColHeader>
                <SecondRowColBody>
                    <Table
                        pagination={{ pageSize: 4 }}
                        columns={column2}
                        dataSource={!proposedData ? null : proposedData}
                    ></Table>
                </SecondRowColBody>
            </SecondRowCol>
        </SecondRowRoot>
    )
}
