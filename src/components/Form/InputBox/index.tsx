import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import inputStyle from '../inputStyle';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const TextBox = styled.input<any>`
${inputStyle};
height: 15.5px;
width: 139px;
border-radius: 4px;
padding: 1px 2px;
margin: 8px;
&:hover{
  border:1px solid lightgrey;
};
&:focus{
  border:1px solid blue;
  outline: none;
};
${({ isError }) => (isError
    ? `
border:1px solid darkred;
`
    : `
border:1px solid black;
`)};
`;

const StyledErrorMessage = styled(ErrorMessage)`
  max-width: 150px;
`;

const InputContainer = styled.div`
  display:  flex;
  flex-direction: column;
`;

const defaultProps = {
  name: '',
  labelText: '',
  rules: {},
  error: undefined,
  errorMessage: '',
  props: {}
};

type InputBoxProps = {
  name: string;
  labelText: string;
  rules: object;
  error: any;
  errorMessage: string;
  props?: any;
} & typeof defaultProps;

const InputBox = ({
  name, labelText, rules, error, errorMessage, ...props
}:InputBoxProps) => {
  const { register } = useFormContext<any>();
  return (
    <InputContainer {...props}>
      { labelText && (
        <Label>{labelText}</Label>
      )}
      <TextBox isError={error} {...register(`${name}`, rules)} type="text" />
      {error && (
        <StyledErrorMessage>
          {errorMessage}
        </StyledErrorMessage>
      )}
    </InputContainer>
  );
};

export default InputBox;

InputBox.propTypes = {
  name: PropTypes.oneOfType<any>([PropTypes.string]),
  labelText: PropTypes.oneOfType<any>([PropTypes.string]),
  rules: PropTypes.oneOfType<any>([PropTypes.object]),
  error: PropTypes.oneOfType<any>([PropTypes.any]),
  errorMessage: PropTypes.oneOfType<any>([PropTypes.string]),
  props: PropTypes.oneOfType<any>([PropTypes.object])
};

InputBox.defaultProps = defaultProps;
