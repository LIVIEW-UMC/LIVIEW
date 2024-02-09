import { useState, useRef } from 'react';
import styled from 'styled-components';
import ImageFile from '../../assets/icon/ImageFile';
import Emoji from '../../assets/icon/Emoji';
import colors from '../../styles/colors';
import userImg from '../../assets/dummy/recent/Ellipse 392 (11).png';

function ReplyInput({ Event1 }) {
  const [comment, setComment] = useState(''); // 기본값으로 설정
  const textarea = useRef();

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto'; // height 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
  };
  return (
    <Container>
      <UserImgInputContainer>
        <UserImg src={userImg} alt="userImg" />
        <InputContainer>
          <CommemtInput
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
          <Emoji />
          <ImageFile />
        </InputContainer>
      </UserImgInputContainer>
      <CommemtButton onClick={Event1}>취소</CommemtButton>
      <CommemtButton onClick={Event1}>작성</CommemtButton>
    </Container>
  );
}
const Container = styled.div`
  width: 670px;
  margin-left: 45px;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 15px;
`;
const UserImg = styled.img`
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserImgInputContainer = styled.div`
  width: 580px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InputContainer = styled.div`
  width: 540px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7.5px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.inputColoer};
`;
const CommemtInput = styled.textarea`
  color: ${(value) => (value === '' ? colors.commentInputColor : '')};
  background-color: ${colors.inputColoer};
  border: none;
  font-family: KNU20TRUTH-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0;
  text-align: left;
  width: 465px;
  max-height: 60px;
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
export default ReplyInput;
