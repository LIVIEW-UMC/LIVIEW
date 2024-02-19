import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import BASE_URL from '../../config/baseUrl';

function AddOptionModal({ setAddOptionModalOpen, folderOptionList, setFolderOptionList }) {
  const [newFolderName, setNewFolderName] = useState('');

  const addFolderOptionHandler = () => {
    if (folderOptionList.includes(newFolderName) || newFolderName === '') {
      return;
    }

    setAddOptionModalOpen(false);

    fetch(`${BASE_URL}/tours/folder?owner=true`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFolderName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('폴더 추가 실패');
        }
        return fetch(`${BASE_URL}/tours/folder?owner=true`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('폴더 가져오기 실패');
        }
        return response.json();
      })
      .then((data) => {
        setFolderOptionList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            addFolderOptionHandler();
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
