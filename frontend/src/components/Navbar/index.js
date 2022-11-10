import React from 'react'
import { Layout, Menu, Input } from 'antd'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

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
                        style={{ width: 600 }}
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
                                key: 'Wallet',
                                label: (
                                    <StyledLink to="/wallet">
                                        <Icon
                                            icon="fluent:wallet-32-regular"
                                            style={{ marginRight: '5px' }}
                                        />
                                        Wallet
                                    </StyledLink>
                                ),
                                children: [
                                    {
                                        label: (
                                            <StyledLink to="/wallet/staking">
                                                Staking
                                            </StyledLink>
                                        ),
                                        key: 'setting:3',
                                    },
                                    {
                                        label: (
                                            <StyledLink to="/wallet/governance">
                                                Governance
                                            </StyledLink>
                                        ),
                                        key: 'setting:4',
                                    },
                                ],
                            },
                        ]}
                    />
                    <Search style={{ width: 300 }} />
                </ItemWrapper>
            </Header>
        </>
    )
}

export default Navbar
