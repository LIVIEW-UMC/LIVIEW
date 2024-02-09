import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Folder from '../mypage/Folder';
import PhotoPost from '../mypage/PhotoPost';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function PostArea4() {
  const images = imageContext.keys().map(imageContext);
  const [clickedFile, setClickedFile] = useState('');

  const Name1 = 'qwe';
  const Name2 = 'qwer';

  return (
    <Container>
      <Tap />
      <FolderPostContainer>
        <Gap Width="35px" />
        <MainContainer>
          <ClassName>폴더</ClassName>
          <FolderContainer>
            <Folder ClickedFile={clickedFile === Name1} onClick={() => setClickedFile(clickedFile === Name1 ? null : Name1)} Own={false} />
            <Folder ClickedFile={clickedFile === Name2} onClick={() => setClickedFile(clickedFile === Name2 ? null : Name2)} Own={false} />
          </FolderContainer>
          <Line mode="h" style={{ marginLeft: '4px' }} />
          <ClassName>분류되지 않은 사진집</ClassName>
          <PostContainer>
            {images.map((image, index) => (
              <PhotoPost key={index + 1} photosrc={image} alt={`img-${index}`} />
            ))}
          </PostContainer>
        </MainContainer>
      </FolderPostContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 1240px;
  height: 100%;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Tap = styled.div`
  height: 26px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`;

const Gap = styled.div`
  min-width: ${({ Width }) => Width};
  max-width: ${({ Width }) => Width};
  height: 100%;
`;

const FolderPostContainer = styled.div`
  height: auto;
  display: flex;
`;
const MainContainer = styled.div`
  width: 1205px;
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
  width: 1205px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 23px 20px;
`;

export default PostArea4;
