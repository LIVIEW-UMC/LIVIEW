import styled from 'styled-components';
import Posts from './Posts';

function ClickedPost() {
  return (
    <ClickedPostContainer>
      <Title>조회한 게시물 확인 페이지</Title>
      <SubTitle>클릭을 통해 확인한 최근 게시물들이 기록되어 있습니다</SubTitle>
      <ButtonContainer>
        <DeleteAll>전체 삭제하기</DeleteAll>
        <Delete>게시물 3개 삭제</Delete>
      </ButtonContainer>
      <DeleteNum>3개 선택됨</DeleteNum>
      <PostDiv />
      <Posts />
    </ClickedPostContainer>
  );
}

const ClickedPostContainer = styled.div`
  position: absolute;
  margin-left: 410px;
  margin-top: 60px;
`;

const Title = styled.div`
  font-family: 'KNU20TRUTH-Regular';
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
`;

const SubTitle = styled.div`
  margin-top: 8px;
  color: #a4a4a4;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 40px;
`;
const DeleteAll = styled.button`
  padding: 5px 15px;

  margin-right: 20px;

  font-family: 'KNU20TRUTH-Regular';
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;

  border: none;
  border-radius: 10px;
  background: #dcdcdc;
`;

const Delete = styled.button`
  padding: 5px 15px;

  font-family: 'KNU20TRUTH-Regular';
  color: white;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  border: none;
  border-radius: 10px;
  background: #2655ff;
`;

const DeleteNum = styled.div`
  position: absolute;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  margin-left: 415px;
  top: 105px;
`;

const PostDiv = styled.div`
  margin-top: 50px;
`;
export default ClickedPost;