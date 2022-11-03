import './App.less'
import { Layout } from 'antd'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Validators from './pages/Validators'
import Blocks from './pages/Blocks'
import { Content } from 'antd/lib/layout/layout'

function App() {
    //const { isLoading, isError, data, error } = useQuery(['notes'], fetchNotes)
    /*
  const { data } = useQuery(
    [key],
    // Use whatever timeout you need
    () => axios.get(url, { timeout: 5000 }),
  );
  */
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
                    <Route path="blocks" element={<Blocks />} />
                </Routes>
            </Content>
        </Layout>
    )
}

export default App
