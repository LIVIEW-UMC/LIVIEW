import styled from 'styled-components';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function Gallery() {
  const images = imageContext.keys().map(imageContext);

  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <GalleryItem key={index + 1} src={image} alt={`img-${index}`} />
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 1007px;
  column-count: 5;
`;

const GalleryItem = styled.img`
  width: 191px;
  margin-bottom: 21px;
  border-radius: 15px;
`;

export default Gallery;
