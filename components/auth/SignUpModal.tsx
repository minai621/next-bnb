import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
      height: 46px;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

//*비밀번호 최수 자리수
const PASSWORD_MIN_LENGTH = 8;
//* 선택할 수 없는 월 option
const disabledMoths = ['월'];
//* 선택할 수 없는 일 option
const disabledDays = ['일'];
//* 선택할 수 없는 년 option
const disabledYears = ['년'];

const SignUpModal: React.FC = () => {
    const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState(false);

  //*비밀번호 숨김 토글하기
  const toggleHidePassword = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  //* 비밀번호 인풋 포커스 되었을때
  const onFocusPassword = useCallback(() => {
    setPasswordFocused(true);
  }, []);

  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );
  const onChangeFirstname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstname(event.target.value);
    },
    []
  );
  const onChangeLastname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastname(event.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onChangeBirthMonth = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthMonth(event.target.value);
    },
    []
  );

  const onChangeBirthDay = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthDay(event.target.value);
    },
    []
  );

  const onChangeBirthYear = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthYear(event.target.value);
    },
    []
  );

    return (
      <Container>
        <CloseXIcon className="modal-close-x-icon" />
        <div className="input-wrapper">
          <Input
            placeholder="이메일 주소"
            type="email"
            icon={<MailIcon />}
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="이름 (예: 길동)"
            icon={<PersonIcon />}
            value={lastname}
            onChange={onChangeLastname}
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="성 (예: 홍)"
            icon={<PersonIcon />}
            value={firstname}
            onChange={onChangeFirstname}
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            type={hidePassword ? 'password' : 'text'}
            icon={
                hidePassword ? (
                  <ClosedEyeIcon onClick={toggleHidePassword} />
                ) : (
                  <OpenedEyeIcon onClick={toggleHidePassword} />
                )
            }
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <p className="sign-up-birthday-label">생일</p>
        <p className="sign-up-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비앤비 이용자에게 공개되지 않습니다.
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector
              options={monthList}
              disabledOptions={disabledMoths}
              defaultValue="월"
              value={birthMonth}
              onChange={onChangeBirthMonth}
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector
              options={dayList}
              disabledOptions={disabledDays}
              defaultValue="일"
              value={birthDay}
              onChange={onChangeBirthDay}
            />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector
              options={yearList}
              disabledOptions={disabledYears}
              defaultValue="년"
              value={birthYear}
              onChange={onChangeBirthYear}
            />
          </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
          <Button type="submit">가입하기</Button>
        </div>
      </Container>
    );
};

export default SignUpModal;
