import styled from 'styled-components';
import Initial from '../components/main/Initial';

function Main() {
  return (
    <MainContainer>
      <Initial />
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
