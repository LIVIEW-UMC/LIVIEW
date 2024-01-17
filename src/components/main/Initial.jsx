import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import colors from '../../styles/colors';
import homeRoute from '../../assets/homeRoute.png';
import homeMap from '../../assets/homeMap.png';
import DownArrow from '../../assets/icon/DownArrow';

const imageContext = require.context('../../assets/main', false, /\.(png)$/);

function Initial() {
  const images = imageContext.keys().map(imageContext);

  const [isButtonVisible, setButtonVisible] = useState(true);

  const downTargetRef = useRef(null);

  const downBtnClick = () => {
    downTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setButtonVisible(false);
    }, 1500);
  };

  const UpBtnClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      setButtonVisible(true);
    }, 1500);
  };

  useEffect(() => {
    window.scroll(0, 0);
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        e.preventDefault();
        downBtnClick();
      } else if (e.deltaY < 0) {
        e.preventDefault();
        UpBtnClick();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <InitialContainer>
      <Introduction>
        <PerLine>
          사진을
          <Accent>&nbsp;업로드</Accent>
          하고 사진이 찍혔던
        </PerLine>
        <PerLine>
          <Accent>장소</Accent>를 한 눈에 보세요
        </PerLine>
        <HomeRoute src={homeRoute} alt="경로 이미지" />
        <HomeMap src={homeMap} alt="지도 이미지" />
      </Introduction>
      <GalleryContainer>
        <MasonryInfiniteGrid column={6} gap={21} defaultDirection={'end'} align={'justify'} threshold={1000} style={{ width: '1251px' }}>
          {images.map((image, index) => (
            <GalleryItem
              key={index + 1}
              src={image}
              alt={`img-${index}`}
              style={{
                paddingTop: index === 1 || index === 4 ? '109px' : index === 2 || index === 3 ? '203px' : '0px',
              }}
            />
          ))}
          {images.map((image, index) => (
            <GalleryItem key={index + 1} src={image} alt={`img-${index}`} />
          ))}
          {images.map((image, index) => (
            <GalleryItem key={index + 1} src={image} alt={`img-${index}`} />
          ))}
        </MasonryInfiniteGrid>
      </GalleryContainer>
      {isButtonVisible && (
        <DownBtn onClick={downBtnClick}>
          <DownArrow />
        </DownBtn>
      )}
      <JoinIntroduction ref={downTargetRef}>
        <PerLine>가입하여 더 많은</PerLine>
        <PerLine>기록을 자동으로</PerLine>
        <PerLine>남겨보세요</PerLine>
      </JoinIntroduction>
      <Shadow />
    </InitialContainer>
  );
}

const InitialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Introduction = styled.div`
  width: 603px;
  margin-top: 100px;
  font-family: JalnanGothicTTF-Regular;
  font-size: 40px;
  line-height: 159%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 128px;
`;

const PerLine = styled.div`
  display: flex;
`;

const Accent = styled.div`
  color: ${colors.mainColor};
`;

const HomeRoute = styled.img`
  width: 1151px;
  position: absolute;
  top: 60px;
  z-index: -1;
`;

const HomeMap = styled.img`
  width: 325px;
  position: absolute;
  top: 200px;
`;

const GalleryContainer = styled.div`
  height: 1500px;
  overflow: hidden;
`;
const GalleryItem = styled.img`
  width: 191px;
  margin-bottom: 21px;
  border-radius: 15px;
`;

const DownBtn = styled.div`
  position: fixed;
  bottom: 20px;
  z-index: 1;
`;

const Shadow = styled.div`
  width: 100vw;
  height: 1500px;
  background: linear-gradient(180deg, rgba(41, 41, 41, 0) 0%, #292929b2 30%);
  position: absolute;
  bottom: 0px;
`;

const JoinIntroduction = styled.div`
  font-family: JalnanGothicTTF-Regular;
  font-size: 40px;
  line-height: 181%;
  letter-spacing: 3.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: absolute;
  top: 800px;
  left: 140px;
  padding-top: 300px;
  z-index: 1;
`;

export default Initial;
