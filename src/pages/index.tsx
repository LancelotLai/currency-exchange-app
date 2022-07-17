import { useRouter } from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { PopupBackground, PopupContainer } from '../components/Popup';
import { ErrorButton, ErrorDescription } from '../components/Error';
import { apiHandle } from './api';
import CurrencySubmitForm from '../components/Form/CurrencySubmitForm';

const defaultProps = {
  error: undefined,
  baseList: null
};

type HomePageProps = {
  baseList: any;
  error: any;
  props: any;
} & typeof defaultProps;

const baseCurrencyFetcher = async (apiKey: string) => {
  const response = await apiHandle(apiKey);
  return response;
};

const Home: NextPage<HomePageProps> = ({ error, baseList, ...props }: HomePageProps) => {
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
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CurrencySubmitForm baseList={baseList} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  try {
    const { resolvedUrl } = context;
    const reqError = context?.query?.error;
    const baseList = await baseCurrencyFetcher('currencyQuery');
    return {
      props: {
        resolvedUrl,
        baseList: baseList?.data?.symbols,
        error: reqError || null
      },

    };
  } catch (e) {
    console.error(`Home: getServerSideProps: ${e}`);
    return {
      props: {
        error: e,
      },
    };
  }
};

export default Home;

Home.propTypes = {
  error: PropTypes.oneOfType<any>([PropTypes.any]),
  baseList: PropTypes.oneOfType<any>([PropTypes.any])
};

Home.defaultProps = defaultProps;
