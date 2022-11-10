import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getAllValidator } from '../api/blockchain'
import ValidatorContentHeader from '../components/ValidatorContentHeader'
import ValidatorTable from '../components/ValidatorTable'
import { cardBorderRadius, refetchTime } from '../utils/size'
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
`

const ContentBodyWrapTable = styled.div`
    background-color: #ffffff;
    padding: 10px;
    border-radius: ${cardBorderRadius};

    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    width: 100%;
`

const Validators = () => {
    const { isLoading, data } = useQuery(['validators'], getAllValidator, {
        refetchInterval: refetchTime,
    })
    //console.log(data)

    return (
        <Wrapper>
            {data && (
                <ValidatorContentHeader
                    height={data.height}
                    blockTime={data.blockTime}
                    totalVal={data.totalValidatorNum}
                    bondedTokens={10}
                />
            )}
            <ContentBody>
                <ContentBodyWrapTable>
                    <ValidatorTable
                        valArray={!data ? '' : data.validators}
                        loading={isLoading}
                    />
                </ContentBodyWrapTable>
            </ContentBody>
        </Wrapper>
    )
}

export default Validators
