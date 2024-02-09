import styled from 'styled-components';
import FrontFolder from '../../assets/icon/FrontFolder';
import BackFolder from '../../assets/icon/BackFolder';
import colors from '../../styles/colors';

function Folder({ ClickedFile, TapState, onClick, Own = true }) {
  return (
    <Container onClick={onClick}>
      <FolderContainer>
        <FrontContainer Click={ClickedFile}>
          <FilesNum>8</FilesNum>
          <FrontFolder Color={Own ? (TapState ? '#C4D1FF' : '#FFDF8C') : '#D9D9D9'} />
        </FrontContainer>
        <BackFolder Color={Own ? (TapState ? '#7E8FCC' : '#F3B924') : '#999999'} />
      </FolderContainer>
      <FolderName>방문맛집 기록 폴더</FolderName>
    </Container>
  );
}

const Container = styled.div`
  width: 153px;
  height: 140px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const FolderContainer = styled.div`
  width: 153px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  overflow: hidden;
`;

const FrontContainer = styled.div`
  position: absolute;
  top: ${({ Click }) => (Click ? '58px' : '0px')};
  left: 0px;
`;

const FilesNum = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${colors.filesNumColor};
`;

const FolderName = styled.div`
  width: 149px;
  height: 12px;
  margin-top: 7px;
  margin-left: 4px;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;
export default Folder;
