import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import EmptyHeart from '../../assets/icon/EmptyHeart';
import FilledHeart from '../../assets/icon/FilledHeart';
import userImg from '../../assets/dummy/recent/Ellipse 392 (11).png';

function Comment({ isReply = true, Event1 }) {
  const [readMore, setReadMore] = useState(true);
  const [like, setLike] = useState(false);
  const likeNum = 0;
  const divRef = useRef(null);
  const [overflowed, setOverflowed] = useState(true);

  useEffect(() => {
    if (divRef.current) {
      const isOverflowed = divRef.current.scrollWidth > divRef.current.clientWidth || divRef.current.scrollHeight > divRef.current.clientHeight;
      setOverflowed(isOverflowed);
    }
  }, []);

  const comment = `값을 급한 pointer-eve값을 사용하고, 그렇지 않은 경우 initial을 사용값을 사용하고, 그렇지 않은 경우 initial을 사용합니다. 위에서 언급한 pointer-events: none;은 해당 요소에 마우스 이벤트를 적용하지
  않음을 의미합니다. 따라서 커서 클릭이나 다른 마우스 이벤트를 무시하도록 할 수 있습니다. 이를 활용하여 사용자가 Comment 컴포넌트를 클릭해도
  아무런 반응이 없도록 설정할 수 있습니다. auto: 요소에 정의된 이벤트가 적용됩니다. 이것이 기본값입니다. none: 요소에 어떤 이벤트도 적용되지
  않습니다. 요소 위를 마우스가 지나가거나 클릭해도 아무런 반응이 없습니다. inherit: 부모 요소의 pointer-events 값을 상속받습니다. initial:
  기본값으로 설정합니다. unset: 상속된 값이 있다면 그 값을 사용하고, 그렇지 않은 경우 initial을 사용합니다. 위에서 언급한 pointer-events:
  none;은 해당 요소에 마우스 이벤트를 적용하지 않음을 의미합니다. 따라서 커서 클릭이나 다른 마우스 이벤트를 무시하도록 할 수 있습니다. 이를
  활용하여 사용자가 Comment 컴포넌트를 클릭해도 아무런 반응이 없도록 설정할 수 있습니다. auto: 요소에 정의된 이벤트가 적용됩니다. 이것이
  기본값입니다. none: 요소에 어떤 이벤트도 적용되지 않습니다. 요소 위를 마우스가 지나가거나 클릭해도 아무런 반응이 없습니다. inherit: 부모
  요소의 pointer-events 값을 상속받습니다. initial: 기본값으로 설정합니다. unset: 상속된 값이 있다면 그 값을 사용하고, 그렇지 않은 경우
  initial을 사용합니다. 위에서 언급한 pointer-events: none;은 해당 요소에 마우스 이벤트를 적용하지 않음을 의미합니다. 따라서 커서 클릭이나
  다른 마우스 이벤트를 무시하도록 할 수 있습니다. 이를 활용하여 사용자가 Comment 컴포넌트를 클릭해도 아무런 반응이 없도록 설정할 수
  있습니다
  있습니다
    있습니다`;
  return (
    <Container isReply={isReply}>
      <UserImg src={userImg} alt="userImg" />
      <CommentContainer isReply={isReply}>
        <UserName>
          오은서
          <KNU20 Color={colors.commentInputColor} style={{ cursor: 'auto' }}>
            20분 전
          </KNU20>
        </UserName>
        <CommentContentContainer>
          <CommentContent ref={divRef} readMore={readMore} isReply={isReply}>
            {comment}
          </CommentContent>
          <ReadMoreButton isReply={isReply}>
            {overflowed ? (
              <KNU20 Color={colors.commentInputColor} onClick={() => setReadMore((prevState) => !prevState)} style={{ width: '26px' }}>
                {readMore ? '더보기' : '간략히'}
              </KNU20>
            ) : (
              <div style={{ minWidth: '26px' }} />
            )}
            <KNU20 Color={colors.balckGray} onClick={Event1}>
              답글 작성
            </KNU20>
            <ReplyLikeContainer Width="50px" Gap="2px">
              <LikeContainer onClick={() => setLike((prevState) => !prevState)}>{like ? <FilledHeart /> : <EmptyHeart />}</LikeContainer>
              <KNU20 Color={colors.commentInputColor} style={{ cursor: 'auto' }}>
                {like ? likeNum + 100 : likeNum}
              </KNU20>
            </ReplyLikeContainer>
          </ReadMoreButton>
        </CommentContentContainer>
      </CommentContainer>
    </Container>
  );
}
const Container = styled.div`
  width: ${({ isReply }) => (isReply ? '715px' : '760px')};
  display: flex;
  margin-bottom: 10px;
`;
const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

const CommentContainer = styled.div`
  width: ${({ isReply }) => (isReply ? '675px' : '720px')};
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UserName = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

const KNU20 = styled.div`
  font-family: KNU20TRUTH-Regular;
  color: ${({ Color }) => Color};
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
`;

const CommentContentContainer = styled.div`
  display: flex;
  position: relative;
`;

const CommentContentReadMore = `
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;`;

const CommentContent = styled.div`
  width: ${({ isReply }) => (isReply ? '495px' : '540px')};
  word-break: keep-all;
  margin: 5px 0px 0px 5px;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  ${({ readMore }) => readMore && CommentContentReadMore};
`;

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  height: 15px;
  gap: 15px;
  position: absolute;
  bottom: 0px;
  left: ${({ isReply }) => (isReply ? '505px' : '550px')};
`;
const ReplyLikeContainer = styled.div`
  width: ${({ Width }) => Width};
  max-height: 10px;
  margin-right: 10px;
  display: flex;
  gap: ${({ Gap }) => Gap};
`;
const LikeContainer = styled.div`
  max-width: 10px;
  max-height: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export default Comment;
