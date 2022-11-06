import { Table } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buttonColor, cardShadow } from '../utils/color'

const Wrapper = styled.div`
    max-width: 1200px;
    min-width: 600px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    //padding: 20px;
`

const BlockContent = styled.div`
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: ${cardShadow};
`

const Header = styled.div`
    width: 100%;
    height: 40px;
    font-size: 28px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
`

const BlockHeader = styled.div`
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
        dataIndex: 'height',
        render: (txt) => <Link to={`/blocks/${txt}`}>{txt}</Link>,
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
        dataIndex: 'txHash',
        render: (txt) => (
            <Link to={`/txs/${txt}`}>
                {txt.slice(0, 6) + '...' + txt.slice(-7, -1)}
            </Link>
        ),
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
const data = [
    {
        height: 1,
    },
]
const data2 = [
    {
        txHash:
            '514B7D7C064C04403DDC45612519DC19D17BB5F2074406FD499DBD9B240F12D7',
    },
]

const Blocks = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <Wrapper>
            <Header>BLOCKS</Header>
            <BlockContent>
                <BlockHeader>
                    <HeaderWrapButton>
                        <HeaderBtn
                            off={toggle}
                            onClick={() => setToggle(false)}
                        >
                            Blocks
                        </HeaderBtn>
                        <HeaderBtn
                            off={!toggle}
                            onClick={() => setToggle(true)}
                        >
                            Transactions
                        </HeaderBtn>
                    </HeaderWrapButton>
                </BlockHeader>
                {!toggle ? (
                    <Table columns={columnsBlock} dataSource={data} />
                ) : (
                    <Table columns={columnsTransaction} dataSource={data2} />
                )}
            </BlockContent>
        </Wrapper>
    )
}

export default Blocks
