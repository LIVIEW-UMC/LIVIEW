import styled from 'styled-components';
import colors from '../../styles/colors';

function AlertModal({ setAlertModalOpen }) {
  return (
    <AlertModalContainer>
      <AlertModalTitle>
        사진은 최대 10장 업로드
        <br /> 가능합니다.
      </AlertModalTitle>
      <AlertModalBtnContainer>
        <AlertModalBtn
          onClick={() => {
            setAlertModalOpen(false);
          }}
        >
          확인
        </AlertModalBtn>
      </AlertModalBtnContainer>
    </AlertModalContainer>
  );
}

const AlertModalContainer = styled.div`
  width: 200px;
  height: 100px;
  border-box: box-sizing;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 100px);
  z-index: 3;
`;

const AlertModalTitle = styled.div`
  display: flex;
  font-size: 17px;
  line-height: normal;
  letter-spacing: 0.75px;
  padding-bottom: 10px;
`;

const AlertModalBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  font-size: 14px;
  color: ${colors.mainColor};
`;

const AlertModalBtn = styled.div`
  cursor: pointer;
`;

export default AlertModal;
