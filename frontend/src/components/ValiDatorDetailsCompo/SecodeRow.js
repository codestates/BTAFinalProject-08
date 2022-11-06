import { Table } from 'antd'
import styled from 'styled-components'
import { cardShadow, defaultColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
const SecondRowRoot = styled.div`
    margin-top: 10px;
    height: 400px;
    min-width: 780px;
    max-width: 1000px;
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
    },
    {
        title: 'Amount',
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

export default function SecondRow() {
    return (
        <SecondRowRoot>
            <SecondRowCol>
                <SecondRowColHeader>Delegators</SecondRowColHeader>
                <SecondRowColBody>
                    <Table columns={column1}></Table>
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
