import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Comment from './Comment';
import OpenReply from '../../assets/icon/OpenReply';
import CloseReply from '../../assets/icon/CloseReply';
import ReplyInput from './ReplyInput';

function Commentbox() {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyInput, setReplyInput] = useState(false);

  return (
    <Container>
      <Comment isReply={false} Event1={() => setReplyInput(true)} />
      <ButtonContainer Color={colors.commentInputColor} onClick={() => setReplyOpen((prevState) => !prevState)}>
        {replyOpen ? <OpenReply /> : <CloseReply />}
        답글 2
      </ButtonContainer>
      {replyOpen && (
        <ReplyContainer>
          <Comment Event1={() => setReplyInput(true)} />
          <Comment Event1={() => setReplyInput(true)} />
          <Comment Event1={() => setReplyInput(true)} />
        </ReplyContainer>
      )}
      {replyInput && <ReplyInput Event1={() => setReplyInput(false)} />}
    </Container>
  );
}
const Container = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3px;
  margin-left: 45px;
  margin-bottom: 15px;
  font-family: KNU20TRUTH-Regular;
  color: ${({ Color }) => Color};
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
`;
const ReplyContainer = styled.div`
  display: flex;
  margin-left: 45px;
  margin-bottom: 5px;
  flex-direction: column;
`;

export default Commentbox;
