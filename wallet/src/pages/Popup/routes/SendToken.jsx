import { Input, Select, Button, Space, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wallet from '../utils/wallet';
import * as storage from '../utils/storage';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import { API_URL } from '../constants';

const SendToken = () => {
  const navigate = useNavigate();
  const onClickCancel = () => navigate(-1);
  const {
    signerInfo: { address, chain, signer },
  } = useGetSignerInfo();

  const [form] = Form.useForm();
  const [gas, setGas] = useState(25000);

  const getFee = (type) => {
    const { gas } = wallet.utils.getFee(type);
    console.log(type, gas);
    setGas(gas);
  };

  const handleChange = (value) => {
    console.log(value, 'va');
    getFee(value);
  };

  const onFinish = async (values) => {
    try {
      const { mnemonic } = await storage.utils.getSessionStorageData(
        'mnemonic'
      );
      const signerClient = await wallet.utils.getSigningClient(API_URL, signer);
      const res = await wallet.utils.sendOsmosis(
        address,
        values.recipient,
        values.amount,
        gas,
        signerClient
      );
      message.success('전송 성공');
    } catch (err) {
      message.error({ content: err.message, style: { width: '70%' } });
    }
  };

  useEffect(() => {
    getFee('medium');
  }, []);

  return (
    <Form onFinish={onFinish} form={form}>
      {/* <Space direction="vertical" size="middle"> */}
      <Form.Item name="recipient">
        <Input size="large" placeholder="recipient" style={{ marginTop: 30 }} />
      </Form.Item>
      <Form.Item name="amount">
        <Input size="large" placeholder="amount" suffix="uosmo" />
      </Form.Item>
      <Form.Item name="gas">
        <Input
          disabled
          size="large"
          placeholder={`${gas}`}
          addonBefore={
            <Select defaultValue={'medium'} onChange={handleChange}>
              <Select.Option value="low">low</Select.Option>
              <Select.Option value="medium">mid</Select.Option>
              <Select.Option value="high">high</Select.Option>
            </Select>
          }
          style={{ marginBottom: 14 }}
        />
      </Form.Item>
      {/* </Space> */}
      <div>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            전송
          </Button>
          <Button size="large" className="cancel-btn" onClick={onClickCancel}>
            취소
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SendToken;
