import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

type InputContainerProps = {
  iconExist: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px ' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    top: 15px;
    height: 46px;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line react/require-default-props
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({
  icon,
  ...props
}) => {
  return (
    <Container
      iconExist={!!icon}
    >
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default React.memo(Input);
