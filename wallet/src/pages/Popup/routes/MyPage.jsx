import React, { useEffect } from 'react';
import { Card, Statistic, Button } from 'antd';

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
  useEffect(() => {
    chrome.storage.sync.get(null, (item) => {
      console.log(item);
    });
  }, []);

  const onClickLogout = () => {
    chrome.storage.sync.remove('auth');
    chrome.storage.sync.get(null, (item) => {
      console.log(item);
    });
  };

  return (
    <div>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>'adfasodjfio308njvx'</span>
            <Button onClick={onClickLogout}>잠금</Button>
          </div>
        }
      >
        <Statistic title="Account Balance" value={112893} />
      </Card>
      <Card tabList={tabList}></Card>
    </div>
  );
};

export default MyPage;
