import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import * as wallet from '../utils/wallet';

const BalanceInput = ({ address }) => {
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (address) {
      const getBalance = async () => {
        const { balances } = await wallet.utils.getBalance(address, API_URL);
        console.log(balances, 'fdsaf');
        setBalance(balances[0].amount);
      };
      getBalance();
    }
  }, [address]);

  return <Input suffix="uosmo" placeholder={balance} disabled size="large" />;
};

export default BalanceInput;
