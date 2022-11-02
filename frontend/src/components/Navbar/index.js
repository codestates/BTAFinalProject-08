import React from "react";
import { Layout, Menu, Input } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

const Navbar = () => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <div>Logo</div> */}
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ width: 500 }}
        items={[
          { key: "DASHBOARD", label: <Link to="/">DASHBOARD</Link> },
          {
            key: "VALIDATORS",
            label: <Link to="/validators">VALIDATORS</Link>,
          },
          { key: "BLOCKS", label: <Link to="/blocks">BLOCKS</Link> },
        ]}
      />
      <Search style={{ width: 300 }} />
    </Header>
  );
};

export default Navbar;