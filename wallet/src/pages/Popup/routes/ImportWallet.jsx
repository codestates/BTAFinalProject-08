import { Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wallet from '../utils/wallet';

const ImportWallet = () => {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState(null);
  const [pw, setPw] = useState('');

  const onClickCancel = () => navigate(-1);
  const onClickImport = async (mnemonic) => {
    try {
      const auth = await wallet.utils.aes256Encrypt(mnemonic, pw);
      chrome.storage.session.set({ mnemonic });
      chrome.storage.sync.set({ auth });
      navigate('/popup.html');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Card title="계정 가져오기" style={{ height: '100%' }}>
      <Input.TextArea
        rows={5}
        placeholder="지갑 구문을 입력해주세요."
        onChange={(e) => setMnemonic(e.target.value)}
        style={{ marginBottom: 14 }}
      />
      <Input
        size="large"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        style={{ marginBottom: 14 }}
        onChange={(e) => setPw(e.target.value)}
      />
      <Button
        type="primary"
        size="large"
        onClick={() => onClickImport(mnemonic)}
      >
        가져오기
      </Button>
      <Button size="large" className="cancel-btn" onClick={onClickCancel}>
        취소
      </Button>
    </Card>
  );
};

export default ImportWallet;
