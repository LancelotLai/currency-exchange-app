import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 8px 0;
  max-width: 150px;
`;

const StyledLabel = styled(Label)`
  margin-left: 0;
`;

const InputContainer = styled.div`
  display:  flex;
  flex-direction: column;
  margin: 8px;
`;

const defaultProps = {
  name: '',
  labelText: '',
  rules: {},
  error: undefined,
  errorMessage: '',
  placeHolderText: '',
  props: {}
};

type DayPickSelectProps = {
  name: string;
  labelText: string;
  rules: object;
  error: any;
  errorMessage: string;
  placeHolderText: string;
  props?: any;
} & typeof defaultProps;

const DayPickSelect = ({
  name, error, errorMessage, labelText, placeHolderText, rules, ...props
}: DayPickSelectProps) => {
  const { control, register, clearErrors } = useFormContext<any>();
  return (
    <InputContainer>
      { labelText && (
      <StyledLabel>{labelText}</StyledLabel>
      )}
      <Controller
        control={control}
        {...register(`${name}`, rules)}
        render={({ field }) => (
          <DatePicker
            dateFormat="yyyy-MM-dd"
            placeholderText={placeHolderText || 'Select date'}
            onChange={(date) => {
              if (error) {
                clearErrors(`${name}`);
              }
              return (field.onChange(date));
            }}
            minDate={moment().add(-364, 'days').toDate()}
            maxDate={moment().toDate()}
            selected={field.value}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        )}
      />
      {error && (
      <StyledErrorMessage>
        {errorMessage}
      </StyledErrorMessage>
      )}
    </InputContainer>
  );
};

export default DayPickSelect;

DayPickSelect.propTypes = {
  name: PropTypes.oneOfType<any>([PropTypes.string]),
  labelText: PropTypes.oneOfType<any>([PropTypes.string]),
  rules: PropTypes.oneOfType<any>([PropTypes.object]),
  error: PropTypes.oneOfType<any>([PropTypes.any]),
  errorMessage: PropTypes.oneOfType<any>([PropTypes.string]),
  placeHolderText: PropTypes.oneOfType<any>([PropTypes.string]),
  props: PropTypes.oneOfType<any>([PropTypes.object])
};

DayPickSelect.defaultProps = defaultProps;
