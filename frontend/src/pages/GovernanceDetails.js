import { Card } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    min-width: 900px;
    max-width: 1200px;
    width: 100%;
`
const Header = styled.div`
    font-size: 24px;
    font-weight: 500;
`
export default function GovernanceDetails() {
    const { proposalId } = useParams()
    return (
        <Wrapper>
            <Card>
                <Header>Proposal id #{proposalId}</Header>
            </Card>
        </Wrapper>
    )
}
