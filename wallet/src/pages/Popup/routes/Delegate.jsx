import { useParams } from 'react-router-dom';
import React from 'react';

import { Button, Form, Input, Table } from 'antd';

const Delegate = () => {
  // NOTE blockchian, balance, amount, validator
  const { operatorAddress } = useParams();
  const onFinish = (values) => {
    console.log(values);
  };
  const getBalance = () => {};

  return (
    <Form onFinish={onFinish} style={{ padding: '10px' }}>
      <Form.Item name={['form', 'chain']}>
        <div style={{ display: 'flex' }}>Blockchain</div>
        <Input value={'osmosis'} disabled={true}></Input>
      </Form.Item>
      <Form.Item name={['form', 'balance']}>
        <div style={{ display: 'flex' }}> Balance</div>
        <div style={{ display: 'flex' }}>
          <Input disabled={true} value={'10'} suffix="uosmo" />
          <Button loading>reload</Button>
        </div>
      </Form.Item>
      <Form.Item name={['form', 'amount']}>
        <div style={{ display: 'flex' }}> Amount</div>
        <Input suffix="uosmo"></Input>
      </Form.Item>

      <Form.Item name={['form', 'operator']}>
        <div style={{ display: 'flex' }}>Operator address</div>
        <Input
          disabled={true}
          value={operatorAddress}
          style={{ fontSize: '12px' }}
        ></Input>
      </Form.Item>

      <Button id="gege">Confirm</Button>
    </Form>
  );
};

export default Delegate;
