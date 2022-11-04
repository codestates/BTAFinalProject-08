import { Table } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { buttonColor } from '../utils/color'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    padding: 20px;
`

const Header = styled.div`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
`
const HeaderWrapButton = styled.div`
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 3px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
`
const HeaderBtn = styled.div`
    width: 49%;
    border-radius: 10px;
    background-color: ${(props) => (props.off ? '#f5f5f5' : `${buttonColor}`)};
    color: ${(props) => (props.off ? `${buttonColor}` : `#f5f5f5`)};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const columnsBlock = [
    {
        title: 'Height',
    },
    {
        title: 'Block Hash',
    },
    {
        title: 'Proposer',
    },
    {
        title: 'Txs',
    },
    {
        title: 'Time',
    },
]
const columnsTransaction = [
    {
        title: 'Tx Hash',
    },
    {
        title: 'Type',
    },
    {
        title: 'Result',
    },
    {
        title: 'Amount',
    },
    {
        title: 'Fee',
    },
    {
        title: 'Height',
    },
    {
        title: 'Time',
    },
]

const Blocks = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <Wrapper>
            <Header>
                <HeaderWrapButton>
                    <HeaderBtn off={toggle} onClick={() => setToggle(false)}>
                        Blocks
                    </HeaderBtn>
                    <HeaderBtn off={!toggle} onClick={() => setToggle(true)}>
                        Transactions
                    </HeaderBtn>
                </HeaderWrapButton>
            </Header>
            {!toggle ? (
                <Table columns={columnsBlock} />
            ) : (
                <Table columns={columnsTransaction} />
            )}
        </Wrapper>
    )
}

export default Blocks
