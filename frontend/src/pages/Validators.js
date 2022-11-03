import React from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Table } from 'antd'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContentHeader = styled.div`
    width: 90%;
    height: 250px;
    background-color: red;
    padding: 20px;
`
const ContentHeaderText = styled.div`
    font-size: 28px;
    height: 20%;
    width: 100%;
    background-color: blue;
`
const ContnetHeaderBlockWrapper = styled.div`
    width: 100%;
    height: 80%;
    background-color: yellow;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const ContentHeaderinfoBlock = styled.div`
    width: 20%;
    height: 80%;
    background-color: purple;
    border-radius: 10px;
`
const ContentBody = styled.div`
    width: 90%;
    margin-top: 10px;
    padding: 20px;
    background-color: gray;
`

const ContentBodyHeader = styled.div`
    height: 50px;
    width: 100%;
    background-color: red;
`

const ContentBodyWrapTable = styled.div`
    background-color: blue;
    width: 100%;
`
const columns = [
    {
        title: 'Validator',
        dataIndex: 'validator',
    },
    {
        title: 'Voting Power',
        dataIndex: 'voting_power',
        sorter: {
            compare: (a, b) => a.voting_power - b.voting_power,
        },
        mutiple: 3,
    },
    {
        sorter: {
            compare: (a, b) => a.participation - b.participation,
        },
        mutiple: 2,
    },
]

const data = [
    {
        key: '1',
        validator: 'Cosmostation',
        voting_power: '22222',
        participation: '270',
        uptime: '80',
        commission: '5%',
    },
    {
        key: '2',
        validator: 'Cosmostation2',
        voting_power: '22222',
        participation: '270',
        uptime: '80',
        commission: '5%',
    },
    {
        key: '1',
        validator: 'Cosmostation2',
        voting_power: '22222',
        participation: '270',
        uptime: '80',
        commission: '5%',
    },
]

const Validators = () => {
    return (
        <Wrapper>
            <ContentHeader>
                <ContentHeaderText>VALIDATORS</ContentHeaderText>
                <ContnetHeaderBlockWrapper>
                    <ContentHeaderinfoBlock></ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock></ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock></ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock></ContentHeaderinfoBlock>
                </ContnetHeaderBlockWrapper>
            </ContentHeader>
            <ContentBody>
                <ContentBodyHeader>header</ContentBodyHeader>
                <ContentBodyWrapTable>
                    <Table />
                </ContentBodyWrapTable>
            </ContentBody>
        </Wrapper>
    )
}

export default Validators
