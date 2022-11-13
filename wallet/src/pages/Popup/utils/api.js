import axios from 'axios';

const BASE_URL = 'http://54.183.220.98:4567/';
const NODE_API = 'http://13.56.212.121:1317/';

export const getValidator = axios
  .get(`${BASE_URL}/validator/validators`)
  .then((res) => res.data);

export const getRewardAmount = (address, validatorAddress) =>
  axios.get(
    `${NODE_API}/cosmos/distribution/v1beta1/delegators/${address}/rewards/${validatorAddress}`
  );

export const getProposals = () =>
  axios.get(`${BASE_URL}proposal`).then((res) => res.data);

export const getProposalDetail = (id) =>
  axios.get(`${BASE_URL}proposal/details?id=${id}`).then((res) => res.data);
