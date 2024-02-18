import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Initial from '../components/main/Initial';
import Login from '../components/login/login';
import TabNavigator from '../components/main/TabNavigator';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <MainContainer>
      {isLoggedIn ? (
        <TabNavigator />
      ) : (
        <>
          <Initial />
          <Login />
        </>
      )}
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
