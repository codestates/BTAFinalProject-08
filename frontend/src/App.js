import './App.less'
import { Layout } from 'antd'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Validators from './pages/Validators'
import Blocks from './pages/Blocks'
import { Content } from 'antd/lib/layout/layout'
import ValidatorDetails from './pages/ValidatorDetails'
import BlockDetails from './pages/BlockDetails'
import TransactionDetail from './pages/TransactionDetails'
import AddressDetails from './pages/AddressDetails'
import Faucet from './pages/Faucet'
import Wallet from './pages/Wallet'
import Governance from './pages/Governance'

function App() {
    return (
        <Layout style={{ width: '100%', height: '100%' }}>
            <Navbar />
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 84,
                    padding: '0 50px',
                }}
            >
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="validators" element={<Validators />} />
                    <Route
                        path="validators/:valaddress"
                        element={<ValidatorDetails />}
                    />
                    <Route path="blocks" element={<Blocks />} />
                    <Route path="blocks/:blockid" element={<BlockDetails />} />
                    <Route
                        path="/txs/:transactionid"
                        element={<TransactionDetail />}
                    />
                    <Route
                        path="/account/:addressid"
                        element={<AddressDetails />}
                    />
                    <Route path="faucet" element={<Faucet />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/wallet/:type" element={<Wallet />} />
                </Routes>
            </Content>
        </Layout>
    )
}

export default App
