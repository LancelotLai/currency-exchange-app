import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import axiosConfig from '../../../core/axiosConfig';
import { ApiInterface } from '../../../core/generalInterface';

interface Params {
  base: string;
}

export const latestCurrencyHandle = async (
  params: Params
): Promise<ApiInterface> => {
  try {
    axiosConfig();
    console.log(params);
    const axiosHandle = await axios({
      method: 'GET',
      headers: {
        apikey: `${process.env.CURRENCY_API_KEY}`,
      },
      url: `${process.env.EXCHANGE_DATA_PATH}/latest`,
      params: {
        base: params?.base,
      },
    });
    const apiResult: ApiInterface = {
      status: 'success',
      statusCode: axiosHandle?.status,
      responseMessage: JSON.stringify(axiosHandle.headers),
      data: axiosHandle.data,
    };
    return apiResult;
  } catch (err) {
    console.error(`latestCurrencyHandle${err}`);
    throw err;
  }
};

const latestCurrencyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (!req?.query?.start_date || !req?.query?.end_date || !req?.query?.base) {
      throw new Error('start date, end date and base are required.');
    }
    const apiHandle = await latestCurrencyHandle({
      base: `${req?.query?.base}`,
    });
    res.status(200);
    res.json(apiHandle);
  } catch (err) {
    console.error(`latestCurrencyHandler: ${err}`);
    const targetResponse: ApiInterface = {
      status: 'fail',
      statusCode: 200,
      responseMessage: 'latestCurrencyHandler failed',
      data: `${err}`,
    };
    res.status(200);
    res.json(targetResponse);
  }
};

export default latestCurrencyHandler;
