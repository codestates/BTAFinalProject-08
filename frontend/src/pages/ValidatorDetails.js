import { useParams } from 'react-router-dom'

export default function ValidatorDetails() {
    const { valaddress } = useParams()

    console.log(valaddress, 'parame')
    return <div>helo</div>
}
