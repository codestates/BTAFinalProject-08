import styled from 'styled-components'
import { Icon } from '@iconify/react'
import React from 'react'
import { defaultText } from '../../utils/color'
import { osmosisLogo } from '../../utils/logo'

const CardFirstRow2ColRoot = styled.div`
    width: 27%;
    height: 100%;
`

const IntroduceCard = styled.div`
    padding: 15px;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`

const CardFirstRow2ColHeader = styled.div`
    height: 15%;
    width: 30%;
    color: ${defaultText};
    font-size: 20px;
    display: flex;
    flex-direction: column;
    font-weight: 400;
`
const CardFirstRow2ColBody = styled.div`
    color: #4b525d;
`
const CardFirstRow2ColFooter = styled.div`
    height: 30px;
`
const CardFirstRow2ColWrapIcon = styled.div`
    width: 30%;
    height: 100%;
`

export default function CardFirstRow2Col() {
    return (
        <CardFirstRow2ColRoot>
            <IntroduceCard>
                <CardFirstRow2ColHeader>
                    <CardFirstRow2ColWrapIcon>
                        <img
                            src={osmosisLogo}
                            style={{ width: '52px' }}
                            alt="logo"
                        />
                    </CardFirstRow2ColWrapIcon>
                    osmosis
                </CardFirstRow2ColHeader>
                <CardFirstRow2ColBody>
                    The interchain AMM powered by the Cosmos Inter-Blockchain
                    Communication protocol.
                </CardFirstRow2ColBody>
                <CardFirstRow2ColFooter>
                    <Icon
                        icon="fa6-brands:square-github"
                        width="24"
                        color="#4B525D"
                    />
                </CardFirstRow2ColFooter>
            </IntroduceCard>
        </CardFirstRow2ColRoot>
    )
}
