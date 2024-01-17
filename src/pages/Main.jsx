import styled from 'styled-components';
import Initial from '../components/main/Initial';
import Login from '../components/login/login';

function Main() {
  return (
    <MainContainer>
      <Initial />
      <Login />
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
