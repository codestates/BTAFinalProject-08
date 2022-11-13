import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProposalDetail } from '../utils/api';
import {
  Card,
  Spin,
  Descriptions,
  Button,
  Tag,
  Input,
  message,
  Select,
} from 'antd';
import { isDepositPeriod } from './Voting';
import moment from 'moment';
import * as wallet from '../utils/wallet';
import { useGetSignerInfo } from '../hooks/useGetSignerInfo';

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState();
  const [amount, setAmount] = useState('');
  const [voteOpt, setVoteOpt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    signerInfo: { address, signingClient },
  } = useGetSignerInfo();

  const defaultBtnOptions = {
    htmlType: 'submit',
    type: 'primary',
    loading: isLoading,
  };

  useEffect(() => {
    const fetchProposal = async () => {
      const res = await getProposalDetail(id);
      setProposal(res);
    };
    fetchProposal();
  }, [id]);

  const onClickDeposit = async () => {
    try {
      setIsLoading(true);
      const res = await wallet.utils.sendDeposit(
        id,
        signingClient,
        address,
        amount
      );
      console.log(res, 'res');
      message.success('디파짓 완료');
      navigate(-1);
      setIsLoading(false);
    } catch (e) {
      message.error(e.message);
      navigate(-1);
      setIsLoading(false);
    }
  };

  const onClickVoting = async () => {
    try {
      setIsLoading(true);
      const res = await wallet.utils.sendVoting(
        id,
        signingClient,
        address,
        voteOpt
      );
      console.log(res, 'res');
      message.success('보팅 완료');
      navigate(-1);
    } catch (e) {
      message.error(e.message);
    }
  };

  return proposal ? (
    <Card title={proposal.content.title}>
      <Descriptions>
        <Descriptions.Item label="Status">
          {isDepositPeriod(proposal.status) ? (
            <Tag color="geekblue">Deposit</Tag>
          ) : (
            <Tag color="green">Voting</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Total Deposit">
          {proposal.total_deposit[0]?.amount} uosmo
        </Descriptions.Item>
        <Descriptions.Item label="Submit time">
          {moment(proposal.submit_time).format('YYYY-MM-DD HH:m:s')}
        </Descriptions.Item>
        <Descriptions.Item label="Voting Start">
          {moment(proposal.voting_start_time).format('YYYY-MM-DD HH:m:s')}
        </Descriptions.Item>
        <Descriptions.Item label="Voting End">
          {moment(proposal.voting_end_time).format('YYYY-MM-DD HH:m:s')}
        </Descriptions.Item>
        <Descriptions.Item label="Submit Time">
          {moment(proposal.submit_time).format('YYYY-MM-DD HH:m:s')}
        </Descriptions.Item>
        <Descriptions.Item label="Deposit End">
          {moment(proposal.deposit_end_time).format('YYYY-MM-DD HH:m:s')}
        </Descriptions.Item>
        <Descriptions.Item label="Detail">
          {proposal.content.description}
        </Descriptions.Item>
      </Descriptions>
      {isDepositPeriod(proposal.status) ? (
        <Input
          placeholder="amount"
          size="large"
          style={{ marginBottom: 14 }}
          suffix="uosmo"
          onChange={(e) => setAmount(e.target.value)}
        />
      ) : (
        <div>
          <Select
            size="large"
            defaultValue={'옵션 선택'}
            style={{ width: 200, marginBottom: 14 }}
            onChange={(value) => setVoteOpt(value)}
            options={[
              { value: 'yes', label: 'yes' },
              { value: 'no', label: 'no' },
              { value: 'noWithVeto', label: 'noWithVeto' },
              { value: 'abstrain', label: 'abstrain' },
            ]}
          />
        </div>
      )}
      {isDepositPeriod(proposal.status) ? (
        <Button
          {...defaultBtnOptions}
          onClick={onClickDeposit}
          disabled={amount.length === 0}
        >
          디파짓{console.log(isDepositPeriod(proposal.status))}
        </Button>
      ) : (
        <Button
          {...defaultBtnOptions}
          onClick={onClickVoting}
          disabled={voteOpt === null}
        >
          보팅
        </Button>
      )}
      <Button className="cancel-btn" onClick={() => navigate(-1)}>
        취소
      </Button>
    </Card>
  ) : (
    <Spin style={{ marginTop: 40 }} />
  );
};

export default ProposalDetail;
