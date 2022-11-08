import styled from 'styled-components'

const DivMsgRoot = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
`
const DivMsgHeader = styled.div`
    font-weight: 500;
    width: 20%;
`
const DivMsgContent = styled.div`
    width: 80%;
`
export default function DivMsg({ header, body }) {
    return (
        <DivMsgRoot>
            <DivMsgHeader>{header}</DivMsgHeader>
            <DivMsgContent>{body}</DivMsgContent>
        </DivMsgRoot>
    )
}
