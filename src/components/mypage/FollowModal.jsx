import styled from 'styled-components';
import CloseButton from '../../assets/icon/CloseButton';
import FollowUser from './FollowUser';
import colors from '../../styles/colors';

const imageContext = require.context('../../assets/dummy', false, /\.(jpg)$/);

function FollowModal({ Close, Title }) {
  const images = imageContext.keys().map(imageContext);

  return (
    <ModalBackground onClick={Close}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalTitle>{Title}</ModalTitle>
        <CloseButtonContainer onClick={Close}>
          <CloseButton />
        </CloseButtonContainer>
        <FollowNum>12명</FollowNum>
        <FollowContainer>
          {images.map((image, index) => (
            <FollowUser key={index + 1} photosrc={image} alt={`img-${index}`} />
          ))}
        </FollowContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const ModalContainer = styled.div`
  width: 422px;
  height: 422px;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow-y: hidden;
  background-color: white;
  position: relative;
  z-index: 3;
`;

const ModalTitle = styled.div`
  width: 55px;
  height: 20px;
  margin-top: 16px;
  font-family: KNU20TRUTH-Regular;
  font-size: 20px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

const CloseButtonContainer = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 16px;
  right: 33px;
  cursor: pointer;
`;

const FollowNum = styled.div`
  height: 15px;
  position: absolute;
  top: 45px;
  left: 25px;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.whiteGray};
`;

const FollowContainer = styled.div`
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 72px;
  gap: 7px;
  overflow-y: scroll;
`;

export default FollowModal;
