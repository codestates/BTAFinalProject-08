import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import { FIXED_FEE } from '../constants';

const UnDelegate = () => {
  const navigate = useNavigate();
  const { operatorAddress } = useParams();
  const [stakingAmount, setStakingAmount] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const { amount } = values;
      const res = await signingClient.undelegateTokens(
        address,
        operatorAddress,
        { denom: 'uosmo', amount },
        FIXED_FEE
      );
      console.log(res, 'res');
      setIsLoading(false);
      message.success('회수 완료');
      navigate('/popup.html');
    } catch (e) {
      message.error('회수 실패');
    }
  };

  useEffect(() => {
    if (signingClient && address) {
      const getStakingAmount = async () => {
        const res = await signingClient.getDelegation(address, operatorAddress);
        if (!res) setIsDisabled(true);
        else setStakingAmount(res.amount);
      };
      getStakingAmount();
    }
  }, [operatorAddress, signingClient, address]);

  return (
    <Form onFinish={onFinish} style={{ padding: '10px' }}>
      <Form.Item name="chain" label="Blockchain">
        <Input placeholder={'osmosis'} disabled={true} size="large"></Input>
      </Form.Item>
      <Form.Item name="staking" label="Staking">
        <Input
          size="large"
          disabled
          placeholder={isDisabled ? 0 : stakingAmount}
        />
      </Form.Item>
      <Form.Item name="amount" label="Amount">
        <Input suffix="uosmo" size="large" disabled={isDisabled} />
      </Form.Item>
      <Form.Item name="operator" label="Operator address">
        <Input
          disabled={true}
          placeholder={operatorAddress}
          style={{ fontSize: '12px' }}
          size="large"
        />
      </Form.Item>
      <Button
        id="gege"
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isDisabled}
        loading={isLoading}
      >
        회수
      </Button>
      <Button className="cancel-btn" size="large" onClick={() => navigate(-1)}>
        취소
      </Button>
    </Form>
  );
};
export default UnDelegate;
