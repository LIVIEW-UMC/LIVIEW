import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import TitleArea from '../components/post/TitleArea';
import PostArea from '../components/post/PostArea';
import SaveModal1 from '../components/post/SaveModal1';
import SaveModal2 from '../components/post/SaveModal2';
import MapArea from '../components/post/MapArea';

function Post() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <Container>
      <Map>
        <MapArea />
      </Map>
      <CommentContainer>
        <TitleArea Event={() => setModal1((prevState) => !prevState)} />
        <PostArea />
        {modal1 && <SaveModal1 Event={() => setModal2(true)} />}
      </CommentContainer>
      {modal2 && (
        <ModalWrapperr
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              // 클릭된 요소가 ModalWrapper인 경우에만 setModal2(false) 실행
              setModal2(false);
            }
          }}
        >
          <SaveModal2 Event1={() => setModal2(false)} Event2={handleButtonClick} />
        </ModalWrapperr>
      )}
      <CompleteModal visible={visible}>마이페이지에 저장됨</CompleteModal>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Map = styled.div`
  min-width: 600px;
  height: 849px;
  display: flex;
  align-items: center;
  background-color: red;
`;

const CommentContainer = styled.div`
  min-width: 840px;
  height: 849px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
const ModalWrapperr = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const CompleteModal = styled.div`
  width: 202px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-family: KNU20TRUTH-Regular;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${colors.lightBlack};
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition-property: all;
  transition-duration: 0.5s;
  pointer-events: none;
`;
export default Post;
