import styled from 'styled-components';
import colors from '../../styles/colors';
import Review from './Review';
import NextSlide from '../../assets/icon/NextSlide';
import PrevSlide from '../../assets/icon/PrevSlide';

function DateCal(TourDate) {
  const date = new Date(TourDate);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const localDate = date.toLocaleDateString(undefined, options);
  return localDate;
}
function TimeCal(TourDate) {
  const date = new Date(TourDate);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  let period = '오전';
  if (hours >= 12) {
    period = '오후';
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const localTime = `${period}  ${hours}:${minutes}`;
  return localTime;
}
function PostBox({ TourData, slideIndex, handlePrevSlide, handleNextSlide }) {
  return (
    <Container>
      <PostContainer>
        <StyledImageContainer slideIndex={slideIndex}>
          {TourData.imgList.map((data, index) => (
            <div>
              <StyledImageItems>
                <StyledImage key={index + 1} src={data.imageUrl} alt={`img-${index}`} />
              </StyledImageItems>
              <PostInfoContainer>
                <PostInfo>
                  LOCATION
                  <PostInfoComment>
                    {data.imageLocation === null ? null : data.imageLocation.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                  </PostInfoComment>
                </PostInfo>
                <PostInfo>
                  EXIF <PostInfoComment>0232</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  DATE <PostInfoComment>{DateCal(data.date)}</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  TIME <PostInfoComment>{TimeCal(data.date)}</PostInfoComment>
                </PostInfo>
                <PostInfo>
                  LATE, LONG
                  <PostInfoComment>
                    {data.latitude}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.longitude}
                  </PostInfoComment>
                </PostInfo>
              </PostInfoContainer>
            </div>
          ))}
        </StyledImageContainer>
        <StyledImageBackground />
        {!(slideIndex === 0) && (
          <SlideButton onClick={handlePrevSlide} Left={'10px'}>
            <PrevSlide />
          </SlideButton>
        )}
        {!(slideIndex === TourData.imgList.length - 1) && (
          <SlideButton onClick={handleNextSlide} Right={'10px'}>
            <NextSlide />
          </SlideButton>
        )}
        <Review contents={TourData.contents} />
      </PostContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 840px;
  min-height: 514px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 0;
`;
const PostContainer = styled.div`
  width: 840px;
  display: flex;
  position: relative;
`;
const StyledImageContainer = styled.div`
  width: 840px;
  display: flex;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${({ slideIndex }) => `translateX(-${slideIndex * 100}%)`};
`;
const StyledImageItems = styled.div`
  width: 840px;
  height: 450px;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
const StyledImageBackground = styled.div`
  width: 840px;
  height: 450px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: ${colors.mainDarkColor};
  z-index: -1;
  pointer-events: none;
`;
const SlideButton = styled.div`
  position: absolute;
  top: 180px;
  left: ${({ Left }) => Left};
  right: ${({ Right }) => Right};
  cursor: pointer;
`;
const PostInfoContainer = styled.div`
  width: 760px;
  height: 44px;
  display: flex;
  margin: 10px 40px;
  padding: 6px 16px;
  box-sizing: border-box;
  border-radius: 10px;
  gap: 7px;
  background-color: ${colors.siver};
`;

const PostInfo = styled.div`
  height: 32px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.darkSiver};
`;
const PostInfoComment = styled.div`
  height: 18px;
  margin-right: 30px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
`;
export default PostBox;
