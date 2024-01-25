import { useState } from 'react';
import styled from 'styled-components';
import Posts from './Posts';

function ClickedPost() {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckbox = (count) => {
    setSelectedCount(count);
  };

  // 전제 삭제 (나중에 추가)
  const handleDeleteAll = () => {};

  // 선택한 post 삭제 (나중에 추가)
  const handleDeleteSelected = () => {};

  return (
    <ClickedPostContainer>
      <Title>조회한 게시물 확인 페이지</Title>
      <SubTitle>클릭을 통해 확인한 최근 게시물들이 기록되어 있습니다</SubTitle>
      <DeleteContainer>
        <ButtonContainer>
          <DeleteAll onClick={handleDeleteAll}>전체 삭제하기</DeleteAll>
          {selectedCount > 0 && <Delete onClick={handleDeleteSelected}>{`게시물 ${selectedCount}개 삭제`}</Delete>}
        </ButtonContainer>
        <DeleteNum>{selectedCount > 0 && `${selectedCount}개 선택됨`}</DeleteNum>
      </DeleteContainer>
      <PostDiv />
      <Posts onCheckboxChange={handleCheckbox} />
    </ClickedPostContainer>
  );
}

const ClickedPostContainer = styled.div`
  margin-left: 250px;
  margin-top: 70px;
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

const DeleteContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
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
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  display: flex;
  align-items: flex-end;
`;

const PostDiv = styled.div`
  margin-top: 50px;
`;
export default ClickedPost;
