import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import OpenArrow from '../../assets/icon/OpenArrow';

function Review() {
  const [open, setOpen] = useState(false);

  const OpenClikck = () => {
    setOpen(!open);
  };
  return (
    <ReviewContainer>
      <Title>후기글</Title>
      <ReviewComment Open={open}>
        <Comment Open={open}>
          {open &&
            `auto: 요소에 정의된 이벤트가 적용됩니다. 이것이 기본값입니다.none: 요소에 어떤 이벤트도 적용되지 않습니다. 요소 위를 마우스가 지나가거나클릭해도 아무런 반응이 없습니다. inherit: 부모 요소의 pointer-events 값을 상속받습니다. initial: 기본값으로 설정합니다. unset: 상속된 값이
            있다면 그 값을 사용하고, 그렇지 않은 경우 initial을 사용합니다. 위에서 언급한 pointer-events: none;은 해당 요소에 마우스 이벤트를 적용하지
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
            있습니다.`}
        </Comment>
      </ReviewComment>
      <ReviewOpenContainer onClick={OpenClikck}>
        <OpenArrow />
      </ReviewOpenContainer>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  width: 840px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(5, 32, 60, 0.5);
`;

const ReviewComment = styled.div`
  width: 100%;
  height: ${({ Open }) => (Open ? '200px' : '0px')};
  transition-property: all;
  transition-duration: 0.5s;
`;

const Comment = styled.div`
  word-break: break-all;
  white-space: pre-wrap;
  width: 750px;
  height: ${({ Open }) => (Open ? '200px' : '0px')};
  margin: ${({ Open }) => (Open ? '45px' : '0px')} 45px;
  opacity: ${({ Open }) => (Open ? 1 : 0)};
  transition-property: all;
  transition-duration: 0.5s;
  pointer-events: ${({ Open }) => (Open ? 'auto' : 'none')};
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReviewOpenContainer = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.div`
  height: 16px;
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 15px;
  left: 35px;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  pointer-events: none;
`;

export default Review;
