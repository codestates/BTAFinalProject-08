import { Button, List, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { FIXED_FEE } from '../constants';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';
import { getRewardAmount, getValidator } from '../utils/api';

const StakingList = () => {
  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();
  const [stakingList, setStakingList] = useState([]);

  useEffect(() => {
    const fetchStaking = async () => {
      if (address) {
        const { validators } = await getValidator;
        const res = await Promise.all(
          validators.map(async (validator) => {
            const res = await signingClient.getDelegation(
              address,
              validator.addressInfo.operatorAddress
            );
            let reward;
            if (res) {
              const {
                data: { rewards },
              } = await getRewardAmount(
                address,
                validator.addressInfo.operatorAddress
              );
              reward = rewards;
              console.log(
                'res',
                rewards,
                res,
                address,
                validator.addressInfo.operatorAddress
              );
            }
            if (res) return { ...res, validator, reward };
          })
        ).then((response) => response.filter((item) => item !== undefined));

        setStakingList(res);
      }
    };
    fetchStaking();
  }, [address, signingClient]);

  const onClickGetReward = async (key) => {
    try {
      const tx = await signingClient.withdrawRewards(
        address,
        stakingList[key].validator.addressInfo.operatorAddress,
        FIXED_FEE
      );
      console.log(tx.json(), 'tx finish');
      message.success('리워드 얻기 성공');
    } catch (e) {
      message.error('리워드 얻기 실패');
    }
    //To do: 리워드 이후 액션
  };

  const confirmReward = (key) => {
    Modal.confirm({
      title: 'Get Reward',
      content: stakingList[key].reward[0].amount + ' uosmo를 수령하시겠습니까?',
      onOk: onClickGetReward(key),
    });
  };

  return (
    <>
      <List
        dataSource={stakingList}
        renderItem={(item, idx) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => confirmReward(idx)}
                disabled={item.reward.length === 0}
              >
                Get Reward
              </Button>,
            ]}
          >
            {console.log(item.reward.amount, item)}

            <List.Item.Meta
              title={item.validator.moniker}
              description={item.amount + ' uosmo'}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default StakingList;
