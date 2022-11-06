import { Table } from 'antd'
import styled from 'styled-components'
import { cardShadow, headerColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'

const ThirdRowRoot = styled.div`
    margin-top: 10px;
    min-width: 780px;
    max-width: 1000px;
    height: 400px;
    background-color: #ffffff;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
    padding: 10px;
    margin-bottom: 20px;
`
const ThirdRowHeader = styled.div`
    font-size: 24px;
    color: ${headerColor};
`
const column = [
    {
        title: '#ID',
    },
    {
        title: 'Title',
    },
    {
        title: 'Tx Hash',
    },
    {
        title: 'Answer',
    },
    {
        title: 'Time Submitted',
    },
]

export default function ThirdRow() {
    return (
        <ThirdRowRoot>
            <ThirdRowHeader>Votes</ThirdRowHeader>
            <Table columns={column}></Table>
        </ThirdRowRoot>
    )
}
