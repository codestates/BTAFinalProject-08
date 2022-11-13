import { Button, Card, Divider } from 'antd'
import styled from 'styled-components'
import { cardBorderRadius } from '../../../utils/size'
import { Icon } from '@iconify/react'
import { useState } from 'react'

const CardSecondRowColRoot = styled.div`
    background-color: #ffffff;
    width: 22%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    padding: 0px;
    min-width: 190px;
    height: 100%;
    border-radius: ${cardBorderRadius};
`
const TwoDivideCard = styled(Card)`
    border-radius: ${cardBorderRadius};
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

const Header = styled.div`
    font-weight: 500;
    font-size: 18px;
    display: flex;
    height: 20%;
`
const HeaderText = styled.div`
    width: 50%;
`
const HeaderButton = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
`
const Content = styled.div`
    margin-top: 10px;
    background-color: #e5f7ff;
    border-radius: 10px;
    padding: 10px;
    color: #4472d2;
`

export default function CardSecondRowVoteCol({ icon1, header1, votingPeriod }) {
    const [num, setNum] = useState(0)
    if (!votingPeriod) {
        return
    }
    const limit = votingPeriod?.length
    const checkNum = (v) => {
        v = num + v
        if (v < 0) {
            v = limit - 1
        } else if (v >= limit) {
            v = 0
        }
        setNum(v)
    }

    return (
        <CardSecondRowColRoot>
            <TwoDivideCard>
                <Header>
                    <HeaderText>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon
                                icon="ic:round-how-to-vote"
                                style={{ marginRight: '2px' }}
                            />
                            Vote
                        </div>
                        <div style={{ fontWeight: 400, fontSize: '14px' }}>
                            {num + 1 + ' / ' + limit}
                        </div>
                    </HeaderText>
                    <HeaderButton>
                        <Button
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() => checkNum(-1)}
                        >
                            <Icon icon="bi:arrow-left" />
                        </Button>
                        <Button
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={() => checkNum(+1)}
                        >
                            <Icon icon="bi:arrow-right" />
                        </Button>
                    </HeaderButton>
                </Header>
                <Content>
                    <div style={{ fontWeight: 500 }}>
                        proposal #{!votingPeriod ? null : votingPeriod[num].id}
                    </div>
                    <div>{!votingPeriod ? null : votingPeriod[num].title}</div>
                </Content>
            </TwoDivideCard>
        </CardSecondRowColRoot>
    )
}
