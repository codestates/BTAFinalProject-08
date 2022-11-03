import { Icon } from '@iconify/react'
import { GiToken } from 'react-icons/gi'
import { Card, Col, Divider, Row, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CardSecondRowCol from '../components/HomeDivideCard'

const Wrapper = styled.div`
    width: 100%;
    height: 95%;
    padding: 0 2% 0 2%;
    max-width: 1300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CardWHeaderrapper = styled.div`
    width: 100%;
    height: 300px;
`

const CardFirstRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 310px;
`
const CardFirstRow1Col = styled.div`
    width: 68%;
    height: 100%;
`
const CardFirstRow2Col = styled.div`
    width: 27%;
    height: 100%;
`
const GraphCard = styled(Card)`
    height: 100%;

    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const IntroduceCard = styled(Card)`
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`

const CardSecondRow = styled.div`
    height: 190px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
`

const CardThirdRow = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
`
const CardThirdRow1Col = styled.div`
    background-color: #ffffff;
    padding: 10px;
    width: 49%;
    margin: 10px 10px 0 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const CardThirdRow2Col = styled.div`
    background-color: #ffffff;
    padding: 10px;
    width: 49%;
    margin: 10px 0 0 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const HomeTableHeader = styled.div`
    font-weight: 500;
    background-color: white;
    font-size: 18px;
`

const Home = () => {
    return (
        <Wrapper>
            <CardWHeaderrapper>
                <CardFirstRow>
                    <CardFirstRow1Col>
                        <GraphCard>Content</GraphCard>
                    </CardFirstRow1Col>
                    <CardFirstRow2Col>
                        <IntroduceCard style={{ height: '100%' }} />
                    </CardFirstRow2Col>
                </CardFirstRow>
                <CardSecondRow>
                    <CardSecondRowCol
                        icon1={
                            <Icon
                                icon="clarity:blocks-group-solid"
                                width="32"
                            />
                        }
                        header1={'Height'}
                        data1={'1'}
                        icon2={<Icon icon="uil:transaction" width="32" />}
                        header2={'Transactions'}
                        data2={'2'}
                    />
                    <CardSecondRowCol
                        icon1={<GiToken size={24} />}
                        header1={'Bonded Token'}
                        data1={'1'}
                        icon2={
                            <Icon
                                icon="mdi:google-circles-communities"
                                width="32"
                            />
                        }
                        header2={'Community Pool'}
                        data2={'2'}
                    />
                    <CardSecondRowCol
                        icon1={<Icon icon="octicon:graph-16" width="32" />}
                        header1={'Inflation'}
                        data1={'1'}
                        icon2={
                            <Icon icon="iconoir:percentage-square" width={32} />
                        }
                        header2={'Staking APR'}
                        data2={'2'}
                    />
                    <CardSecondRowCol
                        icon1={
                            <Icon
                                icon="clarity:blocks-group-solid"
                                width="32"
                            />
                        }
                        header1={'Staking APR'}
                        data1={'1'}
                        icon2={<Icon icon="uil:transaction" width="32" />}
                        header2={'Transactions'}
                        data2={'2'}
                    />
                </CardSecondRow>
                <CardThirdRow>
                    <CardThirdRow1Col>
                        <HomeTableHeader>BLOCKS</HomeTableHeader>
                        <Table></Table>
                    </CardThirdRow1Col>
                    <CardThirdRow2Col>
                        <HomeTableHeader>TRANSACTIONS</HomeTableHeader>
                        <Table></Table>
                    </CardThirdRow2Col>
                </CardThirdRow>
            </CardWHeaderrapper>
        </Wrapper>
    )
}

export default Home
