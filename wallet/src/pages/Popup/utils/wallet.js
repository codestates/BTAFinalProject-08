import { chains } from 'chain-registry';
import { FEES, osmosis, cosmos } from 'osmojs';
import { getOfflineSignerProto } from 'cosmjs-utils';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import CryptoJS from 'crypto-js';
import { longify } from '@cosmjs/stargate/build/queryclient';
import { FIXED_FEE } from '../constants';


export const utils = {
  getMnemonic: async () => {
    // 18 단어로 생성
    const wallet = await DirectSecp256k1HdWallet.generate(18);
    // (월렛 필드)니모닉 코드 가져오기
    const mnemonic = wallet.mnemonic;
    return mnemonic;
  },
  getChain: (chainName) => {
    // 체인 이름을 토대로 체인 오브젝트 리턴
    return chains.find(({ chain_name }) => chain_name === chainName);
  },

  getAddress: async (signer) => {
    // 니모닉 코드와 체인정보를 사용해서 해당 지갑의 주소를 리턴
    let myAccount = await signer.getAccounts();
    return myAccount[0].address;
  },
  getBalance: async (address, endPoint) => {
    // 지갑의 주소와 엔드포인트를 사용해서 해당 지갑의 잔고를 리턴
    const { createRPCQueryClient } = osmosis.ClientFactory;
    const client = await createRPCQueryClient({ rpcEndpoint: endPoint });
    return await client.cosmos.bank.v1beta1.allBalances({
      address,
    });
  },
  getFee: (amount) => {
    // low , medium, high 에 해당하는 값의 수수료를 리턴
    return FEES.osmosis.swapExactAmountIn(amount);
  },
  getSigner: async (mnemonic, chain) => {
    // 사용자의 mnemonic과 체인을 사용하여 signer 리턴
    return await getOfflineSignerProto({
      mnemonic,
      chain,
    });
  },
  getSigningClient: async (endPoint, signer) => {
    // 사용자의 signer와 endpoint를 사용하여 클라이언트 객체 리턴
    return await SigningStargateClient.connectWithSigner(endPoint, signer);
  },
  sendOsmosis: async (fromAddress, toAddress, amount, gas, signingClient) => {
    // 입력한 양의 코인을 송금한 후 해당 트랜잭션 정보 리턴
    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
    const msg = send({
      amount: [
        {
          denom: 'uosmo',
          amount: amount,
        },
      ],
      toAddress: toAddress,
      fromAddress: fromAddress,
    });

    const fee = {
      amount: [
        {
          denom: 'uosmo',
          amount: amount,
        },
      ],
      gas,
    };
    console.log(msg, fee, 'check fee msg');
    return await signingClient.signAndBroadcast(fromAddress, [msg], fee);
  },
  sendDeposit: async (proposalId, signingClient, address, amount) => {
    const { deposit } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
    const depositMsg = deposit({
      amount: [{ denom: 'uosmo', amount }],
      depositor: address,
      proposalId: longify(proposalId),
    });
    return await signingClient.signAndBroadcast(
      address,
      [depositMsg],
      FIXED_FEE
    );
  },
  sendVoting: async (proposalId, signingClient, address, voteOption) => {
    const { vote } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
    let option;
    switch (voteOption) {
      case 'yes':
        option = 1;
        break;
      case 'abstrain':
        option = 2;
        break;
      case 'no':
        option = 3;
        break;
      case 'noWithVeto':
        option = 4;
        break;

      default:
        return 'yes';
    }
    const voteMsg = vote({
      proposalId: longify(proposalId),
      voter: address,
      option,
    });
    return await signingClient.signAndBroadcast(address, [voteMsg], FIXED_FEE);
  },
  getTx: async (address, signingClient) => {
    // 해당 주소의 송금 및 트랜젝션 정보 리턴
    const transaction = await signingClient.searchTx({
      sentFromOrTo: address,
    });
    let tx = [];
    for (let i of transaction) {
      let txData = [];
      if (JSON.parse(i.rawLog)[0].events[3].attributes[0].value === address) {
        txData.push('received');
        txData.push(JSON.parse(i.rawLog)[0].events[3].attributes[2].value);
      } else {
        txData.push('send');
        txData.push(JSON.parse(i.rawLog)[0].events[3].attributes[2].value);
      }
      tx.push(txData);
    }
    return tx;
  },
  aes256Encrypt: async (mnemonic, password) => {
    // 사용자의 mnemonic을 패스워드를 사용하여 암호화
    return CryptoJS.AES.encrypt(mnemonic, password).toString();
  },
  aes256Decrypt: async (encrypted, password) => {
    // 크롬 스토리지에 저장된 암호화된 mnemonic을 패스워드를 사용하여 복호화
    return CryptoJS.AES.decrypt(encrypted, password).toString(
      CryptoJS.enc.Utf8
    );
  },

  md5Encrypt: async (password) => {
    // 입력 패스워드가 올바른 패스워드인지 판단하기 위해 해시화 후 비교하기위한 md5 암호화
    return CryptoJS.MD5(password);
  },
  /*NOTE - 
  투표를 생성하는 함수
  depositAmount: uosmo 단위
  */
  govSubmitProposal: async ({
    signer,
    title,
    description,
    memo,
    depositAmount,
  }) => {
    const END_POINT = 'http://13.56.212.121:26657/';
    const { submitProposal } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
    const feeAmount = FEES.osmosis.swapExactAmountIn('low');
    const [{ address: authorAddress }] = await signer.getAccounts();
    const textProposal = TextProposal.fromPartial({
      title: title,
      description: description,
    });
    const proposalMsg = submitProposal({
      content: {
        typeUrl: '/cosmos.gov.v1beta1.TextProposal',
        value: Uint8Array.from(TextProposal.encode(textProposal).finish()),
      },
      initialDeposit: [{ denom: 'uosmo', amount: depositAmount }],
      proposer: authorAddress,
    });
    const signingClient = await SigningStargateClient.connectWithSigner(
      END_POINT,
      signer
    );
    const tx = await signingClient.signAndBroadcast(
      authorAddress,
      [proposalMsg],
      feeAmount,
      memo
    );
    return tx;
  },
  /*NOTE -
    처음에 프로포절이 만들어지려면 10osmo가 필요하다, 그래서 투자금이 부족한 
    프로포절에 투자금을 더하는 행위이다.
   */
  govDeposit: async ({ signer, proposalId, amount, memo }) => {
    const END_POINT = 'http://13.56.212.121:26657/';
    const { deposit } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
    const [{ address: depositAddress }] = await signer.getAccounts();
    const feeAmount = FEES.osmosis.swapExactAmountIn('low');

    const depositMsg = deposit({
      amount: [{ denom: 'uosmo', amount: amount }],
      depositor: fromAddress,
      proposalId: longify(proposalId),
    });
    const signingClient = await SigningStargateClient.connectWithSigner(
      END_POINT,
      signer
    );
    const tx = await signingClient.signAndBroadcast(
      depositAddress,
      [depositMsg],
      feeAmount,
      memo
    );
    return tx;
  },
  /*NOTE - 
  proposerId 는 1 ~ 거버넌스 생성 숫자 1~ 숫자를 의미함 
  voteOption은 (
    abstrain 기권
    no 반대
    noWithVeto 절대 반대 (절대 반대는 프로포절 생성자에게 패널티를 준다.)
    yes 찬성
    )
  */
  govVote: async ({ signer, proposerId, voteOption, memo }) => {
    const END_POINT = 'http://13.56.212.121:26657/';
    const { vote } = cosmos.gov.v1beta1.MessageComposer.withTypeUrl;
    const [{ address: voterAddress }] = await signer.getAccounts();
    const fee = FEES.osmosis.swapExactAmountIn('low');
    const signingClient = await SigningStargateClient.connectWithSigner(
      END_POINT,
      signer
    );

    let option;
    switch (voteOption) {
      case 'abstrain':
        option = VoteOption.VOTE_OPTION_ABSTAIN;
      case 'no':
        option = VoteOption.VOTE_OPTION_NO;
      case 'noWithVeto':
        option = VoteOption.VOTE_OPTION_NO_WITH_VETO;
      case 'yes':
        option = VoteOption.VOTE_OPTION_YES;
    }
    const msg = vote({
      proposalId: longify(proposerId),
      voter: voterAddress,
      option: option,
    });

    const tx = await signingClient.signAndBroadcast(
      voterAddress,
      [msg],
      fee,
      memo
    );
    return tx;
  },
};
