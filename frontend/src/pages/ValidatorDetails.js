import { Card, Table } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getDelegations, getOperatorAddress } from '../api/blockchain'
import FirstRow from '../components/ValiDatorDetailsCompo/FirstRow'
import SecondRow from '../components/ValiDatorDetailsCompo/SecodeRow'
import ThirdRow from '../components/ValiDatorDetailsCompo/ThirdRow'
import { cardShadow, defaultColor, headerColor } from '../utils/color'
import { headerBold, headerSize, refetchTime } from '../utils/size'

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
    let limit = 20
    const { data, isLoading } = useQuery(
        ['operatorAddress', limit, valaddress],
        () => getOperatorAddress({ operatorAddress: valaddress, limit: limit }),
        {
            refetchInterval: refetchTime,
        }
    )

    //console.log(data, 'ge')
    //console.log(delegators?.data)
    return (
        <Wrapper>
            <WrapContent>
                <Header>VALIDATOR DETAILS</Header>

                <FirstRow
                    operatorAddr={valaddress}
                    addr={data?.addressInfo.address}
                    website=""
                    commission={(data?.commission * 100).toFixed(1) + '%'}
                    bodedHeight={data?.bondedHeight}
                    uptime={data?.isActive ? '100' : '0'}
                    selfBonded={data?.selfBonded}
                    details={data?.details}
                    loading={isLoading}
                />
                <SecondRow
                    proposedData={data?.proposedBlocks}
                    delegators={data?.delegators}
                    loading={isLoading}
                />
                <ThirdRow voteData={''} loading={false} />
            </WrapContent>
        </Wrapper>
    )
}
