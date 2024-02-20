import { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import CommentInput from './CommentInput';
import EmptyHeart from '../../assets/icon/EmptyHeart';
import FilledHeart from '../../assets/icon/FilledHeart';
import PostPostLike from '../../api/PostPostLike';

function CommentInputBox({ User, PostLike, PostId }) {
  const likeNum = 0;
  const [like, setLike] = useState(PostLike === true);

  useEffect(() => {
    setLike(PostLike === true);
  }, [PostLike]);

  return (
    <Container>
      <CommentNumLikeContainer>
        댓글 6개
        <ReplyLikeContainer Width="35px" Gap="3px">
          <LikeContainer
            onClick={() => {
              setLike((prevState) => !prevState);
              PostPostLike(PostId);
            }}
          >
            {like ? <FilledHeart /> : <EmptyHeart />}
          </LikeContainer>
          <Comment Size="13px">{like ? likeNum + 1 : likeNum}</Comment>
        </ReplyLikeContainer>
      </CommentNumLikeContainer>
      <CommentInput User={User} />
      <Line />
    </Container>
  );
}
const Container = styled.div`
  width: 840px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentNumLikeContainer = styled.div`
  width: 100%;
  height: 65px;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0;
  text-align: left;
`;
const Comment = styled.div`
  font-family: KNU20TRUTH-Regular;
  color: ${({ Color }) => Color};
  font-size: ${({ Size }) => Size};
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0;
  text-align: left;
`;
const ReplyLikeContainer = styled.div`
  width: ${({ Width }) => Width};
  max-height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: flex-end;
  gap: ${({ Gap }) => Gap};
`;
const LikeContainer = styled.div`
  max-width: 15px;
  max-height: 15px;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
`;

const Line = styled.div`
  width: 780px;
  height: 2px;
  margin: 20px;

  background-color: ${colors.lineColor};
`;
export default CommentInputBox;
