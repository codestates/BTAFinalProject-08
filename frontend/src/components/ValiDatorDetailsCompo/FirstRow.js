import { Card, Divider, Progress } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { cardShadow, defaultColor } from '../../utils/color'
import { cardBorderRadius } from '../../utils/size'

const FirstRowRoot = styled.div`
    height: 500px;
    width: 100%;
    background-color: #ffffff;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
    margin-top: 10px;
`
const FirstRowHeader = styled.div`
    height: 100px;
    display: flex;
`
const FirstRowHeaderLeft = styled.div`
    width: 50%;
    height: 100%;
`
const FirstRowHeaderLeftHeader = styled.div`
    width: 100%;
    height: 50%;
    font-weight: 500;
    color: ${defaultColor};
`
const FirstRowHeaderLeftBody = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FirstRowHeaderRight = styled.div`
    width: 50%;
    height: 100%;
`
const FirstRowHeaderRightHeader = styled.div`
    width: 100%;
    height: 50%;
`
const FirstRowHeaderRightBody = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const FirstRowBody = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const FirstRowBodyDiv = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
`
const FirstRowBodyDivHeader = styled.div`
    width: 20%;
    height: 100%;
`
const FirstRowBodyDivContent = styled.div`
    width: 80%;
    height: 100%;
`
export default function FirstRow({
    operatorAddr = 'osmovaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4ep88n0y4',
    addr = 'osmo1clpqr4nrk4khgkxj78fcwwh6dl3uw4epasmvnj',
    website = 'https://www.naver.com',
    commission = '0.10',
    uptime = '0.2',
    selfBonded = '1',
    bodedHeight = '1',
    details = 'null',
}) {
    return (
        <FirstRowRoot>
            <Card
                style={{
                    height: '500px',
                }}
            >
                <FirstRowHeader>
                    <FirstRowHeaderLeft>
                        <FirstRowHeaderLeftHeader>
                            <h2>MONIKER</h2>
                        </FirstRowHeaderLeftHeader>
                        <FirstRowHeaderLeftBody>
                            <h3>Operator Address</h3>
                            <p>{operatorAddr}</p>
                        </FirstRowHeaderLeftBody>
                    </FirstRowHeaderLeft>
                    <FirstRowHeaderRight>
                        <FirstRowHeaderRightHeader></FirstRowHeaderRightHeader>
                        <FirstRowHeaderRightBody>
                            <h3>Address</h3>
                            <p>
                                <Link to={`/account/${addr}`}>{addr}</Link>
                            </p>
                        </FirstRowHeaderRightBody>
                    </FirstRowHeaderRight>
                </FirstRowHeader>
                <Divider />
                <FirstRowBody>
                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3>Uptime</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                percent={uptime}
                            />
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>
                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3> Website</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            <a>{website}</a>
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>
                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3>Commission</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            {commission}
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>

                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3>Bonded Height</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            {bodedHeight}
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>
                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3>Self Bonded</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            {selfBonded}
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>
                    <FirstRowBodyDiv>
                        <FirstRowBodyDivHeader>
                            <h3>Details</h3>
                        </FirstRowBodyDivHeader>
                        <FirstRowBodyDivContent>
                            {details}
                        </FirstRowBodyDivContent>
                    </FirstRowBodyDiv>
                </FirstRowBody>
            </Card>
        </FirstRowRoot>
    )
}
