import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileArea from '../components/mypage/ProfileArea';
import Tapbar from '../components/mypage/TapBar';
import PhotoPost from '../components/mypage/PhotoPost';

const imageContext = require.context('../assets/dummy', false, /\.(jpg)$/);

function MyPage() {
  const images = imageContext.keys().map(imageContext);
  const location = useLocation();
  const minBody = location.pathname === '/mypage';

  if (minBody) {
    document.body.style.minWidth = '910px';
  } else {
    document.body.style.minWidth = '';
  }
  const [isSmallWidth, setIsSmallWidth] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = document.getElementById('photoPostContainer').offsetWidth;
      setIsSmallWidth(containerWidth < 789);
    };
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return (
    <MyPageContainer>
      <ProfileArea />
      <Tapbar />
      <MyPageContainer2>
        <PhotoPostGap />
        <PhotoPostGap id="photoPostContainer">
          <PhotoPostContainer isSmallWidth={isSmallWidth}>
            {images.map((image, index) => (
              <PhotoPost key={index + 1} photosrc={image} alt={`img-${index}`} />
            ))}
          </PhotoPostContainer>
        </PhotoPostGap>
        <PhotoPostGap />
      </MyPageContainer2>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const MyPageContainer2 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(40px, 142px) minmax(520px, 789px) minmax(350px, 450px);
`;

const PhotoPostContainer = styled.div`
  max-width: 789px;
  min-width: 520px;
  display: flex;
  flex-wrap: wrap;
  gap: 37px 18px;
  width: ${({ isSmallWidth }) => (isSmallWidth ? '520px' : '789px')};
`;
const PhotoPostGap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyPage;
