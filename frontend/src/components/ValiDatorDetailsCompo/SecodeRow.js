import { Table } from 'antd'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getDelegations } from '../../api/blockchain'
import { cardShadow, defaultColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
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
    },
    {
        title: 'Block Hash',
    },
    {
        title: 'Txs',
    },
    {
        title: 'Time',
    },
]

export default function SecondRow({ valiAddress }) {
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
                            dataSource={delegations.data.data.result}
                        ></Table>
                    )}
                </SecondRowColBody>
            </SecondRowCol>
            <SecondRowCol>
                <SecondRowColHeader>Proposed Blocks</SecondRowColHeader>
                <SecondRowColBody>
                    <Table columns={column2}></Table>
                </SecondRowColBody>
            </SecondRowCol>
        </SecondRowRoot>
    )
}
