import React from 'react'
import styled from 'styled-components'
import ValidatorContentHeader from '../components/ValidatorContentHeader'
import ValidatorTable from '../components/ValidatorTable'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContentBody = styled.div`
    width: 90%;
    padding: 0 20px 20px 20px;
`

const ContentBodyWrapTable = styled.div`
    width: 100%;
`

const Validators = () => {
    return (
        <Wrapper>
            <ValidatorContentHeader />
            <ContentBody>
                <ContentBodyWrapTable>
                    <ValidatorTable />
                </ContentBodyWrapTable>
            </ContentBody>
        </Wrapper>
    )
}

export default Validators
