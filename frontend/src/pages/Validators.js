import React, { useEffect } from 'react'
import styled from 'styled-components'
import ValidatorContentHeader from '../components/ValidatorContentHeader'
import ValidatorTable from '../components/ValidatorTable'
import { useQuery } from 'react-query'
import { getAllValidator } from '../api/validator'
import axios from 'axios'
//import axios from 'axios'

const Wrapper = styled.div`
    max-width: 1200px;
    min-width: 600px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentBody = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
`

const ContentBodyWrapTable = styled.div`
    background-color: #ffffff;
    padding: 10px;

    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    width: 100%;
`

const Validators = () => {
    const { data, isLoading } = useQuery('valida', async () => {
        const { data } = await axios.get(
            'http://34.155.184.217:1317/staking/validators'
        )
        return data
    })
    console.log(data)
    return (
        <Wrapper>
            <ValidatorContentHeader />
            <ContentBody>
                <ContentBodyWrapTable>
                    <ValidatorTable valArray={data} />
                </ContentBodyWrapTable>
            </ContentBody>
        </Wrapper>
    )
}

export default Validators
