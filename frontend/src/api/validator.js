import axios from 'axios'
const BASE_URL = 'http://34.155.184.217:1317'

export const getAllValidator = () =>
    axios.get(`${BASE_URL}/staking/validators`).then((res) => res.data)
