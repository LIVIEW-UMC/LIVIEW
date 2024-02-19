import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import colors from '../styles/colors';
import TitleArea from '../components/post/TitleArea';
import PostArea from '../components/post/PostArea';
import SaveModal1 from '../components/post/SaveModal1';
import SaveModal2 from '../components/post/SaveModal2';
import MapArea from '../components/post/MapArea';
import GetSaveFolder from '../api/GetSaveFolder';
import GetMyFolder from '../api/GetMyFolder';
import GetUser from '../api/GetUser';
import GetTourDetail from '../api/GetTourDetail';
import GetMyPost from '../api/GetMyPost';
import GetPostId from '../api/GetPostId';
import GetPostLike from '../api/GetPostLike';

function Post() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => prevIndex + 1);
  };
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [SaveFolder, setSaveFolder] = useState([]);
  const [MyFolder, setMyFolder] = useState([]);
  const [PostLike, setPostLike] = useState('false');

  const [TourDetail, setTourDetail] = useState([]);
  const [PostId, setPostId] = useState('');
  const [User, setUser] = useState([]);
  const [MyPost, setMyPost] = useState([]);

  const [PostError, setPostError] = useState('');
  const { tourId } = useParams();

  useEffect(() => {
    GetUser().then((result) => {
      setUser(result);
    });
    GetTourDetail(tourId).then((result) => {
      setTourDetail(result);
    });
    GetPostId(tourId).then((result) => {
      setPostId(result);
    });
    GetMyPost().then((result) => {
      setMyPost(result);
    });
  }, []);

  useEffect(() => {
    GetPostLike(PostId).then((result) => {
      setPostLike(result);
    });
  }, [PostId]);

  useEffect(() => {
    GetSaveFolder().then((result) => {
      setSaveFolder(result);
    });
    GetMyFolder().then((result) => {
      setMyFolder(result);
    });
  }, [PostError]);

  useEffect(() => {
    let timer;

    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  const handleButtonClick = () => {
    setVisible(true);
  };

  let TourData = {
    tourId: null,
    title: null,
    contents: null,
    hashtag: [],
    imgList: [
      {
        createdAt: null,
        updatedAt: null,
        id: null,
        imageUrl: null,
        imageLocation: null,
        date: null,
        latitude: null,
        longitude: null,
        thumbnail: null,
      },
    ],
  };
  let thumbnailDate = {
    createdAt: null,
    updatedAt: null,
    id: null,
    imageUrl: null,
    imageLocation: null,
    date: null,
    latitude: null,
    longitude: null,
    thumbnail: null,
  };
  let metadataList = [{ latitude: null, longitude: null, title: null }];
  if (!(TourDetail.length === 0)) {
    TourData = TourDetail;
    const filteredItem = TourDetail.imgList.filter((item) => item.thumbnail === true);
    thumbnailDate = filteredItem.length > 0 ? filteredItem[0] : {};
    metadataList = TourDetail.imgList.map((data) => ({ latitude: data.latitude, longitude: data.longitude, title: data.imageLocation }));
  }

  let MyPostData = [{ tourId: null }];
  let tf = false;
  if (!(MyPost.length === 0)) {
    MyPostData = MyPost;
    tf = MyPostData.some((data) => data.tourId.toString() === tourId);
  }
  const tfFolder = tf ? MyFolder : SaveFolder;

  if (TourDetail.length === 0) {
    return null;
  }
  return (
    <Container>
      <Map>
        <MapArea metadataList={metadataList} slideIndex={slideIndex} />
      </Map>
      <CommentContainer>
        <TitleArea Event={() => setModal1((prevState) => !prevState)} User={User} TourData={TourData} thumbnailDate={thumbnailDate} />
        <PostArea
          User={User}
          TourData={TourData}
          slideIndex={slideIndex}
          handlePrevSlide={handlePrevSlide}
          handleNextSlide={handleNextSlide}
          PostLike={PostLike}
          PostId={PostId}
        />
        {modal1 && (
          <SaveModal1
            Event1={() => setModal1((prevState) => !prevState)}
            Event2={() => setModal2(true)}
            Event3={handleButtonClick}
            tfFolder={tfFolder}
            tourId={tourId}
            tf={tf}
          />
        )}
      </CommentContainer>
      {modal2 && (
        <ModalWrapperr
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setModal2(false);
            }
          }}
        >
          <SaveModal2 Event1={() => setModal2(false)} Event2={handleButtonClick} Event3={(e) => setPostError(e)} tf={tf} />
        </ModalWrapperr>
      )}
      <CompleteModal visible={visible}>{PostError === 'error' ? '같은 이름의 폴더가 존재합니다' : '마이페이지에 저장됨'}</CompleteModal>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Map = styled.div`
  min-width: 600px;
  height: 849px;
  display: flex;
  align-items: center;
`;

const CommentContainer = styled.div`
  min-width: 840px;
  height: 849px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
const ModalWrapperr = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const CompleteModal = styled.div`
  width: 202px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-family: KNU20TRUTH-Regular;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${colors.lightBlack};
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition-property: all;
  transition-duration: 0.5s;
  pointer-events: none;
`;
export default Post;
