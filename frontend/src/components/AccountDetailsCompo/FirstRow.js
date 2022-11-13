import styled from 'styled-components'
import { cardShadow } from '../../utils/color'
import { cardBorderRadius, refetchTime } from '../../utils/size'
import { Pie } from '@ant-design/plots'
import { Header } from 'antd/lib/layout/layout'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { uosmoToOsmo } from '../../utils/converter'
import { useQuery } from 'react-query'
import { getMarketPrice } from '../../api/blockchain'

const FirstRowRoot = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
`
const FirstRow1Col = styled.div`
    background-color: #111111;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
    width: 40%;
    height: 100%;
    padding: 20px;
`

const FirstRow2Col = styled.div`
    padding: 20px;
    width: 58%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: ${cardShadow};
`
const FirstRow2ColorHeader = styled.div`
    font-size: 24px;
    font-weight: 500;
    width: 100%;
    height: 20%;
`

const FirstRow1ColHeader = styled.div`
    height: 20%;
    width: 100%;
`
const Address = styled.div`
    color: #89909b;
    cursor: pointer;
`

const Price = styled.div`
    width: 100%;
    height: 15%;
    margin-bottom: 10px;
`
const PriceText = styled.div`
    color: #ffffff;
    font-weight: 500;
`
const FirstRow1ColDivHeader = styled.div`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
`
const FirstRow1ColBody = styled.div`
    height: 80%;
    width: 100%;
`

export default function FirstRow({ staData, addressid }) {
    //console.log('[staData]', staData)
    const market = useQuery(['price'], getMarketPrice, {
        refetchInterval: refetchTime,
    })
    const [totalValue, setTotalValue] = useState(0)
    const [totalNum, setTotalNum] = useState(0)
    //console.log('[market]', market.data)
    //market_data current_price usd
    const [data, setData] = useState([])
    useEffect(() => {
        const data = [
            {
                type: 'availableTokens',
                value: uosmoToOsmo(parseInt(staData?.availableTokens)),
            },
            {
                type: 'bondedTokens',
                value: uosmoToOsmo(parseInt(staData?.bondedTokens)),
            },
            {
                type: 'reward',
                value: uosmoToOsmo(parseInt(staData?.stakingReward)),
            },
        ]
        const total = uosmoToOsmo(
            parseFloat(staData?.availableTokens) +
                parseFloat(staData?.bondedTokens) +
                parseFloat(staData?.stakingReward)
        )
        setTotalNum(total)
        setData(data)
    }, [staData?.bondedTokens, staData?.availableTokens, addressid])
    useEffect(() => {
        const value = (
            market.data?.market_data?.current_price?.usd * totalNum
        ).toFixed(2)
        setTotalValue(value)
    }, [totalNum])

    const config = {
        appendPadding: 10,
        data,
        theme: 'dark',
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => ``,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            autoRotate: false,
            content: '{value}',
            style: {
                textAlign: 'center',
                fill: '#fff',
            },
        },
        statistic: {
            title: '',
            content: '',
        },
        pieStyle: {
            lineWidth: 0,
        },
    }

    return (
        <FirstRowRoot>
            <FirstRow1Col>
                <FirstRow1ColHeader>
                    <FirstRow1ColDivHeader>Address</FirstRow1ColDivHeader>
                    <Address>{addressid}</Address>
                </FirstRow1ColHeader>
                <FirstRow1ColBody>
                    <Price>
                        <FirstRow1ColDivHeader>
                            Total Value
                        </FirstRow1ColDivHeader>
                        <PriceText>$ {!totalValue ? 0 : totalValue}</PriceText>
                    </Price>
                    <Pie loading={!data ? true : false} {...config} />
                </FirstRow1ColBody>
            </FirstRow1Col>
            <FirstRow2Col>
                <FirstRow2ColorHeader>Votes</FirstRow2ColorHeader>
                <Table></Table>
            </FirstRow2Col>
        </FirstRowRoot>
    )
}
