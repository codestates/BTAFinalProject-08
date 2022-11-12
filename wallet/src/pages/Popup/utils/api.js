import axios from 'axios';

const BASE_URL = 'http://54.183.220.98:4567';

export const getValidator = axios
  .get(`${BASE_URL}/validator/validators`)
  .then((res) => res.data);
