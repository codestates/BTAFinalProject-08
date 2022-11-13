import React, { useState } from 'react'
import { Layout, Menu, Input } from 'antd'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { integerCheck } from '../../utils/blockchain'

const { Header } = Layout
const { Search } = Input

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    font-weight: 500;
`
const ItemWrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Navbar = () => {
    const [error, setError] = useState(false)
    const navi = useNavigate()
    const onSearch = (v) => {
        if (v.startsWith('osmovaloper', 0)) {
            navi(`/validators/${v}`)
        } else if (v.startsWith('osmo', 0)) {
            navi(`/account/${v}`)
        } else if (v.length === 64) {
            navi(`/txs/${v}`)
        } else if (integerCheck(v)) {
            navi(`/blocks/${v}`)
        } else {
            setError(true)
            return
        }
        setError(false)
    }
    return (
        <>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ItemWrapper>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ width: '100%' }}
                        items={[
                            {
                                key: 'DASHBOARD',
                                label: (
                                    <StyledLink to="/">
                                        <Icon
                                            icon="fluent:board-split-28-regular"
                                            style={{ marginRight: '5px' }}
                                        />
                                        DASHBOARD
                                    </StyledLink>
                                ),
                            },
                            {
                                key: 'VALIDATORS',
                                label: (
                                    <StyledLink to="/validators">
                                        <Icon
                                            icon="akar-icons:people-group"
                                            style={{ marginRight: '5px' }}
                                        />
                                        VALIDATORS
                                    </StyledLink>
                                ),
                            },
                            {
                                key: 'BLOCKS',
                                label: (
                                    <StyledLink to="/blocks">
                                        <Icon
                                            icon="eos-icons:blockchain"
                                            style={{ marginRight: '5px' }}
                                        />
                                        BLOCKS
                                    </StyledLink>
                                ),
                            },
                            {
                                key: 'Faucet',
                                label: (
                                    <StyledLink to="/faucet">
                                        <Icon
                                            icon="fa6-solid:faucet"
                                            style={{ marginRight: '5px' }}
                                        />
                                        FAUCET
                                    </StyledLink>
                                ),
                            },
                            {
                                key: 'Governance',
                                label: (
                                    <StyledLink to="/governance">
                                        <Icon
                                            icon="fa-solid:vote-yea"
                                            style={{ marginRight: '5px' }}
                                        />
                                        GOVERNANCE
                                    </StyledLink>
                                ),
                            },
                            {
                                key: 'Wallet',
                                label: (
                                    <StyledLink
                                        to="/wallet"
                                        reloadDocument={true}
                                    >
                                        <Icon
                                            icon="fluent:wallet-32-regular"
                                            style={{ marginRight: '5px' }}
                                        />
                                        WALLET
                                    </StyledLink>
                                ),
                                children: [
                                    {
                                        label: (
                                            <StyledLink
                                                to="/wallet/staking"
                                                reloadDocument={true}
                                            >
                                                STAKING
                                            </StyledLink>
                                        ),
                                        key: 'setting:3',
                                    },
                                    {
                                        label: (
                                            <StyledLink
                                                to="/wallet/governance"
                                                reloadDocument={true}
                                            >
                                                GOVERNANCE
                                            </StyledLink>
                                        ),
                                        key: 'setting:4',
                                    },
                                ],
                            },
                        ]}
                    />
                    <Search
                        style={{ width: 300 }}
                        placeholder="input address, validator address, tx, block height "
                        onSearch={onSearch}
                        status={error ? 'error' : ''}
                    />
                </ItemWrapper>
            </Header>
        </>
    )
}

export default Navbar
