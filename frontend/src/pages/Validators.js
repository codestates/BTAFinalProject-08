import React, { useState } from 'react'
import styled from 'styled-components'
//import 'antd/dist/antd.css'
import { Input, Switch, Table } from 'antd'
import { blockText, defaultText, headerText } from '../utils/color'
import { IoPeople } from 'react-icons/io5'
import { GiToken } from 'react-icons/gi'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { Icon } from '@iconify/react'

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
    height: 220px;
    padding: 20px;
`
const ContentHeaderText = styled.div`
    font-size: 28px;
    height: 20%;
    width: 100%;
    color: ${headerText};
`
const ContnetHeaderBlockWrapper = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const ContentHeaderinfoBlock = styled.div`
    width: 22%;
    height: 80%;
    font-size: 13px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 10px;
    padding: 12px;
`

const ContentHeaderinfoBlockHeader = styled.div`
    height: 30%;
    display: flex;
    align-items: center;
    color: ${blockText};
`

const ContentHeaderinfoBlockBody = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 18px;
    color: ${defaultText};
`

const ContentBody = styled.div`
    width: 90%;
    margin-top: 10px;
    padding: 20px;
`

const ContentBodyHeader = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const ContentBodyHeaderWrapinput = styled.div`
    width: 10%;
    display: flex;
    justify-content: flex-end;
`

const ContentBodyWrapTable = styled.div`
    width: 100%;
`
const columns = [
    {
        title: 'Validator',
        dataIndex: 'validator',

        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => console.log(value),
        //onFilter: (value, record) => record.name.startsWith(value),
    },
    {
        title: 'Voting Power',
        dataIndex: 'votingPower',
        sorter: {
            compare: (a, b) => a.votingPower - b.votingPower,
        },
        mutiple: 4,
    },
    {
        title: 'Participation',
        dataIndex: 'participation',
        sorter: {
            compare: (a, b) => a.participation - b.participation,
        },
        mutiple: 3,
    },
    {
        title: 'Uptime',
        dataIndex: 'uptime',
        sorter: {
            compare: (a, b) => a.update - b.uptime,
        },
        mutiple: 2,
    },
    {
        title: 'Commission',
        dataIndex: 'commission',
        sorter: {
            compare: (a, b) =>
                a.commission.slice(0, -1) - b.commission.slice(0, -1),
        },
        mutiple: 1,
    },
]

const data = [
    {
        key: '1',
        validator: 'Cosmostation',
        votingPower: '22222',
        participation: '270',
        uptime: '80',
        commission: '5%',
    },
    {
        key: '2',
        validator: 'Cosmostation2',
        votingPower: '22224',
        participation: '270',
        uptime: '80',
        commission: '6%',
    },
    {
        key: '3',
        validator: 'Cosmostation3',
        votingPower: '22223',
        participation: '270',
        uptime: '80',
        commission: '8%',
    },
]

const Validators = () => {
    const [checkStrictly, setCheckStrictly] = useState(true)

    return (
        <Wrapper>
            <ContentHeader>
                <ContentHeaderText>VALIDATORS</ContentHeaderText>
                <ContnetHeaderBlockWrapper>
                    <ContentHeaderinfoBlock>
                        <ContentHeaderinfoBlockHeader>
                            <Icon
                                icon="clarity:blocks-group-solid"
                                width="22"
                                style={{ marginRight: 5 }}
                            />
                            Height
                        </ContentHeaderinfoBlockHeader>
                        <ContentHeaderinfoBlockBody>
                            1
                        </ContentHeaderinfoBlockBody>
                    </ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock>
                        <ContentHeaderinfoBlockHeader>
                            <IoPeople size={22} style={{ marginRight: 5 }} />
                            Validators
                        </ContentHeaderinfoBlockHeader>
                        <ContentHeaderinfoBlockBody>
                            2
                        </ContentHeaderinfoBlockBody>
                    </ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock>
                        <ContentHeaderinfoBlockHeader>
                            <GiToken size={22} style={{ marginRight: 5 }} />
                            Bonded Tokens
                        </ContentHeaderinfoBlockHeader>
                        <ContentHeaderinfoBlockBody>
                            3
                        </ContentHeaderinfoBlockBody>
                    </ContentHeaderinfoBlock>
                    <ContentHeaderinfoBlock>
                        <ContentHeaderinfoBlockHeader>
                            <AiOutlineFieldTime
                                size={22}
                                style={{ marginRight: 5 }}
                            />
                            Block Time
                        </ContentHeaderinfoBlockHeader>
                        <ContentHeaderinfoBlockBody>
                            100
                        </ContentHeaderinfoBlockBody>
                    </ContentHeaderinfoBlock>
                </ContnetHeaderBlockWrapper>
            </ContentHeader>
            <ContentBody>
                <ContentBodyHeader>
                    <Input
                        style={{ width: 300, marginRight: 10 }}
                        placeholder="search validator"
                    />
                    <ContentBodyHeaderWrapinput>
                        <Switch
                            checked={checkStrictly}
                            onChange={setCheckStrictly}
                            checkedChildren="inactive"
                            unCheckedChildren="unactive"
                        />
                    </ContentBodyHeaderWrapinput>
                </ContentBodyHeader>
                <ContentBodyWrapTable>
                    <Table columns={columns} dataSource={data} />
                </ContentBodyWrapTable>
            </ContentBody>
        </Wrapper>
    )
}

export default Validators
