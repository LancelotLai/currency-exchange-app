import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosConfig = (retryCount: number = 3): void => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Methods'] =
    'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  axios.defaults.headers.common['Content-Type'] =
    'application/json;charset=utf-8';
  // axios.defaults.headers.common['User-Agent'] = 'Lancelot';
  axiosRetry(axios, { retries: retryCount });
};

export default axiosConfig;
