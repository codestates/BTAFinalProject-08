//import { useQuery } from '@tanstack/react-query';
import { List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getValidator } from '../utils/api';
//import { getValidator } from '../utils/api';

const Staking = () => {
  const [validators, setValidators] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await getValidator;
      console.log(data);
      setValidators(data.validators);
    };
    getData();
  }, []);
  //  commistion
  /*!SECTION
addressInfo
: 
{pubKey: 'cVTM6Vw4f2uSpQKQNCyf5Fmj6N76E19MbbEVUtQPcT0=', operatorAddress: 'osmovaloper1mhfgfenrp88d2p5dttyw59x8frfk7u9lujg49y', address: 'osmo1mhfgfenrp88d2p5dttyw59x8frfk7u9lx9qkjr', hex: '5BDA2D761F5CE86F586870477937D42847F12F11'}
commistion : "0.070000000000000000"
isActive : true
moniker : "codemonkeyshin"
participation : "TBD"
totalProposals : "TBD"
votingPower : "1002"
  */
  return (
    <List
      dataSource={validators}
      itemLayout="horizontal"
      loading={!validators ? true : false}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link to={`/staking/delegate/${item.addressInfo.operatorAddress}`}>
              delegate
            </Link>,
            <Link
              to={`/staking/undelegate/${item.addressInfo.operatorAddress}`}
            >
              undelegate
            </Link>,
          ]}
        >
          <Skeleton loading={item.loading}>
            <List.Item.Meta
              title={<Link>{item?.moniker}</Link>}
              description={
                'commission  ' + (item?.commistion * 100).toFixed(2) + '%'
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Staking;
