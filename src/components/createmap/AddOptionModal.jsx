import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

function AddOptionModal({ setAddOptionModalOpen, folderOptionList, setFolderOptionList }) {
  const [newFolderName, setNewFolderName] = useState('');
  return (
    <AddOptionModalContainer>
      <div>
        <AddOptionModalTitle>새 폴더</AddOptionModalTitle>
        <AddOptionModalInput
          placeholder="새로운 폴더 이름을 작성해주세요."
          onChange={(e) => {
            setNewFolderName(e.target.value);
          }}
          value={newFolderName}
        />
      </div>
      <AddOptionModalBtnContainer>
        <AddOptionModalBtn
          onClick={() => {
            setAddOptionModalOpen(false);
          }}
        >
          취소
        </AddOptionModalBtn>
        <AddOptionModalBtn
          onClick={() => {
            if (folderOptionList.includes(newFolderName) || newFolderName === '') {
              return;
            }
            setAddOptionModalOpen(false);
            setFolderOptionList((prevFolderOptionList) => prevFolderOptionList.concat(newFolderName));
          }}
        >
          확인
        </AddOptionModalBtn>
      </AddOptionModalBtnContainer>
    </AddOptionModalContainer>
  );
}

const AddOptionModalContainer = styled.div`
  width: 220px;
  height: 130px;
  border-box: box-sizing;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: calc(50% - 65px);
  left: calc(50% - 110px);
  z-index: 3;
`;

const AddOptionModalTitle = styled.div`
  display: flex;
  font-size: 17px;
  line-height: normal;
  letter-spacing: 0.75px;
  padding-bottom: 10px;
`;

const AddOptionModalInput = styled.input`
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 5px;
  border: 0.5px solid ${colors.darkGray};
  font-family: KNU20TRUTH-Regular;
`;

const AddOptionModalBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  font-size: 14px;
  color: ${colors.mainColor};
`;

const AddOptionModalBtn = styled.div`
  cursor: pointer;
`;

export default AddOptionModal;
