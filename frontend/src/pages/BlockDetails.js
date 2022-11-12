import { Card, Divider, Table } from 'antd'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getBlockInfo } from '../api/blockchain'
import ContentHeaderDiv from '../components/BlockDetailsCompo/ContentHeaderDiv'
import { operatorMap, validatorMap } from '../utils/blockchain'
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
        dataIndex: 'txHash',
        render: (txt) => (
            <Link to={`/txs/${txt}`}>
                {txt.slice(0, 6) + '...' + txt.slice(-7, -1)}
            </Link>
        ),
        key: 'txHash',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: (txt) => <>{txt}</>,
    },
    {
        title: 'Result',
        dataIndex: 'status',
        render: (txt) => <>success</>,
        key: 'status',
    },

    {
        title: 'Fee',
        dataIndex: 'fee',
        render: (txt) => <>{txt + 'uosmo'}</>,
    },
    {
        title: 'Height',
        dataIndex: 'height',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        render: (txt) => <>{subtractNowAndTime(txt)}</>,
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
                                content={data.blockInfo.chainId}
                            />
                            <ContentHeaderDiv
                                header={'Height'}
                                content={data.blockInfo.height}
                            />
                            <ContentHeaderDiv
                                header={'Block Time'}
                                content={subtractNowAndTime(
                                    data.blockInfo.time
                                )}
                            />
                            <ContentHeaderDiv
                                header={'Block Hash'}
                                content={data.blockInfo.hash}
                            />
                            <ContentHeaderDiv
                                header={'Number of Tx'}
                                content={data.blockInfo.numOfTx}
                            />
                            {/*<ContentHeaderDiv
                                header={'Gas (used / wanted)'}
                                content={`${
                                    data.blockInfo.gas.gasUsed +
                                    ' / ' +
                                    data.gas.gasWanted
                                }`}
                            />*/}
                            <ContentHeaderDiv
                                header={'Block Round'}
                                content={data.blockInfo.round}
                            />
                            <ContentHeaderDiv
                                header={'Proposer'}
                                content={
                                    <Link
                                        to={`/validators/${
                                            operatorMap[
                                                data.blockInfo.proposerAddress
                                            ]
                                        }`}
                                    >
                                        {
                                            validatorMap[
                                                data.blockInfo.proposerAddress
                                            ]
                                        }
                                    </Link>
                                }
                            />
                        </ContentHeaderWrapDiv>
                    )}
                </Card>
            </ContentHeader>
            <ContentTransaction>
                <h2>Transactions</h2>
                <Table
                    loading={isLoading}
                    columns={column}
                    dataSource={!data ? null : data.txs}
                ></Table>
            </ContentTransaction>
        </Wrapper>
    )
}
