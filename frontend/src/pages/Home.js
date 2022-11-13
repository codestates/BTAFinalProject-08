import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getDashboardStatistics } from '../api/blockchain'
import HomeBlockTable from '../components/HomeCompo/HomeBlockTable'
import HomeCardFirstRow from '../components/HomeCompo/HomeFirstRow'
import HomeCardSecondRow from '../components/HomeCompo/HomeSecodeRow'
import HomeTranTable from '../components/HomeCompo/HomeTranTable'
import { cardBorderRadius, refetchTime } from '../utils/size'
const Wrapper = styled.div`
    //min-height: 1300px;
    max-width: 1200px;
    width: 100%;
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
    border-radius: ${cardBorderRadius};
    background-color: #ffffff;
    padding: 10px;
    width: 49%;
    margin: 10px 10px 0 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const CardThirdRow2Col = styled.div`
    border-radius: ${cardBorderRadius};
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
    const { data, isLoading } = useQuery(
        ['homeDashboard'],
        getDashboardStatistics,
        {
            refetchInterval: refetchTime,
        }
    )
    console.log(data)
    /*
        NOTE 블록, 트랜잭션, 본디드 토큰, 풀, 인플레이션, 스테이킹 apr, 로딩을 요청하고 데이터
        를 뿌려준다.
    */
    return (
        <Wrapper>
            <CardWHeaderrapper>
                <HomeCardFirstRow />
                <HomeCardSecondRow
                    height={data?.height}
                    transaction={data?.transactions}
                    bondedToken={data?.bondedTokens}
                    communnityPool={data?.communityPool}
                    totalValidators={data?.totalValidators}
                    activeValidator={data?.activeValidators}
                    loading={true}
                />

                <CardThirdRow>
                    <CardThirdRow1Col>
                        <HomeTableHeader>BLOCKS</HomeTableHeader>
                        <HomeBlockTable />
                    </CardThirdRow1Col>
                    <CardThirdRow2Col>
                        <HomeTableHeader>TRANSACTIONS</HomeTableHeader>
                        <HomeTranTable />
                    </CardThirdRow2Col>
                </CardThirdRow>
            </CardWHeaderrapper>
        </Wrapper>
    )
}

export default Home
