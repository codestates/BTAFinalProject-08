import React from 'react';
import './Popup.less';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';
import CreateWallet from './routes/CreateWallet';
import { Layout } from 'antd';
import MyPage from './routes/MyPage';
import logo from '../../assets/img/icon-transparent.png';
import SignIn from './routes/SignIn';
import ImportWallet from './routes/ImportWallet';
import { useCallback } from 'react';
import SendToken from './routes/SendToken';
import useAuth from './hooks/useAuth';
import Staking from './routes/Staking';
import Delegate from './routes/Delegate';
import UnDelegate from './routes/UnDelegate';
import Voting from './routes/Voting';
import ProposalDetail from './routes/ProposalDetail';
import CreateProposal from './routes/CreateProposal';

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
      <Header style={{ padding: '0 20px', backgroundColor: '#73e0d1' }}>
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
              style={{
                width: 100,
                height: 100,
                borderRadius: 4,
                position: 'fixed',
                top: -17,
              }}
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
        <Route path="/staking" element={<Staking />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/proposal/:id" element={<ProposalDetail />} />
        <Route path="/proposal/new" element={<CreateProposal />} />
        <Route
          path="/staking/delegate/:operatorAddress"
          element={<Delegate />}
        />
        <Route
          path="/staking/undelegate/:operatorAddress"
          element={<UnDelegate />}
        />
      </Routes>
    </div>
  );
};

export default Popup;
