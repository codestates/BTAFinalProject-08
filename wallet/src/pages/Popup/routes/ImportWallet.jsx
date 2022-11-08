import { Button, Card, Input } from 'antd';
import React from 'react';

const ImportWallet = () => {
  return (
    <Card title="계정 가져오기" style={{ height: '100%' }}>
      <Input.TextArea
        rows={5}
        placeholder="지갑 구문을 입력해주세요."
        style={{ marginBottom: 14 }}
      />
      <Button type="primary" size="large">
        가져오기
      </Button>
      <Button size="large" className="cancel-btn">
        취소
      </Button>
    </Card>
  );
};

export default ImportWallet;
