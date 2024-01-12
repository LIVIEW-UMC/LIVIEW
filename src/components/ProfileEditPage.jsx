import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import basicImage from '../assets/basic.png';

const ProfileEditPage = () => {
  const [profileImage, setProfileImage] = useState(basicImage);
  const [name, setName] = useState('민서'); // 기본값으로 설정
  const [lastName, setLastName] = useState('김'); // 기본값으로 설정
  const [introduction, setIntroduction] = useState('회원님의 이야기를 작성해주세요!!');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  return (
    <Container>
      <ProfileImageContainer>
        <PhotoText>사진</PhotoText>
        <ProfileImage src={profileImage} alt="Profile" />
        <ChangeImageButton onClick={openFileExplorer}>변경</ChangeImageButton>
      </ProfileImageContainer>
      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
      <NameContainer>
        <NameInput
          type="text"
          value={name}
          onChange={handleNameChange}
          onClick={() => setName('')}
          onBlur={() => {
            if (name === '') setName('민서');
          }}
        />
        <LastNameInput
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          onClick={() => setLastName('')}
          onBlur={() => {
            if (lastName === '') setLastName('김');
          }}
        />
      </NameContainer>
      <IntroductionText>
        <IntroductionInput
          value={introduction}
          onChange={handleIntroductionChange}
          onClick={() => setIntroduction('')}
          onBlur={() => {
            if (introduction === '') setIntroduction('회원님의 이야기를 작성해주세요!!');
          }}
        />
      </IntroductionText>
    </Container>
  );
};

const Container = styled.div`
  position: flex;
  display: inline-block;
  flex-direction: column; /* 세로 방향으로 정렬 */
`;
const PhotoText = styled.div`
  position: flex;
  top: 10px; // 상단 여백 조절
  left: 0;
  right: 0;
  font-size: 14px;
  color: #333;
  margin-top: 10px; // 수정된 부분
`;

const ProfileImageContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChangeImageButton = styled.div`
  background-color: #DCDCDC;
  border: none;
  padding: 5px, 15px, 5px, 15px
  cursor: pointer;
  border-radius: 10px;
  width: 65px;
  height: 34px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 15px;
  margin-top: 20px;
  font-family: 'KNU TRUTH TTF';
  
`;

const NameContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const InputBaseStyles = `
  display: flex;
  border: 1px solid #ccc;
  padding: 8px;
  margin-top: 10px;
`;

const NameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '민서' ? '#939393' : 'gray')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU TRUTH TTF';
  font-weight: 2px;
  font-size: 15px;
  font-width: 80px;
  font-height: 18px;
  padding: 10px, 130px, 10px, 10px;
  width: 220px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const LastNameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '김' ? '#939393' : 'gray')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU TRUTH TTF';
  font-weight: 2px;
  font-size: 15px;
  font-width: 80px;
  font-height: 18px;
  padding: 10px, 130px, 10px, 10px;
  width: 220px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const IntroductionText = styled.div`
  top: 120px; // 이름 input 하단에 위치하도록 조절
  left: 0;
  right: 0;
  font-size: 15px;
  color: #333;
  margin-top: 20px;
  width: 476px; /* 고정된 Width 값으로 조절 */
  height: 147px; /* 고정된 Height 값으로 조절 */
`;

const IntroductionInput = styled.textarea`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '회원님의 이야기를 작성해주세요!!' ? '#939393' : 'gray')};
  border-radius: 15px;
  border-width: 2px;
  padding: 8px;
  width: 100%;
  height: 80%;
  font-weight: 2px;
  font-size: 15px;
  resize: none; /* 사용자 조절 비활성화 */
`;

export default ProfileEditPage;
