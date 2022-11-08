import { Card, Table } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import FirstRow from '../components/ValiDatorDetailsCompo/FirstRow'
import SecondRow from '../components/ValiDatorDetailsCompo/SecodeRow'
import ThirdRow from '../components/ValiDatorDetailsCompo/ThirdRow'
import { cardShadow, defaultColor, headerColor } from '../utils/color'
import { headerBold, headerSize } from '../utils/size'

const Wrapper = styled.div`
    min-width: 1100px;
    max-width: 1200px;
    display: flex;
    justify-content: center;
`

const WrapContent = styled.div`
    width: 100%;
    margin-bottom: 200px;
`
const Header = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: flex-end;
    font-size: ${headerSize};
    color: ${defaultColor};
    font-weight: ${headerBold};
`

export default function ValidatorDetails() {
    const { valaddress } = useParams()
    console.log(valaddress, 'params')
    return (
        <Wrapper>
            <WrapContent>
                <Header>VALIDATOR DETAILS</Header>
                <FirstRow
                    operatorAddr={valaddress}
                    addr="osmo1clpqr4nrk4khgkxj78fcwwh6dl3uw4epasmvnj"
                    website="https://www.naver.com"
                    commission="7%"
                    bodedHeight="1"
                    uptime="100"
                    selfBonded="1"
                    details="none"
                    loading={true}
                />
                <SecondRow
                    valiAddress={valaddress}
                    proposedData={''}
                    loading={false}
                />
                <ThirdRow voteData={''} loading={false} />
            </WrapContent>
        </Wrapper>
    )
}
