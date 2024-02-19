import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Initial from '../components/main/Initial';
import Login from '../components/login/login';
import TabNavigator from '../components/main/TabNavigator';

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      navigate('/home');
    }
  }, []);
  return (
    <MainContainer>
      <TabNavigator />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
