import { Table } from 'antd'
import styled from 'styled-components'
import { cardShadow, headerColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'
import { Link } from 'react-router-dom'
import { parseAndLocaleString } from '../../utils/converter'

const ThirdRowRoot = styled.div`
    margin-top: 10px;
    min-width: 780px;
    max-width: 1100px;

    background-color: #ffffff;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
    padding: 10px;
`
const ThirdRowHeader = styled.div`
    font-size: 24px;
    color: ${headerColor};
`
const MarginDiv = styled.div`
    height: 20px;
`
const column = [
    {
        title: '#ID',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Tx Hash',
        dataIndex: 'txHash',
        render: h => <Link to={`/txs/${h}`}>{h !== '' ? `${h.slice(0, 5)}...${h.slice(-5)}` : ""}</Link>,
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
    },
    {
        title: 'Time Submitted',
        dataIndex: 'timeSubmitted',
        render: t => parseAndLocaleString(t),
    },
]

export default function ThirdRow({ voteData, loading }) {
    return (
        <>
            <ThirdRowRoot>
                <ThirdRowHeader>Votes</ThirdRowHeader>
                <Table
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    columns={column}
                    dataSource={!voteData ? null : voteData}
                ></Table>
            </ThirdRowRoot>
            <MarginDiv />
        </>
    )
}
