import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import axiosConfig from '../../../core/axiosConfig';
import { ApiInterface } from '../../../core/generalInterface';

export const symbolsHandle = async (): Promise<ApiInterface> => {
  try {
    axiosConfig();
    const axiosHandle = await axios({
      method: 'GET',
      headers: {
        apikey: `${process.env.CURRENCY_API_KEY}`,
      },
      url: `${process.env.EXCHANGE_DATA_PATH}/symbols`,
    });
    console.log(axiosHandle);
    const apiResult: ApiInterface = {
      status: 'success',
      statusCode: axiosHandle?.status,
      responseMessage: JSON.stringify(axiosHandle.headers),
      data: axiosHandle.data,
    };
    return apiResult;
  } catch (err) {
    console.error(`symbolsHandle${err}`);
    throw err;
  }
};

const symbolsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const apiHandle = await symbolsHandle();
    res.status(200);
    res.json(apiHandle);
  } catch (err) {
    console.error(`symbolsHandler: ${err}`);
    const targetResponse: ApiInterface = {
      status: 'fail',
      statusCode: 200,
      responseMessage: 'symbolsHandler failed',
      data: `${err}`,
    };
    res.status(200);
    res.json(targetResponse);
  }
};

export default symbolsHandler;
