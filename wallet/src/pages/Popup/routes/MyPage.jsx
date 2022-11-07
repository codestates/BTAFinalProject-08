import React, { useEffect, useState } from 'react';
import { Card, Statistic, Button, List, Avatar } from 'antd';
import { getAddress } from '../hooks/getAddress';
import * as wallet from '../utils/wallet';
import { API_URL } from '../constants';

const tabList = [
  {
    key: 'Token',
    tab: 'Token',
  },
  {
    key: 'History',
    tab: 'History',
  },
];

const MyPage = () => {
  const [address, setAddress] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
      const { balances } = await wallet.utils.getBalance(address, API_URL);
      setAssets(balances);
    };
    fetchAddress();
  }, []);

  const onClickLogout = () => {
    // chrome.storage.sync.remove('auth');
    // chrome.storage.sync.get(null, (item) => {
    //   console.log(item);
    // });
  };

  return (
    <div>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{address}</span>
            <Button onClick={onClickLogout}>잠금</Button>
          </div>
        }
      >
        <Statistic
          title="Account Balance"
          value={assets[0] && assets[0].amount}
        />
      </Card>
      <Card tabList={tabList}>
        <List
          dataSource={assets}
          itemLayout={'horizontal'}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={<Avatar src="../../../assets/img/icon-34.png"></Avatar>}
                title={item.denom}
                description={item.amount}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default MyPage;
