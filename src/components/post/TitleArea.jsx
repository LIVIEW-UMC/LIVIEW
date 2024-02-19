import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import colors from '../../styles/colors';
import Photo2 from '../../assets/icon/Photo2';
import CloseButton2 from '../../assets/icon/CloseButton2';
import TimeDiff from '../../utils/TimeDiff';

function TitleArea({ Event, User, TourData, thumbnailDate }) {
  const date = new Date(`${thumbnailDate.createdAt}Z`);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const localDate = date.toLocaleDateString(undefined, options);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <TitleContainer imageURL={thumbnailDate.imageUrl}>
      <TitleImgNum>
        <Title>{TourData.title}</Title>
        <IconContainer>
          <Photo2 />
          <PostInfo>{TourData.imgList.length}</PostInfo>
        </IconContainer>
      </TitleImgNum>
      <PostDate>{localDate}</PostDate>
      <CloseButtonContainer onClick={handleGoBack}>
        <CloseButton2 />
      </CloseButtonContainer>
      <UserImg src={User.imgUrl} alt="profileImg" />
      <TagContainer>
        {TourData.hashtag.map((data) => (
          <Tag>{data}</Tag>
        ))}
      </TagContainer>
      <SaveButtom onClick={Event}>저장</SaveButtom>
      <Day>{TimeDiff(thumbnailDate.createdAt)}</Day>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  min-height: 175px;
  position: relative;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const TitleImgNum = styled.div`
  height: 20px;
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 20px;
  left: 40px;
  gap: 25px;
`;

const Title = styled.div`
  height: 20px;
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
`;

const IconContainer = styled.div`
  height: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PostInfo = styled.div`
  height: 15px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
`;

const PostDate = styled.div`
  height: 13px;
  position: absolute;
  top: 50px;
  left: 40px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
`;

const CloseButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  position: absolute;
  bottom: 20px;
  left: 40px;
`;

const TagContainer = styled.div`
  height: 16px;
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 20px;
  left: 125px;
`;

const Tag = styled.div`
  height: 16px;
  padding: 2px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${colors.mainColor};
`;
const SaveButtom = styled.div`
  height: 15px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${colors.mainColor};
  cursor: pointer;
`;
const Day = styled.div`
  height: 13px;
  position: absolute;
  bottom: 20px;
  right: 80px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
`;

export default TitleArea;
