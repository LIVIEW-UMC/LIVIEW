import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Photo from '../../assets/icon/Photo';
import colors from '../../styles/colors';

function PhotoPost({ photosrc, alt }) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = photosrc;
  }, []);
  return (
    <PostContainer>
      <StyledImageWrapper>
        <StyledImage src={photosrc} alt={alt} width={imageSize.width} height={imageSize.height} />
      </StyledImageWrapper>
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
  width: 251px;
  height: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImageWrapper = styled.div`
  width: 251px;
  height: 228px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled.img`
  width: ${(props) => (props.width < props.height ? '100%' : 'auto')};
  height: ${(props) => (props.width < props.height ? 'auto' : '100%')};
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PostTitle = styled.div`
  width: 245px;
  height: 21px;
  margin: 6px;
  display: flex;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

const PostInfoContainer = styled.div`
  width: 251px;
  height: 27px;
  padding: 11px 6px 0px 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PostInfo = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.postInfoColor};
`;
export default PhotoPost;
