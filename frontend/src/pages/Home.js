import { Card, Col, Divider, Layout, Row, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CardSecondRow from '../components/HomeSecodeRow'
import CardFirstRow from '../components/HomeCardFirstRow'
import HomeCardFirstRow from '../components/HomeCardFirstRow'
import HomeCardSecondRow from '../components/HomeSecodeRow'
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
                <HomeCardFirstRow />
                <HomeCardSecondRow
                    height={1}
                    transaction={2}
                    bondedToken={3}
                    communnityPool={4}
                    inflation={5}
                    stakingApr={6}
                    loading={true}
                />

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
