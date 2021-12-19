import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import SignUpModal from './auth/SignUpModal';
import useModal from '../hooks/useModal';
import { useSelector } from '../store';

const Container = styled.div`
position: sticky;
top: 0;
width: 100%;
height: 80px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 80px;
background-color: white;
box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
z-index: 10;
.header-logo-wrapper {
  display: flex;
  align-items: center;
  .header-logo {
    margin-right: 6px;
  }
}
.header-auth-buttons {
  .header-sign-up-button {
    height: 42px;
    margin-right: 8px;
    padding: 0 16px;
    border: 0;
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    font-weight: 600;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
  .header-login-button {
    height: 42px;
    padding: 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    font-weight: 600;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
  }
}
.header-user-profile {
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 6px 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
  .header-user-profile-image {
    margin-left: 8px;

    border-radius: 50%;
  }
}

/** react-ouside-click-handler div */
.header-logo-wrapper + div {
  position: relative;
}

.header-usermenu {
  position: absolute;
  right: 0;
  top: 52px;
  width: 240px;
  padding: 8px 0;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: white;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
  .header-usermenu-divider {
    width: 100%;
    height: 1px;
    margin: 8px 0;
    background-color: ${palette.gray_dd};
  }
}
`;

const Header: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);
  console.log(user.profileImage);
    return (
      <Container>
        <Link href="/">
          <a className="header-logo-wrapper">
            <AirbnbLogoIcon className="header-logo" />
            <AirbnbLogoTextIcon />
          </a>
        </Link>
        {
          !user.isLogged && (
          <div className="header-auth-buttons">
            <button
              type="button"
              className="header-sign-up-button"
              onClick={openModal}
            >회원가입
            </button>
            <button
              type="button"
              className="header-login-button"
            >로그인
            </button>
          </div>
          )
        }
        {user.isLogged && (
          <button className="header-user-profile" type="button">
            <HamburgerIcon />
            <Image
              src="/static/image/user/default_user_profile_image.jpg"
              width={20}
              height={20}
              className="header-user-profile-image"
              alt=""
            />
          </button>
        )}

        <ModalPortal>
          <SignUpModal closeModal={closeModal} />
        </ModalPortal>
      </Container>
    );
};

export default Header;
