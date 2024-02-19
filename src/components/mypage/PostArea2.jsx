import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import colors from '../../styles/colors';
import Folder from './Folder';
import PhotoPost from './PhotoPost';
import GetMyFolder from '../../api/GetMyFolder';
import GetSaveFolder from '../../api/GetSaveFolder';
import GetNotClassificationTour from '../../api/GetNotClassificationTour';
import GetMyUserId from '../../api/GetMyUserId';
import GetFolderTour from '../../api/GetFolderTour';

function PostArea2({ Sort }) {
  const [MyFolder, setMyFolder] = useState([]);
  const [SaveFolder, setSaveFolder] = useState([]);
  const [FolderTour, setFolderTour] = useState([]);
  const [NotClassificationTour, setNotClassificationTour] = useState([]);
  const [MyUserId, setMyUserId] = useState(null);

  const [clickedFile, setClickedFile] = useState(null);
  const [tapState, setTapState] = useState('o');
  const PostFolder = tapState === 's' ? MyFolder : SaveFolder;
  const FolderId = PostFolder.filter((data) => data.name === clickedFile).map((data) => data.id);

  useEffect(() => {
    GetMyFolder().then((result) => {
      setMyFolder(result);
    });
    GetSaveFolder().then((result) => {
      setSaveFolder(result);
    });
    GetMyUserId().then((result) => {
      setMyUserId(result);
    });
  }, []);

  useEffect(() => {
    GetNotClassificationTour(MyUserId).then((result) => {
      if (Sort === 'option1') {
        setNotClassificationTour(result);
      } else if (Sort === 'option2') {
        setNotClassificationTour(result.reverse());
      }
    });
  }, [MyUserId, Sort]);

  useEffect(() => {
    GetFolderTour(FolderId, MyUserId).then((result) => {
      if (Sort === 'option1') {
        setFolderTour(result);
      } else if (Sort === 'option2') {
        setFolderTour(result.reverse());
      }
    });
  }, [clickedFile, Sort]);

  return (
    <Container>
      <Tap>
        <TapItem
          Width="81px"
          TapState={tapState === 'o'}
          onClick={() => {
            setTapState('o');
            setClickedFile(null);
          }}
        >
          저장한 게시물
        </TapItem>
        <TapItem
          Width="55px"
          TapState={tapState === 's'}
          onClick={() => {
            setTapState('s');
            setClickedFile(null);
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
            {PostFolder.map((data, index) => (
              <Folder
                key={index + 1}
                ClickedFile={clickedFile === data.name}
                TapState={tapState === 's'}
                Title={data.name}
                onClick={() => setClickedFile(clickedFile === data.name ? null : data.name)}
              />
            ))}
          </FolderContainer>
          {FolderTour.length === 0 ? null : (
            <PostContainer style={{ marginTop: '25px', marginBottom: '25px' }}>
              {FolderTour.map((data, index) => (
                <Link to={`/post/${data.tourId}`}>
                  <PhotoPost
                    key={index + 1}
                    photosrc={data.imageURL}
                    alt={`img-${index}`}
                    title={data.title}
                    size={data.size}
                    time={data.localDateTime}
                  />
                </Link>
              ))}
            </PostContainer>
          )}
          <Line mode="h" style={{ marginLeft: '4px' }} />
          <ClassName>분류되지 않은 사진집</ClassName>
          <PostContainer>
            {NotClassificationTour.map((data, index) => (
              <Link to={`/post/${data.tourId}`}>
                <PhotoPost
                  key={index + 1}
                  photosrc={data.imageURL}
                  alt={`img-${index}`}
                  title={data.title}
                  size={data.size}
                  time={data.localDateTime}
                />
              </Link>
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
  height: 170px;
  gap: 20px;
  display: flex;
  overflow-x: auto;
`;

const PostContainer = styled.div`
  width: 901px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 23px 20px;
`;

export default PostArea2;
