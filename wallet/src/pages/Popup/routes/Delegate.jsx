import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { Button, Form, Input } from 'antd';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import BalanceInput from '../components/BalanceInput';
import { FIXED_FEE } from '../constants';

const Delegate = () => {
  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();

  const navigate = useNavigate();
  const { operatorAddress } = useParams();

  const onFinish = async (values) => {
    const { amount } = values;
    const tx = await signingClient.delegateTokens(
      address,
      operatorAddress,
      {
        denom: 'uosmo',
        amount,
      },
      FIXED_FEE
    );
    console.log(tx);
  };

  return (
    <Form onFinish={onFinish} style={{ padding: '10px' }}>
      <Form.Item name="chain" label="Blockchain">
        <Input placeholder={'osmosis'} disabled={true} size="large"></Input>
      </Form.Item>
      <Form.Item name="balance" label="Balance">
        <BalanceInput address={address} />
      </Form.Item>
      <Form.Item name="amount" label="Amount">
        <Input suffix="uosmo" size="large" />
      </Form.Item>
      <Form.Item name="operator" label="Operator address">
        <Input
          disabled={true}
          placeholder={operatorAddress}
          style={{ fontSize: '12px' }}
          size="large"
        />
      </Form.Item>
      <Button id="gege" type="primary" size="large" htmlType="submit">
        위임
      </Button>
      <Button className="cancel-btn" size="large" onClick={() => navigate(-1)}>
        취소
      </Button>
    </Form>
  );
};

export default Delegate;
