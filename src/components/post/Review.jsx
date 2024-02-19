import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import OpenArrow from '../../assets/icon/OpenArrow';

function Review({ contents }) {
  const [open, setOpen] = useState(false);

  const OpenClikck = () => {
    setOpen(!open);
  };
  return (
    <ReviewContainer>
      <Title>후기글</Title>
      <ReviewComment Open={open}>
        <Comment Open={open}>{open && contents}</Comment>
      </ReviewComment>
      <ReviewOpenContainer onClick={OpenClikck}>
        <OpenArrow />
      </ReviewOpenContainer>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  width: 840px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(5, 32, 60, 0.5);
`;

const ReviewComment = styled.div`
  width: 100%;
  height: ${({ Open }) => (Open ? 'auto' : '0px')};
  max-height: 200px;
  transition-property: all;
  transition-duration: 0.5s;
`;

const Comment = styled.div`
  word-break: break-all;
  white-space: pre-wrap;
  width: 750px;
  height: ${({ Open }) => (Open ? 'auto' : '0px')};
  max-height: 200px;
  margin: ${({ Open }) => (Open ? '45px 45px 0px 45px' : '0px 45px')};
  opacity: ${({ Open }) => (Open ? 1 : 0)};
  transition-property: all;
  transition-duration: 0.5s;
  pointer-events: ${({ Open }) => (Open ? 'auto' : 'none')};
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReviewOpenContainer = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.div`
  height: 16px;
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 15px;
  left: 35px;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  pointer-events: none;
`;

export default Review;
