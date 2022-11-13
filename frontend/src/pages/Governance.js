import { Card, Table, Tag, Tooltip } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getProposals, getProposalStatistics } from '../api/blockchain'
import { subtractNowAndTime } from '../utils/converter'

const Wrapper = styled.div`
    min-width: 900px;
    max-width: 1200px;
    width: 100%;
`
const Header = styled.div`
    font-size: 30px;
    color: #222222;
`

const column = [
    {
        title: '#ID',
        dataIndex: 'proposal_id',
        key: 'proposal_id',
        render: (v) => '#' + v,
    },
    {
        title: 'Title',
        dataIndex: 'content',
        key: 'content',
        render: (v, record) => (
            <Tooltip title={v.description} placement="topLeft">
                <Link to={`/governance/${record.proposal_id}`}>
                    <div
                        style={{
                            fontWeight: 500,
                            display: 'flex',
                        }}
                    >
                        {v.title}
                    </div>
                </Link>
            </Tooltip>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (v) => {
            let color =
                (v.startsWith('PROPOSAL_STATUS_', 0)
                    ? v.slice(16).replace('_', ' ')
                    : v) === 'VOTING PERIOD'
                    ? 'geekblue'
                    : 'green'
            return (
                <Tag color={color}>
                    {v.startsWith('PROPOSAL_STATUS_', 0)
                        ? v.slice(16).replace('_', ' ')
                        : v}
                </Tag>
            )
        },
    },
    {
        title: 'Voting Start',
        dataIndex: 'voting_start_time',
        key: 'voting_start_time',
        render: (v) =>
            v === '0001-01-01T00:00:00Z' ? '-' : subtractNowAndTime(v),
    },
    {
        title: 'Submit Time',
        dataIndex: 'submit_time',
        key: 'submit_time',
        render: (v) => subtractNowAndTime(v),
    },
    {
        title: 'Total Deposit',
        dataIndex: 'total_deposit',
        key: 'total_deposit',
        render: (v) => (!v[0] ? null : v[0].amount + 'uosmo'),
    },
]
export default function Governance() {
    const { isLoading, data } = useQuery(['proposal'], getProposals)
    console.log('[proposal data]', data)
    if (data?.proposals.length >= 2) {
        for (let i = 1; i <= data?.proposals.length; i++) {
            Object.assign(data.proposals[i - 1], { key: i })
        }
    }
    return (
        <Wrapper>
            <Header>PROPOSALS</Header>
            <Table
                columns={column}
                expandable={{
                    expandedRowRender: async (record) => {
                        const proposalData = await getProposalStatistics(
                            record.proposal_id
                        )
                        console.log(proposalData)
                        return <Card>{proposalData?.data?.yes}</Card>
                    },
                    rowExpandable: (record) =>
                        record.status !== 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
                }}
                dataSource={!data ? null : data.proposals}
            ></Table>
        </Wrapper>
    )
}
