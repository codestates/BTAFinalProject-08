import React from 'react';
import './Popup.less';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import CreateWallet from './routes/CreateWallet';
import { Layout, Typography, Avatar } from 'antd';
import MyPage from './routes/MyPage';
import logo from '../../assets/img/logo_transparent.png';
import SignIn from './routes/SignIn';
import { useEffect } from 'react';
import { useState } from 'react';
import ImportWallet from './routes/ImportWallet';
import { useCallback } from 'react';

const Popup = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  const handleRouteMain = useCallback(() => {
    if (auth) {
      navigate('/my-page');
    } else {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  useEffect(() => {
    chrome.storage.sync.get('auth', (item) => {
      if (item) {
        // handleRouteMain();
        setAuth(item.auth);
      }
    });
  }, [handleRouteMain]);

  return (
    <div className="App">
      <Header style={{ padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ width: 75, height: 75, borderRadius: 4 }}
              onClick={handleRouteMain}
            />
          </div>
          {auth && <Avatar> </Avatar>}
        </div>
      </Header>
      <Routes>
        <Route path="/popup.html" element={<Home />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/import" element={<ImportWallet />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default Popup;
