import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import GoogleLogo from '../../assets/icon/GoogleLogo';

const CustomLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('로그인 성공', tokenResponse);
    },
    onError: (errorResponse) => {
      console.error('로그인 실패', errorResponse);
    },
  });

  const handleLoginClick = () => {
    login();
  };

  return (
    <CustomLoginButtonContainer>
      <CustomButton type="button" onClick={handleLoginClick}>
        <GoogleLogoContainer>
          <GoogleLogo />
          <ButtonText> 구글계정으로 계속하기 </ButtonText>
        </GoogleLogoContainer>
      </CustomButton>
    </CustomLoginButtonContainer>
  );
};
const CustomLoginButtonContainer = styled.div``;

const GoogleLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin-left: 60px;
`;

const ButtonText = styled.span`
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  font-style: normal;

  margin-right: 50px;
`;

const CustomButton = styled.button`
  width: 320px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 2px solid var(--Neutral-800, #d3d8dd);
  background: #fff;
`;

export default CustomLoginButton;
