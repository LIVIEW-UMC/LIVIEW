import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';

const PrivacyPage = () => {
  const [checkedInputs, setCheckedInputs] = useState({
    disableRecord: false,
    blockEmail: false,
    autoPrivate: false,
  });

  const handleCheckboxChange = (name) => {
    setCheckedInputs((prevValues) => ({
      ...prevValues,
      [name]: !prevValues[name],
    }));
  };

  // 나중에 데이터 삭제 내용 추가
  const handleData = () => {};

  // 나중에 위치정보 다운 내용 추가
  const handleDownload = () => {};

  //   const handleSubmit = () => {
  //     // 여기서 checkboxValues를 서버로 전송하는 로직을 추가할 수 있습니다.
  //     console.log('Sending to server:', checkedInputs);
  //   };

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
            <CheckboxInput type="checkbox" checked={checkedInputs.disableRecord} onChange={() => handleCheckboxChange('disableRecord')} />
            <CheckboxTextWrapper>
              <CheckboxText1>조회한 게시물 기록 비활성화하기</CheckboxText1>
              <CheckboxText2>
                <div>LIVIEW에서 회원님이 확인한 게시물의 데이터를 저장하지 않기를 원하신다면</div>
                <div> 왼쪽 체크박스를 눌러 기록저장기능을 끄십시오.</div>
              </CheckboxText2>
            </CheckboxTextWrapper>
          </CheckboxLabel>

          <br />

          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={checkedInputs.blockEmail} onChange={() => handleCheckboxChange('blockEmail')} />
            <CheckboxTextWrapper>
              <CheckboxText1>이메일 수신 거부</CheckboxText1>
              <CheckboxText2>
                <div>LIVIEW에서 회원님에게 메일을 보낼 수 없게됩니다.</div>
                <div>광고성 메일 혹은 게시물 좋아요, 댓글에 대한 업데이트 알람을 차단합니다.</div>
              </CheckboxText2>
            </CheckboxTextWrapper>
          </CheckboxLabel>

          <br />

          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={checkedInputs.autoPrivate} onChange={() => handleCheckboxChange('autoPrivate')} />
            <CheckboxTextWrapper>
              <CheckboxText1>업로드한 게시물 자동 비공개처리</CheckboxText1>
              <CheckboxText2>
                <div>위 기능을 활성화할 시 회원님이 게시물을 업로드하면</div>
                <div>모든 게시물이 비공개처리되며 회원님만 조회할 수 있습니다.</div>
              </CheckboxText2>
            </CheckboxTextWrapper>
          </CheckboxLabel>

          <br />
        </CheckboxContainer>
        <DataContainer>
          <DataText>데이터 및 계정 삭제</DataText>
          <DataButton onClick={handleData}>데이터 삭제</DataButton>
        </DataContainer>
        <DownloadContainer>
          <DownloadText>본인 위치정보 파일 다운받기</DownloadText>
          <DownloadButton onClick={handleDownload}>다운받기</DownloadButton>
        </DownloadContainer>
      </Container>
    </All>
  );
};

const All = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'KNU20TRUTH-Regular';
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  display: inline-block;
  margin-bottom: 20px;
`;
const TitleContainer = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 60px;
`;
const Title = styled.div`
  display: block;
  gap: 16px;
  margin-top: 10px;
  font-size: 30px;
`;
const Content = styled.div`
  display: block;
  gap: 16px;
  margin-top: 10px;
  font-size: 12px;
  color: #939393;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  margin-top: 40px;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  
  &:checked {
    background-color: #2655FF;
`;

const CheckboxTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CheckboxText1 = styled.div`
  color: #000;
  margin-right: 10px;
`;

const CheckboxText2 = styled.div`
  color: #939393;
  margin-top: 5px;
`;

const DataContainer = styled.div`
  display: flex;
  margin-top: 70px;
  align-items: center;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const DataText = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const DownloadText = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const DownloadContainer = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
`;

const DataButton = styled.div`
  display: flex;
  background-color: #dcdcdc;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 34px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 200px;
  color: #5a5a5a;
`;

const DownloadButton = styled.div`
  display: flex;
  background-color: #dcdcdc;
  border: none;
  border-radius: 10px;
  width: 90px;
  height: 34px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 200px;
  color: #5a5a5a;
`;
export default PrivacyPage;
