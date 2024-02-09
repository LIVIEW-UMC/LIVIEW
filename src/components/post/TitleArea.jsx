import styled from 'styled-components';
import colors from '../../styles/colors';
import Photo2 from '../../assets/icon/Photo2';
import CloseButton2 from '../../assets/icon/CloseButton2';

function TitleArea({ Event }) {
  return (
    <TitleContainer>
      <TitleImgNum>
        <Title>부산 맛집 사진/동선</Title>
        <IconContainer>
          <Photo2 />
          <PostInfo>8</PostInfo>
        </IconContainer>
      </TitleImgNum>
      <PostDate>2024. 01. 16</PostDate>
      <CloseButtonContainer>
        <CloseButton2 />
      </CloseButtonContainer>
      <UserImg />
      <TagContainer>
        <Tag>asdf</Tag>
        <Tag>부산</Tag>
        <Tag>여행지</Tag>
      </TagContainer>
      <SaveButtom onClick={Event}>저장</SaveButtom>
      <Date>한 달전</Date>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  min-height: 175px;
  position: relative;
  background-color: black;
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
const Date = styled.div`
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
