import { Input, Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wallet from '../utils/wallet';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import BalanceInput from '../components/BalanceInput';

const CreateProposal = () => {
  const navigate = useNavigate();
  const onClickCancel = () => navigate(-1);
  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    const { title, description, amount } = values;
    setIsLoading(true);
    try {
      const res = wallet.utils.govSubmitProposal({
        address,
        signingClient,
        title,
        description,
        amount,
      });
      console.log(res);
      message.success('전송 성공');
      setIsLoading(false);
      navigate(-1);
    } catch (err) {
      message.error({ content: err.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item style={{ marginTop: 30 }}>
        <BalanceInput address={address} />
      </Form.Item>
      <Form.Item name="amount">
        <Input size="large" placeholder="amount" suffix="uosmo" />
      </Form.Item>
      <Form.Item name="title">
        <Input size="large" placeholder="title" />
      </Form.Item>
      <Form.Item name="description">
        <Input
          size="large"
          placeholder="description"
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

export default CreateProposal;
