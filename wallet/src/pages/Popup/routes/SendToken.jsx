import { Input, Select, Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wallet from '../utils/wallet';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import { API_URL } from '../constants';
import BalanceInput from '../components/BalanceInput';

const SendToken = () => {
  const navigate = useNavigate();
  const onClickCancel = () => navigate(-1);
  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [gas, setGas] = useState(25000);

  const getFee = (type) => {
    const { gas } = wallet.utils.getFee(type);
    console.log(type, gas);
    setGas(gas);
  };

  const handleChange = (value) => {
    getFee(value);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await wallet.utils.sendOsmosis(
        address,
        values.recipient,
        values.amount,
        gas,
        signingClient
      );
      message.success('전송 성공');
      setIsLoading(false);
      navigate(-1);
    } catch (err) {
      message.error({ content: err.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFee('medium');
  }, []);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item style={{ marginTop: 30 }}>
        <BalanceInput address={address} />
      </Form.Item>
      <Form.Item name="recipient">
        <Input size="large" placeholder="recipient" />
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
      <div>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
          >
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
