import { Card, Divider, Table } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBlockIdTransaction, getBlockInfo } from '../api/blockchain'
import ContentHeaderDiv from '../components/BlockDetailsCompo/ContentHeaderDiv'
import { validatorMap } from '../utils/blockchain'
import { cardShadow } from '../utils/color'
import { cardBorderRadius, refetchTime } from '../utils/size'
import { subtractNowAndTime } from '../utils/time'

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
        dataIndex: 'type',
    },
    {
        title: 'Type',
        dataIndex: 'type',
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
    {
        title: 'Time',
    },
]
export default function BlockDetails() {
    const { blockid } = useParams()
    const { isLoading, data } = useQuery(
        ['blockDetails', blockid],
        () => getBlockInfo(blockid),
        {
            refetchInterval: refetchTime,
        }
    )

    //console.log(blockTransaction.data)
    // tx > value > msg[] > value
    /*!SECTION
        {
            "type": "cosmos-sdk/MsgSend",
            "value": {
            "from_address": "osmo1mhfgfenrp88d2p5dttyw59x8frfk7u9lx9qkjr",
            "to_address": "osmo16hjflhqx57h8967sn0kyvg2yparyn7e3j6n08h",
            "amount": [
                {
                "denom": "uosmo",
                "amount": "1000000000"
                }
            ]
            }
        }
    */
    return (
        <Wrapper>
            <Header>Details for Block #{blockid}</Header>
            <ContentHeader>
                <Card
                    loading={isLoading}
                    style={{
                        height: '400px',
                        borderRadius: `${cardBorderRadius}`,
                    }}
                >
                    <h2>Header</h2>
                    <Divider></Divider>

                    {data && (
                        <ContentHeaderWrapDiv>
                            <ContentHeaderDiv
                                header={'Chain Id'}
                                content={data.chainId}
                            />
                            <ContentHeaderDiv
                                header={'Height'}
                                content={data.height}
                            />
                            <ContentHeaderDiv
                                header={'Block Time'}
                                content={subtractNowAndTime(data.time)}
                            />
                            <ContentHeaderDiv
                                header={'Block Hash'}
                                content={data.hash}
                            />
                            <ContentHeaderDiv
                                header={'Number of Tx'}
                                content={data.numOfTx}
                            />
                            <ContentHeaderDiv
                                header={'Gas (used / wanted)'}
                                content={`${
                                    data.gas.gasUsed +
                                    ' / ' +
                                    data.gas.gasWanted
                                }`}
                            />
                            <ContentHeaderDiv
                                header={'Block Round'}
                                content={data.round}
                            />
                            <ContentHeaderDiv
                                header={'Proposer'}
                                content={
                                    <a>{validatorMap[data.proposerAddress]} </a>
                                }
                            />
                        </ContentHeaderWrapDiv>
                    )}
                </Card>
            </ContentHeader>
            <ContentTransaction>
                <h2>Transactions</h2>
                <Table columns={column}></Table>
            </ContentTransaction>
        </Wrapper>
    )
}
