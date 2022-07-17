import styled from 'styled-components';
import PropTypes from 'prop-types';

const SubmitInput = styled.input`
  width: 50%;
  margin: 8px auto;
  padding: 16px 40px;
  font-size: 1rem;
  line-height: 24px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  &:disabled{
  background-color: grey;
  cursor: initial;
  };
  &:not(:disabled) {
    &:hover {
      background-color: darkred;
      color: grey;
    }
  }
`;

const defaultProps = {
  props: {},
  disabled: false,
  type: 'submit'
};

type SubmitProps = {
  disabled?: boolean;
  value: string;
  type?: string;
  props?: any;
} & typeof defaultProps;

const Submit = ({
  disabled, value, type = 'submit', ...props
}: SubmitProps) => (
  <SubmitInput disabled={disabled} value={value} type="submit" {...props} />
);

export default Submit;

Submit.propTypes = {
  props: PropTypes.oneOfType<any>([PropTypes.object]),
  disabled: PropTypes.oneOfType<any>([PropTypes.bool]),
  type: PropTypes.oneOfType<any>([PropTypes.string]),
};

Submit.defaultProps = defaultProps;
