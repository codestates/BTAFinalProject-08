import styled from 'styled-components'

const ContentHeaderDivRoot = styled.div`
    height: 8%;
    width: 100%;
    display: flex;
`
const ContentHeaderDivHeader = styled.div`
    width: 20%;
    height: 100%;
    font-weight: 500;
`
const ContentHeaderDivBody = styled.div`
    width: 80%;
    height: 100%;
`
export default function ContentHeaderDiv({ header, content }) {
    return (
        <ContentHeaderDivRoot>
            <ContentHeaderDivHeader>{header}</ContentHeaderDivHeader>
            <ContentHeaderDivBody>{content}</ContentHeaderDivBody>
        </ContentHeaderDivRoot>
    )
}
