import axios from 'axios'
const BASE_URL_API = 'http://34.155.184.217:1317'
const BASE_URL_RPC = 'http://34.155.184.217:26657'

export const getAllValidator = () =>
    axios.get(`${BASE_URL_API}/staking/validators`).then((res) => res.data)

export const getBlocks = () =>
    axios.get(`${BASE_URL_RPC}/blockchain`).then((res) => res.data)
