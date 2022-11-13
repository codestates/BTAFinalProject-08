import React, { useState } from 'react'
import styled from 'styled-components'
import BlocksTable from '../components/BlockCompo/BlockTable'
import TransTable from '../components/BlockCompo/TransactionTable'
import { buttonColor, cardShadow } from '../utils/color'

const Wrapper = styled.div`
    max-width: 1200px;
    min-width: 600px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`

const BlockContent = styled.div`
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: ${cardShadow};
`

export const Title = styled.div`
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

const Blocks = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <Wrapper>
            <Title>BLOCKS</Title>
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
                {!toggle ? <BlocksTable /> : <TransTable />}
            </BlockContent>
        </Wrapper>
    )
}

export default Blocks
