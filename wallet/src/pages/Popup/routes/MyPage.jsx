import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Statistic, Button, List, Avatar, Typography } from 'antd';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
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

const { Paragraph } = Typography;

const MyPage = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const {
    signerInfo: { address },
  } = useGetSignerInfo();

  useEffect(() => {
    const fetchAddress = async () => {
      const { balances } = await wallet.utils.getBalance(address, API_URL);
      setAssets(balances);
    };
    fetchAddress();
  }, [address]);

  const onClickLogout = () => {
    chrome.storage.session.remove('mnemonic');
    navigate('/sign-in');
  };

  return (
    <div>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paragraph copyable={{ text: address }}>
              {address && address.substring(0, 15) + '....'}
            </Paragraph>
            <Button onClick={onClickLogout}>잠금</Button>
          </div>
        }
        actions={[<Link to="/send-token">보내기</Link>]}
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
