import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Review from './Review';
import NextSlide from '../../assets/icon/NextSlide';
import PrevSlide from '../../assets/icon/PrevSlide';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function PostBox() {
  const images = imageContext.keys().map(imageContext);

  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <Container>
      <PostContainer>
        <StyledImageContainer slideIndex={slideIndex}>
          {images.map((image, index) => (
            <div>
              <StyledImageItems>
                <StyledImage key={index + 1} src={image} alt={`img-${index}`} />
              </StyledImageItems>
              <PostInfoContainer>
                <PostInfo>
                  CAMERA <PostInfoComment>iPhone 12</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  EXIF <PostInfoComment>0232</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  DATE <PostInfoComment>2024. 01. 16</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  TIME <PostInfoComment>오전&nbsp;&nbsp;10:20</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  LATE, LONG <PostInfoComment>33; 11; 51.2491&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;126; 17; 40.1791</PostInfoComment>
                </PostInfo>
              </PostInfoContainer>
            </div>
          ))}
        </StyledImageContainer>
        <StyledImageBackground />
        {!(slideIndex === 0) && (
          <SlideButton onClick={handlePrevSlide} Left={'10px'}>
            <PrevSlide />
          </SlideButton>
        )}
        {!(slideIndex === images.length - 1) && (
          <SlideButton onClick={handleNextSlide} Right={'10px'}>
            <NextSlide />
          </SlideButton>
        )}
        <Review />
      </PostContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 840px;
  min-height: 514px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 0;
`;
const PostContainer = styled.div`
  width: 840px;
  display: flex;
  position: relative;
`;
const StyledImageContainer = styled.div`
  width: 840px;
  display: flex;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${({ slideIndex }) => `translateX(-${slideIndex * 100}%)`};
`;
const StyledImageItems = styled.div`
  width: 840px;
  height: 450px;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
const StyledImageBackground = styled.div`
  width: 840px;
  height: 450px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: ${colors.mainDarkColor};
  z-index: -1;
  pointer-events: none;
`;
const SlideButton = styled.div`
  position: absolute;
  top: 180px;
  left: ${({ Left }) => Left};
  right: ${({ Right }) => Right};
  cursor: pointer;
`;
const PostInfoContainer = styled.div`
  width: 760px;
  height: 44px;
  display: flex;
  margin: 10px 40px;
  padding: 6px 16px;
  box-sizing: border-box;
  border-radius: 10px;
  gap: 7px;
  background-color: ${colors.siver};
`;

const PostInfo = styled.div`
  height: 32px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.darkSiver};
`;
const PostInfoComment = styled.div`
  height: 18px;
  margin-right: 30px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
`;
export default PostBox;
