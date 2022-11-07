import axios from 'axios'
const BASE_URL_API = 'http://34.155.184.217:1317'
const BASE_URL_RPC = 'http://34.155.184.217:26657'
const LOCAL_BASE_URL = 'http://localhost:4567'

export const getAllValidator = () =>
    axios.get(`${BASE_URL_API}/staking/validators`).then((res) => res.data)

export const getBlocks = () =>
    axios.get(`${BASE_URL_RPC}/blockchain`).then((res) => res.data)
// http://34.155.184.217:1317/txs?message.action

export const getTrans = () =>
    axios.get(`${BASE_URL_API}/txs?message.action`).then((res) => res.data)

export const getBlockInfo = (id) =>
    axios
        .get(`http://localhost:4567/block?height=${id}`)
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
