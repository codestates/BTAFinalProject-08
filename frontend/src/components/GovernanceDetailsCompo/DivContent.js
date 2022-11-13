import styled from 'styled-components'

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 5px;
`
const ContentHeader = styled.div`
    width: 20%;
    font-weight: 500;
    font-size: 16px;
`
const ContetnBody = styled.div`
    width: 80%;
    font-size: 16px;
`

export default function DivContent({ header, content }) {
    return (
        <ContentWrapper>
            <ContentHeader>{header}</ContentHeader>
            <ContetnBody>{content}</ContetnBody>
        </ContentWrapper>
    )
}
