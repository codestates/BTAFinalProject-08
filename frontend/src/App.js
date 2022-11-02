import "./App.less";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Validators from "./pages/Validators";
import Blocks from "./pages/Blocks";
import { Content } from "antd/lib/layout/layout";

function App() {
  return (
    <Layout>
      <Navbar />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 84,
          padding: "0 50px",
        }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="validators" element={<Validators />} />
          <Route path="blocks" element={<Blocks />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
