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
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

export default Posts;
