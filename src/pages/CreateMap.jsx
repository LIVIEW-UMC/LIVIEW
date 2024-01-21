import styled from 'styled-components';
import CreateMapSidebar from '../components/createmap/CreateMapSidebar';
import colors from '../styles/colors';
import UploadContent from '../components/createmap/UploadContent';

function CreateMap() {
  return (
    <MainContainer>
      <CreateMapSidebar />
      <CreateMapIntroduction>
        <IntroductionTitle>새로운 지도 만들기</IntroductionTitle>
        <IntroductionExplanation>최근에 저장하거나 클릭을 통해 확인한 게시물들이 기록되어 있습니다.</IntroductionExplanation>
      </CreateMapIntroduction>
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

const CreateMapIntroduction = styled.div`
  width: 777px;
  height: 70px;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IntroductionTitle = styled.div`
  font-size: 30px;
  line-height: 122%;
`;

const IntroductionExplanation = styled.div`
  font-size: 15px;
  line-height: 122%;
  color: ${colors.darkGray};
`;

export default CreateMap;
