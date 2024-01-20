import styled from 'styled-components';
import CreateMapSidebar from '../components/createmap/CreateMapSidebar';

function CreateMap() {
  return (
    <MainContainer>
      <CreateMapSidebar />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 62px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default CreateMap;
