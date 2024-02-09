import styled from 'styled-components';
import PhotoPost from './PhotoPost';

const imageContext = require.context('../../assets/dummy/popular', false, /\.(png)$/);

function PostArea3() {
  const images = imageContext.keys().map(imageContext);

  return (
    <Container>
      <Tap>작성중인 파일</Tap>
      <PostContainer>
        {images.map((image, index) => (
          <PhotoPost key={index + 1} photosrc={image} alt={`img-${index}`} />
        ))}
      </PostContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 434px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tap = styled.div`
  width: 434px;
  height: 26px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: ${({ Width }) => Width};
  max-width: ${({ Width }) => Width};
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
`;

const PostContainer = styled.div`
  width: 330px;
  height: 100%;
  margin-top: 54px;
  display: flex;
  flex-wrap: wrap;
  gap: 23px 20px;
`;
export default PostArea3;
