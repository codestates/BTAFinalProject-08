import { useParams } from 'react-router-dom'

export default function BlockDetails() {
    const { blockid } = useParams()
    console.log(blockid)
    return <div>helo</div>
}
