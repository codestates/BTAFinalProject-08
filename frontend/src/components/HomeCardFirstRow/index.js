import { Card } from 'antd'
import styled from 'styled-components'
import { defaultText } from '../../utils/color'
import React, { useEffect, useState } from 'react'
import CardFirstRow2Col from './HomeCardFistRow2Col'
import { osmosisLogo } from '../../utils/logo'
import { Area } from '@ant-design/plots'

const CardFirstRowRoot = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 310px;
`
const CardFirstRow1Col = styled.div`
    width: 68%;
    height: 100%;
`

const GraphPriceCard = styled(Card)`
    height: 100%;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`
const CardPrice = styled.div`
    width: 40%;
    min-height: 240px;
    padding: 10px;
`
const CardPriceHeader = styled.div`
    height: 15%;
    display: flex;
    width: 100%;
`

const CardPriceHeaderIcon = styled.div`
    width: 12%;
    border-radius: 20px;
`

const CardPriceHeaderText = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${defaultText};
    font-weight: 500;
`
const CardPriceBody = styled.div`
    height: 60%;
`

const CardPriceBodyContent = styled.div`
    height: 70%;
    width: 100%;
    font-size: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-weight: 500;
    padding: 0 10px 0 0;
`

const CardPriceBodyFooter = styled.div`
    color: ${defaultText};
    height: 30%;
    padding: 5px 10px 10px 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const CardPriceFooter = styled.div`
    height: 30%;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px;
`
const CardPriceFooterDiv = styled.div`
    justify-content: space-between;
    width: 100%;
    height: 50%;
    display: flex;
`
const CardPriceFooterDivHeader = styled.div`
    font-weight: 500;
`

const CardGraph = styled.div`
    width: 60%;
    height: 240px;
`

export default function HomeCardFirstRow() {
    const [data, setData] = useState([])

    useEffect(() => {
        asyncFetch()
    }, [])

    const asyncFetch = () => {
        fetch(
            'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json'
        )
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error)
            })
    }
    const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            }
        },
    }
    return (
        <CardFirstRowRoot>
            <CardFirstRow1Col>
                <GraphPriceCard>
                    <div style={{ display: 'flex' }}>
                        <CardPrice>
                            <CardPriceHeader>
                                <CardPriceHeaderIcon>
                                    <img
                                        src={osmosisLogo}
                                        alt="logo"
                                        width={32}
                                    />
                                </CardPriceHeaderIcon>
                                <CardPriceHeaderText>OSMO</CardPriceHeaderText>
                            </CardPriceHeader>
                            <CardPriceBody>
                                <CardPriceBodyContent>
                                    $1.59
                                </CardPriceBodyContent>
                                <CardPriceBodyFooter>
                                    <div>Coingeko</div>
                                    <div>+ 4.59%(24h)</div>
                                </CardPriceBodyFooter>
                            </CardPriceBody>
                            <CardPriceFooter>
                                <CardPriceFooterDiv>
                                    <CardPriceFooterDivHeader>
                                        Market Cap
                                    </CardPriceFooterDivHeader>
                                    <div>20 $</div>
                                </CardPriceFooterDiv>
                                <CardPriceFooterDiv>
                                    <CardPriceFooterDivHeader>
                                        24h Vol
                                    </CardPriceFooterDivHeader>
                                    <div>20 $</div>
                                </CardPriceFooterDiv>
                            </CardPriceFooter>
                        </CardPrice>
                        <CardGraph>
                            <Area {...config} />
                        </CardGraph>
                    </div>
                </GraphPriceCard>
            </CardFirstRow1Col>
            <CardFirstRow2Col />
        </CardFirstRowRoot>
    )
}
