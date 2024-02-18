import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';

const PrivacyPage = () => {
  const [blockEmailChecked, setBlockEmailChecked] = useState(false);
  const [autoPrivateChecked, setAutoPrivateChecked] = useState(false);
  const [blockEmailSentToServer, setBlockEmailSentToServer] = useState(false);
  const [autoPrivateSentToServer, setAutoPrivateSentToServer] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const sendCheckboxStateToServer = (name, checked) => {
    let endpoint;
    if (name === 'blockEmail') {
      endpoint = 'https://jin-myserver.shop/users/email-approval';
    } else if (name === 'autoPrivate') {
      endpoint = 'https://jin-myserver.shop/users/board-approval';
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcwODEwOTg0NCwiZXhwIjoxNzExNzA5ODQ0fQ.ZfcS8EOZs3MvKauuMCA36TrBcmCgDTmX-02JADV-QXc',
    };

    if (checked && !blockEmailSentToServer && name === 'blockEmail') {
      fetch(endpoint, {
        method: 'PATCH',
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
          }
          console.log('blockEmail 요청 성공');
        })
        .catch((error) => {
          console.error('blockEmail 오류:', error);
        })
        .finally(() => {
          setBlockEmailSentToServer(true);
        });
    }
    if (checked && !autoPrivateSentToServer && name === 'autoPrivate') {
      fetch(endpoint, {
        method: 'PATCH',
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
          }
          console.log('autoPrivate 요청 성공');
        })
        .catch((error) => {
          console.error('autoPrivate 오류:', error);
        })
        .finally(() => {
          setAutoPrivateSentToServer(true);
        });
    }
  };

  const handleCheckboxChange = (name) => {
    if (name === 'blockEmail') {
      setBlockEmailChecked((prev) => !prev);
      sendCheckboxStateToServer(name, !blockEmailChecked);
    } else if (name === 'autoPrivate') {
      setAutoPrivateChecked((prev) => !prev);
      sendCheckboxStateToServer(name, !autoPrivateChecked);
    }
    setIsModified(true);
  };

  const handleDataDeletion = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcwODEwOTg0NCwiZXhwIjoxNzExNzA5ODQ0fQ.ZfcS8EOZs3MvKauuMCA36TrBcmCgDTmX-02JADV-QXc',
    };

    fetch('https://jin-myserver.shop/users/myInfo', {
      method: 'DELETE',
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        console.log('데이터 삭제 성공');
      })
      .catch((error) => {
        console.error('오류:', error);
      });
  };

  const handleModify = () => {
    console.log('변경 사항 저장됨!');
    setIsModified(false);
  };

  return (
    <All>
      <SettingsSidebar />
      <Container>
        <TitleContainer>
          <Title>개인정보 및 데이터</Title>
          <Content>본인의 기록을 비공개로 설정하면 다른 사람들이 본인의 게시물을 볼 수 없어요!!</Content>
        </TitleContainer>
        <CheckboxContainer>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={blockEmailChecked} onChange={() => handleCheckboxChange('blockEmail')} />
            <CheckboxTextWrapper>
              <CheckboxText1>이메일 수신 거부</CheckboxText1>
              <CheckboxText2>
                <div>LIVIEW에서 회원님에게 메일을 보낼 수 없게됩니다.</div>
                <div>광고성 메일 혹은 게시물 좋아요, 댓글에 대한 업데이트 알람을 차단합니다.</div>
              </CheckboxText2>
            </CheckboxTextWrapper>
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={autoPrivateChecked} onChange={() => handleCheckboxChange('autoPrivate')} />
            <CheckboxTextWrapper>
              <CheckboxText1>업로드한 게시물 자동 비공개처리</CheckboxText1>
              <CheckboxText2>
                <div>위 기능을 활성화할 시 회원님이 게시물을 업로드하면</div>
                <div>모든 게시물이 비공개처리되며 회원님만 조회할 수 있습니다.</div>
              </CheckboxText2>
            </CheckboxTextWrapper>
          </CheckboxLabel>
        </CheckboxContainer>
        <DataContainer>
          <DataText>데이터 및 계정 삭제</DataText>
          <DataButton onClick={handleDataDeletion}>데이터 삭제</DataButton>
        </DataContainer>
        <ModifyButton onClick={handleModify} style={{ backgroundColor: isModified ? '#2655FF' : '#dcdcdc' }}>
          저장하기
        </ModifyButton>
      </Container>
    </All>
  );
};

const All = styled.div`
  display: flex;
  font-family: 'KNU20TRUTH-Regular';
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-top: 60px;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 30px;
`;
const Content = styled.div`
  margin-top: 8px;
  font-size: 15px;
  color: #a4a4a4;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: 43px;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding-bottom: 26px;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 18px;
  margin-bottom: 10px;
  
  &:checked {
    background-color: #2655FF;
`;

const CheckboxTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxText1 = styled.div`
  color: #000;
  margin-right: 10px;
`;

const CheckboxText2 = styled.div`
  color: #a4a4a4;
  margin-top: 5px;
  line-height: 122%;
`;

const DataContainer = styled.div`
  display: flex;
  margin-top: 59px;
  align-items: center;
  flex-direction: row;
`;

const DataText = styled.div`
  margin-left: 15px;
  font-size: 20px;
`;

const DataButton = styled.div`
  display: flex;
  background-color: #dcdcdc;
  border: none;
  border-radius: 10px;
  width: 121px;
  height: 34px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-left: 283px;
  color: #5a5a5a;
  cursor: pointer; /* 수정된 부분: 버튼 스타일을 커서로 변경 */
`;

const ModifyButton = styled.button`
  background-color: #2655FF;
  color: #FFFFFF;
  border: none;
  padding: 5px, 15px, 5px, 15px
  cursor: pointer;
  border-radius: 10px;
  width: 99px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 200px;
  font-family: 'KNU20TRUTH-Regular';
  margin-left: auto;
  margin-right: 100px;
  margin-bottom: 251px;
`;

export default PrivacyPage;