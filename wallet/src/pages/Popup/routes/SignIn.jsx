import { Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/icon-128.png';
import * as storage from '../utils/storage';
import * as wallet from '../utils/wallet';

const SignIn = () => {
  const navigate = useNavigate();
  const [pw, setPw] = useState(null);

  const onClickSignIn = async () => {
    try {
      const { auth } = await storage.utils.getSyncStorageData('auth');
      const mnemonic = await wallet.utils.aes256Decrypt(auth, pw);
      if (mnemonic !== '') {
        chrome.storage.session.set({ mnemonic });
        navigate('/popup.html');
      } else {
        message.error('패스워드가 틀립니다.');
      }
    } catch (err) {
      message.error('패스워드가 틀립니다.');
    }
  };

  return (
    <Card
      cover={
        <img
          src={logo}
          alt="main_logo"
          style={{ width: 180, height: 180, textAlign: 'center' }}
        />
      }
      style={{
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Input.Password
        placeholder="비밀번호"
        size="large"
        style={{ marginBottom: 14 }}
        onChange={({ target: { value } }) => setPw(value)}
      />
      <div style={{ marginBottom: 14 }}>
        <Button type="primary" size="large" onClick={onClickSignIn}>
          로그인
        </Button>
      </div>
      <Link to="/import">비밀번호를 잊으셨습니까?</Link>
    </Card>
  );
};

export default SignIn;
