import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import PostSaveFolder from '../../api/PostSaveFolder';

function SaveModal2({ Event1, Event2, Event3 }) {
  const [name, setName] = useState('');

  return (
    <Container>
      <ContentContainer>
        <Title>새 폴더</Title>
        <NameInput placeholder="제목없는 폴더" value={name} onChange={(e) => setName(e.target.value)} />
        <CloseMakebutton Left={'121px'} onClick={Event1}>
          취소
        </CloseMakebutton>
        <CloseMakebutton
          Left={'160px'}
          onClick={() => {
            Event1();
            PostSaveFolder(name).then((result) => {
              Event3(result);
              if (result === 'error') Event2();
            });
          }}
        >
          만들기
        </CloseMakebutton>
      </ContentContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 210px;
  height: 121px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
  background-color: ${colors.sortBackgroundColor};
`;
const ContentContainer = styled.div`
  display: flex;
  width: 210px;
  height: 121px;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  position: absolute;
  top: 20px;
  left: 15px;
`;
const NameInput = styled.input`
  width: 178px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  position: absolute;
  top: 46px;
  left: 15px;
  border: 0.1px solid;
  border-radius: 5px;
  margin: 0px;
  padding: 0px 5px;
  box-sizing: border-box;
  color: ${(value) => (value === '' ? colors.commentInputColor : '')};
  &:focus {
    outline: none;
  }
`;
const CloseMakebutton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  position: absolute;
  top: 97px;
  left: ${({ Left }) => Left};
  color: ${colors.mainColor};
  cursor: pointer;
`;

export default SaveModal2;
