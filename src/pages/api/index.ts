// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiInterface } from '../../core/generalInterface';
import { historyCurrencyHandle } from './historyCurrencyHandler';
import { latestCurrencyHandle } from './latestCurrencyHandler';
import { symbolsHandle } from './symbolsHandler';

export const apiHandle = async (
  apiKey: string,
  params?: any
): Promise<ApiInterface> => {
  try {
    const defaultResponse: ApiInterface = {
      status: 'fail',
      statusCode: 200,
      responseMessage: 'default false',
    };
    switch (apiKey) {
      case 'latestCurrency':
        return await latestCurrencyHandle(params);
      case 'historyCurrency':
        return await historyCurrencyHandle(params);
      case 'currencyQuery':
        return await symbolsHandle();
      default:
        break;
    }
    return defaultResponse;
  } catch (err) {
    console.error(`apiHandle: ${err}`);
    throw err;
  }
};

const internalHealthCheckHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const targetResponse: ApiInterface = {
      status: 'success',
      statusCode: 200,
      responseMessage: 'health check success',
    };
    res.status(200);
    res.json(targetResponse);
  } catch (err) {
    console.error(`internalHealthCheckHandler: ${err}`);
    const targetResponse: ApiInterface = {
      status: 'fail',
      statusCode: 200,
      responseMessage: 'health check failed',
      data: err,
    };
    res.status(200);
    res.json(targetResponse);
  }
};

export default internalHealthCheckHandler;
