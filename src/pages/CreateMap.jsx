import styled from 'styled-components';
import CreateMapSidebar from '../components/createmap/CreateMapSidebar';
import UploadContent from '../components/createmap/UploadContent';

function CreateMap() {
  return (
    <MainContainer>
      <CreateMapSidebar />
      <UploadContent />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: calc(100vh - 62px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: KNU20TRUTH-Regular;
`;

export default CreateMap;
