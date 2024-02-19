import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PhotoPost from './PhotoPost';
import GetIncompletedTour from '../../api/GetIncompletedTour';

function PostArea3({ Sort }) {
  const [IncompletedTour, setIncompletedTour] = useState([]);

  useEffect(() => {
    GetIncompletedTour().then((result) => {
      if (Sort === 'option1') {
        setIncompletedTour(result);
      } else if (Sort === 'option2') {
        setIncompletedTour(result.reverse());
      }
    });
  }, [Sort]);

  return (
    <Container>
      <Tap>작성중인 파일</Tap>
      <PostContainer>
        {IncompletedTour.map((data, index) => (
          <Link to={{ pathname: '/createmap', state: data.tourId }}>
            <PhotoPost
              key={index + 1}
              photosrc={data.imageURL}
              alt={`img-${index}`}
              title={data.title}
              size={data.size}
              time={data.localDateTime}
              notSave
            />
          </Link>
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
