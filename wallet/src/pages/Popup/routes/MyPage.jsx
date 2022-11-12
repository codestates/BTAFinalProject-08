import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Statistic, Button, List, Avatar, Typography, Tag } from 'antd';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import * as wallet from '../utils/wallet';
import { API_URL } from '../constants';
import osmoLogo from '../../../assets/img/osmo-42.png';

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
  const [activeTabKey, setActiveTabKey] = useState('Token');
  const [assets, setAssets] = useState([]);
  const [txs, setTxs] = useState([]);
  const {
    signerInfo: { address, signer },
  } = useGetSignerInfo();

  useEffect(() => {
    const fetchBalances = async () => {
      const { balances } = await wallet.utils.getBalance(address, API_URL);
      setAssets(balances);
    };
    const fetchTxs = async () => {
      const signingClient = await wallet.utils.getSigningClient(
        API_URL,
        signer
      );
      const txs = await wallet.utils.getTx(address, signingClient);
      setTxs(txs);
    };

    fetchBalances();
    fetchTxs();
  }, [address, signer]);

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
        actions={[
          <Link to="/send-token">보내기</Link>,
          <Link to="/staking">스테이킹</Link>,
        ]}
      >
        <Statistic
          title="Account Balance"
          value={assets[0] && assets[0].amount}
        />
      </Card>
      <Card
        tabList={tabList}
        onTabChange={(key) => setActiveTabKey(key)}
        activeTabKey={activeTabKey}
      >
        {activeTabKey === 'Token' ? (
          <List
            dataSource={assets}
            itemLayout={'horizontal'}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  style={{ alignItems: 'center' }}
                  avatar={<Avatar src={osmoLogo} />}
                  title={item.denom}
                  description={item.amount}
                />
              </List.Item>
            )}
          />
        ) : (
          <List
            dataSource={txs}
            pagination={{ total: txs.length, pageSize: 5 }}
            renderItem={(item) => {
              const isReceived = item[0] === 'received';

              return (
                <List.Item>
                  <Tag color={isReceived ? 'green' : 'magenta'}>{item[0]}</Tag>
                  <span>
                    {isReceived ? '+' : '-'}
                    {item[1]}
                  </span>
                </List.Item>
              );
            }}
          >
            {console.log(txs, 'txs')}
          </List>
        )}
      </Card>
    </div>
  );
};

export default MyPage;
