import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';

  const Container = styled.div<{ isValid: boolean; validateMode: boolean;}>`
    width: 100%;
    height: 100%;

    select {
        width: 100%;
        height: 100%;
        background-color: white;
        border: 1px solid ${palette.gray_eb};
        padding: 0 11px;
        border-radius: 4px;
        outline: none;
        -webkit-appearance: none;
        background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
        background-position: right 11px center;
        background-repeat: no-repeat;
        font-size: 16px;

        &:focus {
            border-color: ${palette.dark_cyan};
        }
    }
  
      &:disabled {
        background-image: url("/static/svg/common/selector/disabled_register_selector_down_arrow.svg");
        background-color: ${palette.gray_f7};
        border-color: ${palette.gray_e5};
        color: ${palette.gray_e5};
        cursor: not-allowed;
      }
    }
  
    .selector-warning {
      margin-top: 8px;
      display: flex;
      align-items: center;
  
      svg {
        margin-right: 4px;
      }
      p {
        font-size: 12px;
        color: ${palette.davidson_orange};
      }
    }
    ${({ isValid, validateMode }) =>
      validateMode &&
      css`
        select {
          border-color: ${isValid ? palette.dark_cyan : palette.tawny}
          !important;

          background-color: ${isValid ? 'white' : palette.snow}
        }`
  }
  `;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    value?: string;
    disabledOptions?: string[];
    isValid?: boolean;
}

  const Selector: React.FC<IProps> = ({
      options = [],
      disabledOptions = [],
      isValid,
      ...props
  }) => {
    const validateMode = useSelector((state) => state.common.validateMode);
    return (
      <Container
        isValid={!!isValid}
        validateMode={validateMode}
      >
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Container>
    );
  };

  export default React.memo(Selector);
