import { Card, Divider } from 'antd'
import styled from 'styled-components'
import { cardShadow } from '../utils/color'
import { cardBorderRadius } from '../utils/size'

const InfoContentRoot = styled.div`
    width: 100%;
    height: 400px;
    background-color: #ffffff;
    margin-top: 4px;
    border-radius: ${cardBorderRadius};
    box-shadow: ${cardShadow};
`
const InfoWrapDiv = styled.div`
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const InfoDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
`
const InfoDivHeader = styled.div`
    width: 20%;
    font-weight: 500;
`
const InfoDivBody = styled.div`
    width: 80%;
`
export default function InfoContent({
    chainid,
    txhash,
    status,
    height,
    time,
    fee,
    gas,
    memo,
    loading,
    data,
}) {
    return (
        <InfoContentRoot>
            <Card style={{ height: '400px' }} loading={loading}>
                <h2>Information</h2>
                <Divider />
                {chainid && (
                    <InfoWrapDiv>
                        <InfoDiv>
                            <InfoDivHeader>Chain Id</InfoDivHeader>
                            <InfoDivBody>{chainid}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>TxHash</InfoDivHeader>
                            <InfoDivBody>{txhash}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Status</InfoDivHeader>
                            <InfoDivBody>{status}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Height</InfoDivHeader>
                            <InfoDivBody>{height}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Time</InfoDivHeader>
                            <InfoDivBody>{time}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Fee</InfoDivHeader>
                            <InfoDivBody>{fee}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Gas (used / wanted)</InfoDivHeader>
                            <InfoDivBody>{gas}</InfoDivBody>
                        </InfoDiv>
                        <InfoDiv>
                            <InfoDivHeader>Memo</InfoDivHeader>
                            <InfoDivBody>{memo}</InfoDivBody>
                        </InfoDiv>
                    </InfoWrapDiv>
                )}
            </Card>
        </InfoContentRoot>
    )
}
