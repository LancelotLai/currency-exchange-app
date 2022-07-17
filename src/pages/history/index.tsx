import type { NextPage, GetServerSideProps } from 'next';
import type { MouseEventHandler } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import {
  StyledTable, StyledTh, StyledTd, StyledTr, TableContainer
} from '../../components/Table';
import { PopupBackground, PopupContainer } from '../../components/Popup';
import { ErrorButton, ErrorDescription } from '../../components/Error';
import CurrencySubmitForm from '../../components/Form/CurrencySubmitForm';
import { apiHandle } from '../api';

const StyledDiv = styled.div`
  padding: 20px 0;
`;
const defaultProps = {
  baseCurrency: 'HKD',
  historyCurrency: {},
  baseList: null,
  error: undefined
};

const StyledTitle = styled.div`
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

type HistoryCurrencyProps = {
  baseCurrency: string;
  historyCurrency: any;
  error: any;
  props: any;
  baseList: any;
} & typeof defaultProps;

interface CurrencyInfoInterface {
  id: number;
  currency: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const currencyFetcher = async (apiKey:string, param: any) => {
  const response = await apiHandle(apiKey, param);
  return response;
};

const baseCurrencyFetcher = async (apiKey: string) => {
  const response = await apiHandle(apiKey);
  return response;
};

const HistoryCurrency: NextPage<HistoryCurrencyProps> = ({
  baseCurrency, historyCurrency, error, baseList, ...props
}: HistoryCurrencyProps) => {
  const router = useRouter();
  if (error) {
    return (
      <PopupBackground>
        <PopupContainer>
          <ErrorDescription>
            {error}
          </ErrorDescription>
          <ErrorButton href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            Return Home
          </ErrorButton>
        </PopupContainer>
      </PopupBackground>
    );
  }
  useSWR('currencyQuery');
  useSWR('historyCurrency');
  const apiSuccess = historyCurrency?.status === 'success' && historyCurrency?.data?.success;
  const headingInfo = [{
    id: 1,
    data: ` Exchange Rate from ${historyCurrency?.data?.start_date} to ${historyCurrency?.data?.end_date}`
  }];
  const dataLengthWidth = moment(historyCurrency?.data?.end_date).diff(historyCurrency?.data?.start_date, 'days') + 2;
  const bodyInfo: Array<any> = [];
  const currencyInfoList:Array<CurrencyInfoInterface> = [];
  if (apiSuccess && historyCurrency?.data?.rates && Object.keys(historyCurrency?.data?.rates)?.length > 0) {
    Object.keys(historyCurrency?.data?.rates).sort(
      (a: any, b: any) => +moment(a).format('YYYYMMDD') - +moment(b).format('YYYYMMDD')
    )?.forEach((value: any) => {
      // value is date
      const rateData = Object.keys(historyCurrency?.data?.rates[value])?.map((vv: any, ii: number) => {
        // vv is currency
        if (
          currencyInfoList?.length === 0
          || currencyInfoList?.filter((c: any) => c.currency === vv)?.length === 0
        ) {
          currencyInfoList.push({
            id: currencyInfoList?.length + 1,
            currency: `${vv}`,
            onClick: (e) => {
              e.preventDefault();
              router.push({
                pathname: '/latest',
                query: {
                  base: `${vv}`
                }
              });
            }
          });
        }
        const targetRateData = {
          [vv]: {
            id: ii + 1,
            date: value,
            rate: historyCurrency?.data?.rates?.[value]?.[vv]
          }
        };
        return targetRateData;
      });
      bodyInfo.push(rateData);
    });
  }
  return (
    <Container>
      <CurrencySubmitForm baseList={baseList} />
      <TableContainer>
        <StyledTable>
          <thead>
            <StyledTr>
              {headingInfo?.map((value) => (
                <StyledTh key={`headingInfo_${value?.id}`} colSpan={dataLengthWidth}>
                  <StyledTitle>
                    <a href={`/latest?base=${baseCurrency}`} onClick={(e) => {
                      e.preventDefault();
                      router.push({
                        pathname: '/latest',
                        query: {
                          base: `${baseCurrency}`
                        }
                      });
                    }}>{baseCurrency}</a>
                    {value?.data || ''}
                  </StyledTitle>
                </StyledTh>
              ))}
            </StyledTr>
            {apiSuccess && Object.keys(historyCurrency?.data?.rates)?.length > 0 && (
            <StyledTr>
              <StyledTh>
                Currency
              </StyledTh>
              {Object.keys(historyCurrency?.data?.rates)?.map((value) => (
                <StyledTh key={`${value}_base${historyCurrency?.data?.base}`}>
                  {value || ''}
                </StyledTh>
              ))}
            </StyledTr>
            )}
          </thead>
          <tbody>
            {currencyInfoList?.map((value: CurrencyInfoInterface) => (
              <StyledTr key={`currencyInfoList_${value?.id}`}>
                <StyledTd>
                  <a href={`/latest?base=${value?.currency}`} onClick={value?.onClick}>
                    {value?.currency}
                  </a>
                </StyledTd>
                {bodyInfo?.map((vv, ii) => {
                  const targetKey = ii + 1;
                  const filterList = vv?.filter((vvv: any) => `${Object.keys(vvv)}` === `${value?.currency}`);
                  if (filterList?.length > 0) {
                    const targetReturnList = filterList?.map((vvv: any) => (
                      <StyledTd key={`bodyInfo: ${vvv?.[value?.currency]?.id} with key ${targetKey}`}>
                        <StyledDiv>
                          {vvv?.[value?.currency]?.rate}
                        </StyledDiv>
                      </StyledTd>
                    ));
                    return targetReturnList;
                  } return (
                    <StyledTd key={`bodyInfo: ${vv} ${targetKey}`}>
                      <StyledDiv>
                        N/A
                      </StyledDiv>
                    </StyledTd>
                  );
                })}
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  try {
    const { resolvedUrl } = context;
    const targetBaseCurrency = context?.query?.base || 'HKD';
    const targetStartDate = context?.query?.start_date ? moment(context?.query?.start_date) : moment();
    const targetEndDate = context?.query?.end_date ? moment(context?.query?.end_date) : moment();
    const currencyHandle = await currencyFetcher('historyCurrency', {
      base: targetBaseCurrency,
      start_date: targetStartDate,
      end_date: targetEndDate
    });
    const baseList = await baseCurrencyFetcher('currencyQuery');
    return {
      props: {
        baseCurrency: targetBaseCurrency,
        historyCurrency: currencyHandle,
        baseList: baseList?.data?.symbols,
        resolvedUrl
      },

    };
  } catch (e) {
    console.error(`historyCurrency: getServerSideProps: ${e}`);
    return {
      props: {
        error: e,
      },
    };
  }
};

export default HistoryCurrency;

HistoryCurrency.propTypes = {
  baseCurrency: PropTypes.oneOfType<any>([PropTypes.string]),
  historyCurrency: PropTypes.oneOfType<any>([PropTypes.object]),
  error: PropTypes.oneOfType<any>([PropTypes.any]),
  baseList: PropTypes.oneOfType<any>([PropTypes.any])
};

HistoryCurrency.defaultProps = defaultProps;
