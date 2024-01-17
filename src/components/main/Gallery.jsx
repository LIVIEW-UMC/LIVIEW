import styled from 'styled-components';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function Gallery() {
  const images = imageContext.keys().map(imageContext);

  return (
    <MasonryInfiniteGrid column={5} gap={21} defaultDirection={'end'} align={'justify'} threshold={1000} style={{ width: '1007px' }}>
      {images.map((image, index) => (
        <GalleryItem key={index + 1} src={image} alt={`img-${index}`} />
      ))}
    </MasonryInfiniteGrid>
  );
}

const GalleryItem = styled.img`
  width: 191px;
  margin-bottom: 21px;
  border-radius: 15px;
`;

export default Gallery;
