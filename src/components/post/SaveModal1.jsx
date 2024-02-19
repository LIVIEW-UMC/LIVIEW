import styled from 'styled-components';
import colors from '../../styles/colors';
import AddButton from '../../assets/icon/AddButton';
import FolderImg1 from './FolderImg1';
import PostTour from '../../api/PostTour';

function SaveModal1({ Event1, Event2, Event3, tfFolder, tourId, tf }) {
  return (
    <Container>
      <Title>
        저장 <FolderTitle>모든 폴더</FolderTitle>
      </Title>
      <FolderContainer>
        {tfFolder.map((data, index) => (
          <Folder
            onClick={() => {
              Event1();
              Event3();
              PostTour(data.id, tourId);
            }}
          >
            <FolderImgContainer>
              <FolderImg1 tf={tf} />
            </FolderImgContainer>
            <FolderName key={index}>{data.name}</FolderName>
          </Folder>
        ))}
      </FolderContainer>
      <FolderAddButton onClick={Event2}>
        <AddButton />
        폴더 만들기
      </FolderAddButton>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 211px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 1px 2px 4px 5px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  position: absolute;
  top: 170px;
  right: 20px;
  background-color: ${colors.sortBackgroundColor};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 211px;
  height: 50px;
  margin-bottom: 20px;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  position: relative;
`;

const FolderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50px;
  left: 15px;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.whiteGray};
`;

const FolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 211px;
  height: 180px;
  gap: 6px;
  overflow-y: auto;
`;
const Folder = styled.div`
  display: flex;
  align-items: center;
  width: 175px;
  height: 30px;
  margin-left: 12px;
  gap: 10px;
  cursor: pointer;
`;

const FolderImgContainer = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FolderName = styled.div`
  max-width: 135px;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FolderAddButton = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  height: 50px;
  padding-left: 15px;
  gap: 20px;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
`;
export default SaveModal1;
