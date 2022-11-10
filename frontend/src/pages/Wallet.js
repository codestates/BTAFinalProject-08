import { Card, Tabs } from 'antd'
import styled from 'styled-components'
import Governance from '../components/WalletCompo/Governance'
import Staking from '../components/WalletCompo/Staking'

const Wrapper = styled.div`
    min-width: 900px;
    max-width: 1200px;
    max-height: 900px;
    width: 100%;
    height: 100%;
`
const Header = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10p;
`

const items = [
    { label: 'Staking', key: 'item-1', children: <Staking /> }, // remember to pass the key prop
    { label: 'Governance', key: 'item-2', children: <Governance /> },
]

export default function Wallet() {
    return (
        <Wrapper>
            <Header>Wallet</Header>
            <Card>
                <Tabs items={items} />
            </Card>
        </Wrapper>
    )
}
