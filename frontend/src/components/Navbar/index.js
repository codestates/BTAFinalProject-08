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

const Navbar = () => {
    return (
        <>
            <Header
                style={{
                    backgroundColor: '#390368',
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* <div>Logo</div> */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ width: 400 }}
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
                    ]}
                />
                <Search style={{ width: 300 }} />
            </Header>
        </>
    )
}

export default Navbar
