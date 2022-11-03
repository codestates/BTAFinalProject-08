import { Card, Divider } from 'antd'
import styled from 'styled-components'

const CardSecondRowColRoot = styled.div`
    background-color: #ffffff;
    width: 22%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    padding: 0px;
    min-width: 190px;
    height: 100%;
`
const TwoDivideCard = styled(Card)`
    height: 100%;
    width: 100%;
    padding: 0px;
`
const TwoDivideCardContent = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
const TwoDivideCardContentIcon = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TwoDivideCardContentText = styled.div`
    width: 70%;
`
const TwoDivideCardContentTextHeader = styled.div`
    font-weight: 500;
`
const TwoDivideCardContentTextContent = styled.div``

export default function CardSecondRowCol({
    icon1,
    icon2,
    header1,
    header2,
    data1,
    data2,
}) {
    return (
        <CardSecondRowColRoot>
            <TwoDivideCard>
                <TwoDivideCardContent>
                    <TwoDivideCardContentIcon>{icon1}</TwoDivideCardContentIcon>
                    <TwoDivideCardContentText>
                        <TwoDivideCardContentTextHeader>
                            {header1}
                        </TwoDivideCardContentTextHeader>
                        <TwoDivideCardContentTextContent>
                            {data1}
                        </TwoDivideCardContentTextContent>
                    </TwoDivideCardContentText>
                </TwoDivideCardContent>
                <Divider />
                <TwoDivideCardContent>
                    <TwoDivideCardContentIcon>{icon2}</TwoDivideCardContentIcon>
                    <TwoDivideCardContentText>
                        <TwoDivideCardContentTextHeader>
                            {header2}
                        </TwoDivideCardContentTextHeader>
                        <TwoDivideCardContentTextContent>
                            {data2}
                        </TwoDivideCardContentTextContent>
                    </TwoDivideCardContentText>
                </TwoDivideCardContent>
            </TwoDivideCard>
        </CardSecondRowColRoot>
    )
}
