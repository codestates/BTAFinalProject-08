import { Button, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/img/icon-128.png';

const SignIn = () => {
  const [pw, setPw] = useState(null);

  useEffect(() => {}, []);

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
      <Button type="primary" size="large">
        로그인
      </Button>
    </Card>
  );
};

export default SignIn;
