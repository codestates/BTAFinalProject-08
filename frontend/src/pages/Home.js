import { Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import HomeCardFirstRow from '../components/HomeFirstRow'
import HomeCardSecondRow from '../components/HomeSecodeRow'
const Wrapper = styled.div`
    width: 100%;
    padding: 0 2% 0 2%;
    //min-height: 1300px;
    max-width: 1300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CardWHeaderrapper = styled.div`
    width: 100%;
    height: 100%;
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

const columnsBlock = [
    {
        title: 'Height',
    },
    {
        title: 'Proposer',
    },
    {
        title: 'Txs',
    },
    {
        title: 'Time',
    },
]
const columnsTransaction = [
    {
        title: 'Tx Hash',
    },
    {
        title: 'Type',
    },
    {
        title: 'Height',
    },
    {
        title: 'Time',
    },
]

const Home = () => {
    /*
        NOTE 블록, 트랜잭션, 본디드 토큰, 풀, 인플레이션, 스테이킹 apr, 로딩을 요청하고 데이터
        를 뿌려준다.
    */
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
                        <Table columns={columnsBlock}></Table>
                    </CardThirdRow1Col>
                    <CardThirdRow2Col>
                        <HomeTableHeader>TRANSACTIONS</HomeTableHeader>
                        <Table columns={columnsTransaction}></Table>
                    </CardThirdRow2Col>
                </CardThirdRow>
            </CardWHeaderrapper>
        </Wrapper>
    )
}

export default Home
