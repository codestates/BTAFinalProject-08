import { Button, Form, Input, Table } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

export default function Governance() {
    // NOTE blockchain, balance, type, inital deposit(coin, demom), title, description
    const onFinish = (values) => {
        console.log(values)
    }
    return (
        <Form onFinish={onFinish}>
            <Form.Item name={['form', 'chain']}>
                <div>Blockchain</div>
                <Input value={'osmosis'} disabled={true}></Input>
            </Form.Item>
            <Form.Item name={['form', 'balance']}>
                <div>Balance</div>
                <div style={{ display: 'flex' }}>
                    <Input disabled={true} value={'10'} suffix="uosmo" />
                    <Button loading>reload</Button>
                </div>
            </Form.Item>
            <Form.Item name={['form', 'deposit']}>
                <div>Inital deposit</div>
                <Input suffix="uosmo"></Input>
            </Form.Item>
            <Form.Item name={['form', 'amount']}>
                <div>Title</div>
                <Input></Input>
            </Form.Item>
            <Form.Item name={['form', 'validator']}>
                <div>Description</div>
                <TextArea maxLength={100} style={{ height: 120 }} />
            </Form.Item>
            <Button>Confirm</Button>
        </Form>
    )
}
