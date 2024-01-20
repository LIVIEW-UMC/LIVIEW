import styled from 'styled-components';
import Photo from '../../assets/icon/Photo';
import colors from '../../styles/colors';

function PhotoPost({ photosrc, alt }) {
  return (
    <PostContainer>
      <StyledImage src={photosrc} alt={alt} />
      <PostTitle>소세지 여행</PostTitle>
      <PostInfoContainer>
        <IconContainer>
          <Photo />
          <PostInfo>8</PostInfo>
        </IconContainer>
        <PostInfo>20분전</PostInfo>
      </PostInfoContainer>
    </PostContainer>
  );
}
const PostContainer = styled.div`
  width: 153px;
  height: 173.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 153px;
  height: 139px;
  object-fit: cover;
  border-radius: 6.07px;
  overflow: hidden;
`;

const PostTitle = styled.div`
  width: 153px;
  height: 12px;
  margin: 3px;
  display: flex;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

const PostInfoContainer = styled.div`
  width: 153px;
  height: 16.5px;
  padding: 6.5px 3.64px 0px 3.64px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  gap: 2.5px;
`;

const PostInfo = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 8px;
  font-weight: 600;
  line-height: 10px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.postInfoColor};
`;
export default PhotoPost;
