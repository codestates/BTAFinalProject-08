import { Card } from 'antd'
import styled from 'styled-components'
import { defaultText } from '../../utils/color'
import React from 'react'
import CardFirstRow2Col from './HomeCardFistRow2Col'
import { osmosisLogo } from '../../utils/logo'
import HomeCardFirstRowGragh from './HomeCardFirstRowGragh'

const CardFirstRowRoot = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 310px;
`
const CardFirstRow1Col = styled.div`
    width: 68%;
    min-width: 514px;
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

export default function HomeCardFirstRow() {
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
                        <HomeCardFirstRowGragh />
                    </div>
                </GraphPriceCard>
            </CardFirstRow1Col>
            <CardFirstRow2Col />
        </CardFirstRowRoot>
    )
}
