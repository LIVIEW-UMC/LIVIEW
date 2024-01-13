import React, { useState } from 'react';
import styled from 'styled-components';
import check from '../../assets/check.svg';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function Posts() {
  const images = imageContext.keys().map(imageContext);
  const [checkBox, setCheckBox] = useState({});

  const handleCheckbox = (index) => {
    setCheckBox((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <PostsContainer>
      {images.map((image, index) => (
        <ImagesContainer key={index + 1}>
          <Post src={image} alt={`img-${index}`} />
          <PostsCheckbox onClick={() => handleCheckbox(index)} isChecked={checkBox[index]} />
        </ImagesContainer>
      ))}
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 490px;
`;

const ImagesContainer = styled.div`
  position: relative;
`;

const PostsCheckbox = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 180px;
  left: 118px;
  background-color: ${({ isChecked }) => (isChecked ? '#2655FF' : '#989898')};
  border-radius: 5px;
  background-image: url(${check});
  background-size: cover;
  cursor: pointer;
`;

const Post = styled.img`
  width: 155px;
  height: 216px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

export default Posts;
