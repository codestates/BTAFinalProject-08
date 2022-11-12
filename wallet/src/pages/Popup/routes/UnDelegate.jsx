import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
//import * as wallet from '../utils/wallet';
//import { API_URL } from '../constants';
//import assert from 'assert';

const UnDelegate = () => {
  const { operatorAddress } = useParams();
  const [assets, setAssets] = useState([]);
  const [assetLoading, setAssetLoading] = useState(false);
  const {
    signerInfo: { address, signer },
  } = useGetSignerInfo();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish} style={{ padding: '10px' }}>
      <Form.Item name={['form', 'chain']}>
        <div style={{ display: 'flex' }}>Blockchain</div>
        <Input value={'osmosis'} disabled={true}></Input>
      </Form.Item>
      <Form.Item name={['form', 'staking balance']}>
        <div style={{ display: 'flex' }}> Balance</div>
        <div style={{ display: 'flex' }}>
          <Input disabled={true} value={assets[0]} suffix="uosmo" />
          <Button loading={assetLoading}>reload</Button>
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
export default UnDelegate;
