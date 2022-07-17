import type { NextPage, GetServerSideProps } from 'next';
import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import {
  StyledTable, StyledTh, StyledTd, StyledTr, TableContainer
} from '../../components/Table';
import { PopupBackground, PopupContainer } from '../../components/Popup';
import { ErrorButton, ErrorDescription } from '../../components/Error';
import CurrencySubmitForm from '../../components/Form/CurrencySubmitForm';
import { apiHandle } from '../api';

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

const defaultProps = {
  baseCurrency: 'HKD',
  latestCurrency: {},
  error: undefined,
  baseList: null
};

type LatestCurrencyProps = {
  baseCurrency: string;
  latestCurrency: any;
  error: any;
  baseList: any;
  props: any;
} & typeof defaultProps;

interface BodyInfoInterface {
  id: number;
  currency: string;
  rate: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const currencyFetcher = async (apiKey:string, baseCurrency: string) => {
  const response = await apiHandle(apiKey, {
    base: baseCurrency
  });
  return response;
};

const baseCurrencyFetcher = async (apiKey: string) => {
  const response = await apiHandle(apiKey);
  return response;
};

const LatestCurrency: NextPage<LatestCurrencyProps> = ({
  baseCurrency, latestCurrency, error, baseList, ...props
}: LatestCurrencyProps) => {
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
  useSWR('latestCurrency');
  const apiSuccess = latestCurrency?.status === 'success' && latestCurrency?.data?.success;
  const headingInfo = [{
    id: 1,
    data: `Latest ${baseCurrency} Exchange Rate ${apiSuccess && latestCurrency?.data?.date ? `Date: ${latestCurrency?.data?.date}` : ''}`
  }];
  const bodyInfo: Array<BodyInfoInterface> = [];
  if (apiSuccess && latestCurrency?.data?.rates && Object.keys(latestCurrency?.data?.rates)?.length > 0) {
    Object.keys(latestCurrency?.data?.rates)?.forEach((value: any, index: number) => {
      const bodyData: BodyInfoInterface = {
        id: index += 1,
        currency: `${value}`,
        rate: latestCurrency?.data?.rates?.[`${value}`],
        onClick: (e) => {
          e.preventDefault();
          router.push({
            pathname: '/latest',
            query: {
              base: `${value}`
            }
          });
        }
      };
      bodyInfo.push(bodyData);
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
                <StyledTh key={`headingInfo_${value?.id}`} colSpan={Math.max(...bodyInfo.map((t) => Object.keys(t)?.length - 2))}>
                  {value?.data || ''}
                </StyledTh>
              ))}
            </StyledTr>
          </thead>
          <tbody>
            {bodyInfo?.map((value: BodyInfoInterface) => (
              <StyledTr key={`bodyInfo_${value?.id}`}>
                <StyledTd>
                  <a href={`/latest?base=${value?.currency}`} onClick={value?.onClick}>
                    {value?.currency}
                  </a>
                </StyledTd>
                <StyledTd>
                  {value?.rate}
                </StyledTd>
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
    const currencyHandle = await currencyFetcher('latestCurrency', targetBaseCurrency);
    const baseList = await baseCurrencyFetcher('currencyQuery');
    return {
      props: {
        baseCurrency: targetBaseCurrency,
        latestCurrency: currencyHandle,
        baseList: baseList?.data?.symbols,
        resolvedUrl
      },

    };
  } catch (e) {
    console.error(`LatestCurrency: getServerSideProps: ${e}`);
    return {
      props: {
        error: `${e}`,
      },
    };
  }
};

export default LatestCurrency;

LatestCurrency.propTypes = {
  baseCurrency: PropTypes.oneOfType<any>([PropTypes.string]),
  latestCurrency: PropTypes.oneOfType<any>([PropTypes.object]),
  error: PropTypes.oneOfType<any>([PropTypes.any]),
  baseList: PropTypes.oneOfType<any>([PropTypes.any])
};

LatestCurrency.defaultProps = defaultProps;
