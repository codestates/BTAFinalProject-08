import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Button>
        <Link to="/create">Create Wallet</Link>
      </Button>
      <Button>
        <Link to="/import">Import Wallet</Link>
      </Button>
      <Button>
        <Link to="/my-page">My Wallet</Link>
      </Button>
      <Button>
        <Link to="/sign-in">Login</Link>
      </Button>
    </div>
  );
};

export default Home;
