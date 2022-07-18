import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import { breakpoints } from '../../../core/generalStyle';
import InputBox from '../InputBox';
import DayPickSelect from '../DayPickSelect';
import Submit from '../Submit';

const StyledSubmit = styled(Submit)`
  width: 145px;
  padding: 2px;
  margin: 16px 8px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction:column;
  align-items: center;
  margin: auto;
  ${breakpoints('max-width', 'px', [
    { 1200: 800 },
    { 800: 600 },
    { 600: 400 },
    { 450: 300 }
  ])}
`;

const defaultProps = {
  baseList: null
};

type CurrencySubmitFormProps = {
  baseList: any;
} & typeof defaultProps;

const CurrencySubmitForm = ({ baseList, ...props }:CurrencySubmitFormProps) => {
  const router = useRouter();
  const methods = useForm();
  const [startDateErrorMessage, setStartDateErrorMessage] = useState('');
  const [endDateErrorMessage, setEndDateErrorMessage] = useState('');
  const [avoidSubmit, setAvoidSubmit] = useState(true);
  const {
    formState, handleSubmit, setError, getValues
  } = methods;
  useEffect(() => {
    if (Object.keys(formState.errors)?.length === 0) {
      setAvoidSubmit(false);
    } else {
      setAvoidSubmit(true);
    }
    switch (`${formState?.errors?.startDate?.type}`) {
      case 'required':
        setStartDateErrorMessage('input format is not correct.');
        break;
      case 'pattern':
        setStartDateErrorMessage('input should not smaller than start date.');
        break;
      default:
        break;
    }
    switch (`${formState?.errors?.endDate?.type}`) {
      case 'required':
        setEndDateErrorMessage('input format is not correct.');
        break;
      case 'pattern':
        setEndDateErrorMessage('input should not smaller than start date.');
        break;
      default:
        break;
    }
  }, [formState, getValues]);
  const onSubmit = async (data: any) => {
    try {
      if (moment(data?.endDate).isBefore(moment(data?.startDate))) {
        setError('startDate', { type: 'pattern' });
        setError('endDate', { type: 'pattern' });
      } else if (
        moment(data?.endDate).format('YYYY-MM-DD') ===
        // eslint-disable-next-line react/destructuring-assignment
        moment(data?.startDate).format('YYYY-MM-DD') &&
        moment(data?.endDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
          && baseList[data?.base]) {
        router.push({
          pathname: '/latest',
          query: {
            base: `${data?.base}`
          }
        });
        // eslint-disable-next-line react/destructuring-assignment
      } else if (baseList[data?.base]) {
        router.push({
          pathname: '/history',
          query: {
            base: `${data?.base}`,
            start_date: moment(data?.startDate).format('YYYY-MM-DD'),
            end_date: moment(data?.endDate).format('YYYY-MM-DD')
          }
        });
      } else {
        throw Error('currency is not in the api list.');
      }
    } catch (err) {
      router.push({
        pathname: '/',
        query: {
          error: `${err}`
        }
      });
    }
  };
  return (
    <FormProvider {...methods} {...props}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          name="base"
          labelText="Currency:"
          rules={{ required: true }}
          error={formState?.errors?.base}
          errorMessage="input format is not correct."
        />
        <DayPickSelect
          name="startDate"
          labelText="start date"
          placeHolderText="select date"
          error={formState?.errors?.startDate}
          errorMessage={startDateErrorMessage}
          rules={{ required: true }}
        />
        <DayPickSelect
          name="endDate"
          labelText="end date"
          placeHolderText="select date"
          error={formState?.errors?.endDate}
          errorMessage={endDateErrorMessage}
          rules={{ required: true }}
        />
        <StyledSubmit disabled={avoidSubmit} value="submit" />
      </StyledForm>
    </FormProvider>
  );
};

export default CurrencySubmitForm;

CurrencySubmitForm.propTypes = {
  baseList: PropTypes.oneOfType<any>([PropTypes.any])
};

CurrencySubmitForm.defaultProps = defaultProps;
