import { Button, Form, Input, Table } from 'antd'

export default function Staking() {
    // NOTE blockchian, balance, amount, validator
    const onFinish = (values) => {
        console.log(values)
    }
    const test = () => {
        console.log(window.test)
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
            <Form.Item name={['form', 'amount']}>
                <div>Amount</div>
                <Input suffix="uosmo"></Input>
            </Form.Item>
            <Form.Item name={['form', 'validator']}>
                <div>Validator</div>
                <Table />
            </Form.Item>
            <Button onClick={() => test()}>Confirm</Button>
        </Form>
    )
}
