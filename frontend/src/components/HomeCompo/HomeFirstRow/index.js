import { Card } from 'antd'
import styled from 'styled-components'
import { defaultColor, defaultText } from '../../../utils/color'
import React from 'react'
import CardFirstRow2Col from './HomeCardFistRow2Col'
import { osmosisLogo } from '../../../utils/logo'
import HomeCardFirstRowGragh from './HomeCardFirstRowGragh'
import { useQuery } from 'react-query'
import { getMarketPrice } from '../../../api/blockchain'

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
    color: ${defaultColor};
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
    color: ${defaultColor};
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
    const { isLoading, data } = useQuery(['maketPrice'], getMarketPrice)
    return (
        <CardFirstRowRoot>
            <CardFirstRow1Col>
                <GraphPriceCard loading={isLoading}>
                    {data && (
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
                                    <CardPriceHeaderText>
                                        OSMO
                                    </CardPriceHeaderText>
                                </CardPriceHeader>
                                <CardPriceBody>
                                    <CardPriceBodyContent>
                                        {'$' +
                                            data.market_data.current_price.usd}
                                    </CardPriceBodyContent>
                                    <CardPriceBodyFooter>
                                        <div>Coingeko</div>
                                        <div>
                                            {data.market_data.price_change_24h_in_currency.usd.toFixed(
                                                2
                                            )}
                                            % (24h)
                                        </div>
                                    </CardPriceBodyFooter>
                                </CardPriceBody>
                                <CardPriceFooter>
                                    <CardPriceFooterDiv>
                                        <CardPriceFooterDivHeader>
                                            Market Cap
                                        </CardPriceFooterDivHeader>
                                        <div>
                                            {data.market_data.market_cap.usd}$
                                        </div>
                                    </CardPriceFooterDiv>
                                    <CardPriceFooterDiv>
                                        <CardPriceFooterDivHeader>
                                            Volume
                                        </CardPriceFooterDivHeader>
                                        <div>
                                            {data.market_data.total_volume.usd}$
                                        </div>
                                    </CardPriceFooterDiv>
                                </CardPriceFooter>
                            </CardPrice>
                            <HomeCardFirstRowGragh />
                        </div>
                    )}
                </GraphPriceCard>
            </CardFirstRow1Col>
            <CardFirstRow2Col />
        </CardFirstRowRoot>
    )
}
