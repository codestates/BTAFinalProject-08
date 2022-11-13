import { Card, Table, Tag, Tooltip } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getProposals, getProposalStatistics } from '../api/blockchain'
import { subtractNowAndTime } from '../utils/converter'
import { refetchTime } from '../utils/size'

const Wrapper = styled.div`
    min-width: 900px;
    max-width: 1200px;
    width: 100%;
`
const Header = styled.div`
    font-size: 30px;
    color: #222222;
`
const DivContent = styled.div`
    width: 100%;
    display: flex;
`
const DivContentHeader = styled.div`
    width: 10%;
    font-weight: 500;
`
const DivContentBody = styled.div`
    width: 80%;
`

const column = [
    {
        title: '#ID',
        dataIndex: 'proposalId',
        key: 'proposalId',
        render: (v) => '#' + v,
    },
    {
        title: 'Title',
        dataIndex: 'proposalTitle',
        key: 'proposalTitle',
        render: (v, record) => (
            <Link to={`/governance/${record.proposalId}`}>
                <div
                    style={{
                        fontWeight: 500,
                        display: 'flex',
                    }}
                >
                    {v}
                </div>
            </Link>
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
        title: 'Submit Time',
        dataIndex: 'submitTime',
        key: 'submitTime',
        render: (v) => subtractNowAndTime(v),
    },
    {
        title: 'Total Deposit',
        dataIndex: 'totalDeposit',
        key: 'totalDeposit',
        render: (v) => (!v ? null : v.amount + 'uosmo'),
    },
]
export default function Governance() {
    const { isLoading, data } = useQuery(['proposal'], getProposals, {
        refetchInterval: refetchTime,
    })
    console.log('[proposal data]', data)
    if (data?.length >= 2) {
        for (let i = 1; i <= data?.length; i++) {
            Object.assign(data[i - 1], { key: i })
        }
    }
    return (
        <Wrapper>
            <Header>PROPOSALS</Header>
            <Table
                loading={isLoading}
                columns={column}
                expandable={{
                    expandedRowRender: (record) => (
                        <>
                            <DivContent>
                                <DivContentHeader>abstain</DivContentHeader>
                                <DivContentBody>
                                    {record.tally.abstain + ' uosmo'}
                                </DivContentBody>
                            </DivContent>
                            <DivContent>
                                <DivContentHeader>
                                    no with veto
                                </DivContentHeader>
                                <DivContentBody>
                                    {record.tally.no_with_veto + ' uosmo'}
                                </DivContentBody>
                            </DivContent>
                            <DivContent>
                                <DivContentHeader>no</DivContentHeader>
                                <DivContentBody>
                                    {record.tally.no + ' uosmo'}
                                </DivContentBody>
                            </DivContent>
                            <DivContent>
                                <DivContentHeader>yes</DivContentHeader>
                                <DivContentBody>
                                    {record.tally.yes + ' uosmo'}
                                </DivContentBody>
                            </DivContent>
                        </>
                    ),
                    rowExpandable: (record) =>
                        record.status === 'PROPOSAL_STATUS_VOTING_PERIOD',
                }}
                dataSource={!data ? null : data}
            ></Table>
        </Wrapper>
    )
}
