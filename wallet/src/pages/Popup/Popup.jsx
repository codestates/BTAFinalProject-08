import React from 'react';
import './Popup.less';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';
import CreateWallet from './routes/CreateWallet';
import { Layout } from 'antd';
import MyPage from './routes/MyPage';
import logo from '../../assets/img/logo_transparent.png';
import SignIn from './routes/SignIn';
import ImportWallet from './routes/ImportWallet';
import { useCallback } from 'react';
import SendToken from './routes/SendToken';
import useAuth from './hooks/useAuth';

const Popup = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const userState = useAuth();
  const { mnemonic, auth } = userState;

  const handleRouteMain = useCallback(() => {
    if (mnemonic) {
      navigate('/popup.html');
    } else if (auth) {
      navigate('/sign-in');
    }
  }, [navigate, mnemonic, auth]);

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
        </div>
      </Header>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/popup.html" element={<MyPage />} />
        </Route>
        <Route path="/send-token" element={<SendToken />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/import" element={<ImportWallet />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default Popup;
