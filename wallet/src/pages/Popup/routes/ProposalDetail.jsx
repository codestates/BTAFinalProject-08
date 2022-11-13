import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProposalDetail } from '../utils/api';
import { Card, Spin, Descriptions, Button, Tag } from 'antd';
import { isDepositPeriod } from './Voting';
import moment from 'moment';

const ProposalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState();

  useEffect(() => {
    const fetchProposal = async () => {
      const res = await getProposalDetail(id);
      setProposal(res);
    };
    fetchProposal();
  }, [id]);

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
          {proposal.voting_start_time}
        </Descriptions.Item>
        <Descriptions.Item label="Voting End">
          {proposal.voting_end_time}
        </Descriptions.Item>
        <Descriptions.Item label="Submit Time">
          {proposal.submit_time}
        </Descriptions.Item>
        <Descriptions.Item label="Deposit End">
          {proposal.deposit_end_time}
        </Descriptions.Item>
        <Descriptions.Item label="Detail">
          {proposal.content.description}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary">
        {isDepositPeriod(proposal.status) ? '보팅' : '디파짓'}
      </Button>
      <Button className="cancel-btn" onClick={() => navigate(-1)}>
        취소
      </Button>
    </Card>
  ) : (
    <Spin style={{ marginTop: 40 }} />
  );
};

export default ProposalDetail;
