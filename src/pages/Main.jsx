import styled from 'styled-components';
import TabNavigator from '../components/main/TabNavigator';

function Main() {
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
