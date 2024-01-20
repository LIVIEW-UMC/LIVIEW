import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Folder from './Folder';
import PhotoPost from './PhotoPost';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function PostArea2() {
  const images = imageContext.keys().map(imageContext);
  const [clickedFile, setClickedFile] = useState('');
  const [tapState, setTapState] = useState('o');

  const Name1 = 'qwe';
  const Name2 = 'qwer';

  return (
    <Container>
      <Tap>
        <TapItem Width="120px" TapState={tapState === 'o'} onClick={() => setTapState('o')}>
          다른사용자의 게시물
        </TapItem>
        <TapItem Width="39px" TapState={tapState === 's'} onClick={() => setTapState('s')}>
          저장됨
        </TapItem>
      </Tap>
      <FolderPostContainer>
        <Gap Width="37px" />
        <MainContainer>
          <ClassName>폴더</ClassName>
          <FolderContainer>
            <Folder ClickedFile={clickedFile === Name1} TapState={tapState === 's'} onClick={() => setClickedFile(Name1)} />
            <Folder ClickedFile={clickedFile === Name2} TapState={tapState === 's'} onClick={() => setClickedFile(Name2)} />
          </FolderContainer>
          <Line mode="h" style={{ marginLeft: '4px' }} />
          <ClassName>분류되지 않은 사진집</ClassName>
          <PostContainer>
            {images.map((image, index) => (
              <PhotoPost key={index + 1} photosrc={image} alt={`img-${index}`} />
            ))}
          </PostContainer>
        </MainContainer>
        <Line mode="v" />
      </FolderPostContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 940px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Tap = styled.div`
  width: 940px;
  height: 23px;
  display: flex;
  justify-content: space-evenly;
`;

const TapItem = styled.div`
  min-width: ${({ Width }) => Width};
  max-width: ${({ Width }) => Width};
  height: 23px;
  box-sizing: border-box;
  border-bottom: 2px solid;
  border-color: ${({ TapState }) => (TapState ? null : 'transparent')};
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
`;
const Gap = styled.div`
  min-width: ${({ Width }) => Width};
  max-width: ${({ Width }) => Width};
  height: 100%;
`;

const FolderPostContainer = styled.div`
  width: 940px;
  height: auto;
  display: flex;
`;
const MainContainer = styled.div`
  width: 901px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ClassName = styled.div`
  margin: 26px 0 26px 9px;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
  color: ${colors.classNameColor};
`;

const Line = styled.div`
  width: ${(props) => (props.mode === 'v' ? '2px' : '100%')};
  height: ${(props) => (props.mode === 'h' ? '2px' : 'auto')};
  background-color: ${colors.lineColor};
`;

const FolderContainer = styled.div`
  width: 100%;
  height: 140px;
  margin-bottom: 23px;
  gap: 20px;
  display: flex;
`;

const PostContainer = styled.div`
  width: 901px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 23px 20px;
`;

export default PostArea2;
