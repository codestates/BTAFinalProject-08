import axios from 'axios'
const BASE_URL_API = 'http://34.155.184.217:1317'
const BASE_URL_RPC = 'http://34.155.184.217:26657'
const LOCAL_BASE_URL = 'http://localhost:4567'

export const getAllValidator = () =>
    axios.get(`${BASE_URL_API}/staking/validators`).then((res) => res.data)

export const getBlocks = (limit) =>
    axios
        .get(`${LOCAL_BASE_URL}/block/recent?limit=${limit}`)
        .then((res) => res.data)
// http://34.155.184.217:1317/txs?message.action

export const getTrans = () =>
    axios.get(`${BASE_URL_API}/txs?message.action`).then((res) => res.data)

export const getBlockInfo = (id) =>
    axios.get(`${LOCAL_BASE_URL}/block?height=${id}`).then((res) => res.data)

export const getTransInfo = (hash) =>
    axios
        .get(`${LOCAL_BASE_URL}/transaction?hash=${hash}`)
        .then((res) => res.data)

export const getBlockIdTransaction = (id) =>
    axios
        .get(
            `http://34.155.184.217:1317/txs?message.action&tx.minheight=${id}8&limit=1`
        )
        .then((res) => res.data)

export const getChartPrice = () =>
    axios
        .get(
            'https://api.coingecko.com/api/v3/coins/osmosis/market_chart?vs_currency=usd&days=30&interval=daily'
        )
        .then((res) => res.data)

export const getMarketPrice = () =>
    axios
        .get('https://api.coingecko.com/api/v3/coins/osmosis')
        .then((res) => res.data)

export const getDelegations = (valiAddress) =>
    axios
        .get(`${BASE_URL_API}/staking/validators/${valiAddress}/delegations`)
        .then((res) => res)

export const getTransactionMsg = (txHash) =>
    axios
        .get(`${BASE_URL_API}/cosmos/tx/v1beta1/txs/${txHash}`)
        .then((res) => res.data)
