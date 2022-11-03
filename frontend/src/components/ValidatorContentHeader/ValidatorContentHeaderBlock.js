import styled from 'styled-components'
import { blockText, defaultText } from '../../utils/color'
import { Icon } from '@iconify/react'

const ContentHeaderinfoBlock = styled.div`
    width: 22%;
    height: 80%;
    font-size: 13px;
    font-weight: 500;
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
    font-weight: 500;
`

export default function ValidatorContentHeaderBlock({
    headername,
    icon,
    data,
}) {
    return (
        <ContentHeaderinfoBlock>
            <ContentHeaderinfoBlockHeader>
                {icon}
                {headername}
            </ContentHeaderinfoBlockHeader>
            <ContentHeaderinfoBlockBody>{data}</ContentHeaderinfoBlockBody>
        </ContentHeaderinfoBlock>
    )
}
