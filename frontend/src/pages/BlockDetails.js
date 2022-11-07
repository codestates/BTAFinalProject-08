import { Card, Divider, Table } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBlockInfo } from '../api/blockchain'
import ContentHeaderDiv from '../components/BlockDetailsCompo/ContentHeaderDiv'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'

const Wrapper = styled.div`
    max-width: 1000px;
    min-height: 600px;
    width: 100%;
`

const Header = styled.div`
    width: 100%;
    height: 40px;
    font-size: 32px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
`
const ContentHeader = styled.div`
    height: 400px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: ${cardShadow};
    border-radius: ${cardBorderRadius};
`
const ContentTransaction = styled.div`
    margin-top: 10px;
    height: 340px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: ${cardShadow};
    padding: 10px;
`
const ContentHeaderWrapDiv = styled.div`
    height: 280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10px;
`
const column = [
    {
        title: 'Tx Hash',
    },
    {
        title: 'Type',
    },
    {
        title: 'Result',
    },
    {
        title: 'Amount',
    },
    {
        title: 'Fee',
    },
]
export default function BlockDetails() {
    const { blockid } = useParams()
    const { isLoading, data } = useQuery(['blockDetail'], getBlockInfo)
    console.log(data)
    return (
        <Wrapper>
            <Header>Details for Block #{blockid}</Header>
            <ContentHeader>
                <Card
                    loading={false}
                    style={{
                        height: '400px',
                        borderRadius: `${cardBorderRadius}`,
                    }}
                >
                    <h2>Header</h2>
                    <Divider></Divider>
                    <ContentHeaderWrapDiv>
                        <ContentHeaderDiv
                            header={'Chain Id'}
                            content={'mintchoco'}
                        />
                        <ContentHeaderDiv header={'Height'} content={blockid} />
                        <ContentHeaderDiv
                            header={'Block Time'}
                            content={'17m ago ( 2022-11-06 16:31:37 )'}
                        />
                        <ContentHeaderDiv
                            header={'Block Hash'}
                            content={
                                'B4923806813BE3E684D1C7E2C3A4BA4FD88B3A4464CDF5C17C44CEA11833A26C'
                            }
                        />
                        <ContentHeaderDiv
                            header={'Number of Tx'}
                            content={'6'}
                        />
                        <ContentHeaderDiv
                            header={'Gas (used / wanted)'}
                            content={' 1716987 / 2549326'}
                        />
                        <ContentHeaderDiv
                            header={'Block Round'}
                            content={'-'}
                        />
                        <ContentHeaderDiv
                            header={'Proposer'}
                            content={<a>cothi</a>}
                        />
                    </ContentHeaderWrapDiv>
                </Card>
            </ContentHeader>
            <ContentTransaction>
                <h2>Transactions</h2>
                <Table columns={column}></Table>
            </ContentTransaction>
        </Wrapper>
    )
}
