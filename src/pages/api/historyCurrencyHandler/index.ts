import axios from 'axios';
import moment, { Moment } from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import axiosConfig from '../../../core/axiosConfig';
import { ApiInterface } from '../../../core/generalInterface';

interface Params {
  start_date: Moment;
  end_date: Moment;
  base: string;
}

export const historyCurrencyHandle = async (
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
      url: `${process.env.EXCHANGE_DATA_PATH}/timeseries`,
      params: {
        base: params?.base,
        start_date: params?.start_date?.format('YYYY-MM-DD'),
        end_date: params?.end_date?.format('YYYY-MM-DD'),
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
    console.error(`historyCurrencyHandle${err}`);
    throw err;
  }
};

const historyCurrencyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (!req?.query?.start_date || !req?.query?.end_date || !req?.query?.base) {
      throw new Error('start date, end date and base are required.');
    }
    const startDate = moment(req?.query?.start_date);
    const endDate = moment(req?.query?.end_date);
    const apiHandle = await historyCurrencyHandle({
      base: `${req?.query?.base}`,
      start_date: startDate,
      end_date: endDate,
    });
    res.status(200);
    res.json(apiHandle);
  } catch (err) {
    console.error(`historyCurrencyHandler: ${err}`);
    const targetResponse: ApiInterface = {
      status: 'fail',
      statusCode: 200,
      responseMessage: 'historyCurrencyHandler failed',
      data: `${err}`,
    };
    res.status(200);
    res.json(targetResponse);
  }
};

export default historyCurrencyHandler;
