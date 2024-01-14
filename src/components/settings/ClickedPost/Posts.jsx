import { useState } from 'react';
import styled from 'styled-components';
import check from '../../../assets/icon/check.svg';
import EmptyPost from '../../../assets/icon/EmptyPost.svg';
// import EmptyHole from '../../../assets/icon/EmptyHole.svg';

const imageContext = require.context('../../../assets/dummy', false, /\.(jpg)$/);

function Posts({ onCheckboxChange }) {
  const images = imageContext.keys().map(imageContext);
  const [checkBox, setCheckBox] = useState({});

  // 체크박스 선택 변경, 만약 prev[index]가 true라면, 해당 함수 호출 시 false로 변경
  const handleCheckbox = (index) => {
    setCheckBox((prev) => {
      const updatedCheckBox = {
        ...prev,
        [index]: !prev[index],
      };

      // 선택된 체크박수 개수를 onCheckboxChange로 전달
      const selectedCount = Object.values(updatedCheckBox).filter((isChecked) => isChecked).length;
      onCheckboxChange(selectedCount);

      return updatedCheckBox;
    });
  };

  // 확인한 post가 하나도 없을 때
  if (images.length === 0) {
    return <EmptyPostsContainer>아직 조회한 게시물이 없습니다!</EmptyPostsContainer>;
  }

  return (
    <PostsContainer>
      {images.map((image, index) => (
        <ImagesContainer key={index + 1}>
          <Post src={image} alt={`img-${index}`} />
          <PostsOverlay isChecked={checkBox[index]} />
          <PostsCheckbox onClick={() => handleCheckbox(index)} isChecked={checkBox[index]} />
        </ImagesContainer>
      ))}
    </PostsContainer>
  );
}
const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 820px;
`;

const ImagesContainer = styled.div`
  position: relative;
`;

const PostsOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 95%;
  height: 95%;
  border-radius: 10px;
  background-color: ${({ isChecked }) => (isChecked ? 'rgba(186, 186, 186, 0.5)' : 'transparent')};
`;

const PostsCheckbox = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 180px;
  left: 120px;
  background-color: ${({ isChecked }) => (isChecked ? '#2655FF' : '#989898')};
  border-radius: 5px;
  background-image: url(${check});
  background-size: 70% 70%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Post = styled.img`
  width: 155px;
  height: 216px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const EmptyPostsContainer = styled.div`
  width: 155px;
  height: 216px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  color: #a4a4a4;
  font-family: 'KNU20TRUTH-Regular';
  background-image: url(${EmptyPost});
`;

export default Posts;
