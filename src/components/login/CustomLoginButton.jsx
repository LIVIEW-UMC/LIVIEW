import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import GoogleLogo from '../../assets/icon/GoogleLogo';

const CustomLoginButton = () => {
  const location = useLocation();

  const handleLoginButtonClick = () => {
    window.location.href = 'https://jin-myserver.shop/oauth2/authorization/google';
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [location.search]);

  return (
    <CustomLoginButtonContainer>
      <CustomButton type="button" onClick={handleLoginButtonClick}>
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
