import { Card, Divider, Tag } from 'antd'
import { useQueries, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getProposalId } from '../api/blockchain'
import DivContent from '../components/GovernanceDetailsCompo/DivContent'
import { refetchTime } from '../utils/size'

const Wrapper = styled.div`
    min-width: 900px;
    max-width: 1200px;
    width: 100%;
`
const Header = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
`
export default function GovernanceDetails() {
    const { proposalId } = useParams()
    const { data, isLoading } = useQuery(
        ['govenanceDetail', proposalId],
        () => getProposalId(proposalId),
        {
            refetchInterval: refetchTime,
        }
    )

    console.log('[governance details]', data)
    return (
        <Wrapper>
            <Card loading={isLoading}>
                {data && (
                    <>
                        <Header>Proposal id #{proposalId}</Header>
                        <DivContent
                            header={'proposalTitle'}
                            content={data?.proposalTitle}
                        />
                        <DivContent
                            header={'proposalDetails'}
                            content={data?.proposalTitle}
                        />
                        <DivContent
                            header={'status'}
                            content={<Tag color="blue">{data?.status}</Tag>}
                        />
                        <DivContent
                            header={'initialDeposit'}
                            content={data?.initialDeposit}
                        />

                        <DivContent
                            header={'votingStart'}
                            content={data?.votingStart}
                        />
                        <DivContent
                            header={'votingEnd'}
                            content={data?.votingEnd}
                        />
                        <DivContent
                            header={'submitTime'}
                            content={data?.submitTime}
                        />
                        <DivContent
                            header={'depositEndTime'}
                            content={data?.depositEndTime}
                        />
                        <Divider></Divider>
                        <DivContent
                            header={'yes'}
                            content={data?.voteResult?.yes}
                        />
                        <DivContent
                            header={'abstain'}
                            content={data?.voteResult?.abstain}
                        />
                        <DivContent
                            header={'no'}
                            content={data?.voteResult?.no}
                        />
                        <DivContent
                            header={'no_with_veto'}
                            content={data?.voteResult?.no_with_veto}
                        />
                    </>
                )}
            </Card>
        </Wrapper>
    )
}
