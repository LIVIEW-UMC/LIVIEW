import { useState, useRef } from 'react';
import styled from 'styled-components';

import colors from '../../styles/colors';

function CommentInput({ User }) {
  const [comment, setComment] = useState('');
  const textarea = useRef();

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
  };
  return (
    <Container>
      <UserImgInputContainer>
        <UserImg src={User.imgUrl} alt="profileImg" />
        <InputContainer>
          <InputArea
            rows={1}
            type="text"
            placeholder="댓글 추가"
            value={comment}
            ref={textarea}
            onChange={(e) => {
              setComment(e.target.value);
              handleResizeHeight();
            }}
          />
        </InputContainer>
      </UserImgInputContainer>
      <CommemtButton>작성</CommemtButton>
    </Container>
  );
}
const Container = styled.div`
  width: 760px;
  display: flex;
  align-items: center;
  gap: 7px;
`;
const UserImg = styled.img`
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserImgInputContainer = styled.div`
  width: 715px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InputContainer = styled.div`
  width: 675px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.inputColoer};
`;
const InputArea = styled.textarea`
  color: ${(props) => (props.value === '' ? colors.commentInputColor : '')};
  background-color: ${colors.inputColoer};
  border: none;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;
  width: 100%;
  max-height: 80px;
  padding: 0px;
  resize: none;
  overflow-y: auto;
  &:focus {
    outline: none;
  }
`;

const CommemtButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 7.5px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.inputColoer};
  color: ${colors.balckGray};
  background-color: ${colors.inputColoer};
  font-family: KNU20TRUTH-Regular;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
`;
export default CommentInput;
