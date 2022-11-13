import React, { useEffect, useState } from 'react';
import { getProposals } from '../utils/api';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD';
const VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD';

export const isDepositPeriod = (status) =>
  status === DEPOSIT_PERIOD ? true : false;

const Voting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { title: 'id', key: 'id', dataIndex: 'proposal_id' },
    {
      title: 'title',
      key: 'content',
      dataIndex: 'content',
      render: (_, record) => (
        <Link to={`/proposal/${record.proposal_id}`}>
          {record.content.title}
        </Link>
      ),
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      filters: [
        { text: 'deposit', value: DEPOSIT_PERIOD },
        { text: 'voting', value: VOTING_PERIOD },
      ],
      onFilter: (value, record) =>
        record.status.toString().indexOf(value) === 0,
      render: (item) => (isDepositPeriod(item) ? 'deposit' : 'voting'),
    },
    {
      title: 'deposit',
      key: 'total_deposit',
      dataIndex: 'total_deposit',
      render: (item) => <div>{item[0]?.amount}</div>,
    },
  ];

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setIsLoading(true);
        const res = await getProposals();
        console.log(res);
        setData(res);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchProposals();
  }, []);

  return (
    <Table
      size="small"
      dataSource={data}
      columns={columns}
      rowKey="proposal_id"
      isLoading={isLoading}
    />
  );
};

export default Voting;
