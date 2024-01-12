import styled from 'styled-components';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function Posts() {
  const images = imageContext.keys().map(imageContext);

  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <Post key={index + 1} src={image} alt={`img-${index}`} />
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 490px;
`;

const Post = styled.img`
  width: 155px;
  height: 216px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d9d9d9;

  margin-bottom: 10px;
  opacity: 0.8;
`;

export default Posts;
