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
        <TapItem
          Width="81px"
          TapState={tapState === 'o'}
          onClick={() => {
            setTapState('o');
            setClickedFile('');
          }}
        >
          저장한 게시물
        </TapItem>
        <TapItem
          Width="55px"
          TapState={tapState === 's'}
          onClick={() => {
            setTapState('s');
            setClickedFile('');
          }}
        >
          내 게시물
        </TapItem>
      </Tap>
      <FolderPostContainer>
        <Gap Width="37px" />
        <MainContainer>
          <ClassName>폴더</ClassName>
          <FolderContainer>
            <Folder
              ClickedFile={clickedFile === Name1}
              TapState={tapState === 's'}
              onClick={() => setClickedFile(clickedFile === Name1 ? null : Name1)}
            />
            <Folder
              ClickedFile={clickedFile === Name2}
              TapState={tapState === 's'}
              onClick={() => setClickedFile(clickedFile === Name2 ? null : Name2)}
            />
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
  height: 26px;
  display: flex;
  align-items: flex-end;
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
