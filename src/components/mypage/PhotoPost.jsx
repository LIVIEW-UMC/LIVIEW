import React, { useState } from 'react';
import styled from 'styled-components';
import Photo from '../../assets/icon/Photo';
import colors from '../../styles/colors';
import Arrow from '../../assets/icon/Arrow';

function PhotoPost({ photosrc, alt }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <PostContainer onMouseEnter={handleHover} onMouseLeave={handleLeave} Hover={isHovered}>
      <StyledImageContainer>
        <StyledImage src={photosrc} alt={alt} />
        {isHovered ? (
          <StyledOverlay>
            지도 보러가기 <Arrow />
          </StyledOverlay>
        ) : null}
      </StyledImageContainer>
      <PostTitle>소세지 여행</PostTitle>
      <PostInfoContainer>
        <IconContainer>
          <Photo />
          <PostInfo>8</PostInfo>
        </IconContainer>
        <PostInfo>20분전</PostInfo>
      </PostInfoContainer>
    </PostContainer>
  );
}
const PostContainer = styled.div`
  width: 153px;
  height: 174.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 6.07px;
  border: 1px dotted;
  border-color: ${({ Hover }) => (Hover ? 'gary' : 'transparent')};
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 153px;
  height: 139px;
  border-radius: 6.07px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  gap: 5px;
  display: flex;
  justify-content: center;
  padding-top: 110px;
  box-sizing: border-box;
  color: white;
  background-color: rgba(154, 154, 154, 0.8);
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

const PostTitle = styled.div`
  width: 153px;
  height: 12px;
  margin: 3.5px;
  display: flex;
  align-items: baseline;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

const PostInfoContainer = styled.div`
  width: 153px;
  height: 16.5px;
  padding: 6.5px 3.64px 0px 3.64px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  gap: 2.5px;
`;

const PostInfo = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 8px;
  font-weight: 600;
  line-height: 10px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.postInfoColor};
`;
export default PhotoPost;
