import { Card, Col, Row, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'

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
    height: 150px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
`

const CardSecondRowCol = styled.div`
    background-color: #ffffff;
    width: 22%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    height: 100%;
`
const CardThirdRow = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
`
const CardThirdRow1Col = styled.div`
    padding: 2px;
    width: 49%;
    margin: 10px 10px 0 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const CardThirdRow2Col = styled.div`
    width: 49%;
    margin: 10px 0 0 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const HomeTableHeader = styled.div`
    padding: 10px;
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
                    <CardSecondRowCol></CardSecondRowCol>
                    <CardSecondRowCol></CardSecondRowCol>
                    <CardSecondRowCol></CardSecondRowCol>
                    <CardSecondRowCol></CardSecondRowCol>
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
