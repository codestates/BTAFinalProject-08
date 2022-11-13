import { Button, Form, Input, Layout, message } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { postFaucet } from '../api/blockchain'
import { Title } from './Blocks'

const Faucet = () => {
    const [isLoading, setIsLoading] = useState(false)
    const onFinish = async (values) => {
        setIsLoading(true)
        try {
            const { address } = values
            await postFaucet(address)
            setIsLoading(false)
        } catch (err) {
            message.error(err.message)
            setIsLoading(false)
        }
    }

    return (
        <Layout className="sub-layout">
            <Title>Faucet</Title>
            <Content
                className="sub-content"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Form
                    style={{
                        width: 500,
                        border: '1px solid black',
                        borderRadius: 4,
                        padding: '80px 30px 80px 30px',
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="address">
                        <Input size="large" placeholder="Address"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            size="large"
                            placeholder="1"
                            suffix="osmo"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item style={{ marginTop: 70 }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            GET 1 Osmo
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    )
}

export default Faucet
