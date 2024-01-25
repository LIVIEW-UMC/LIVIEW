import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
import basicImage from '../../../assets/profile/basic.png';

const ProfileEditPage = () => {
  const [profileImage, setProfileImage] = useState(basicImage);
  const [name, setName] = useState('민서'); // 기본값으로 설정
  const [lastName, setLastName] = useState('김'); // 기본값으로 설정
  const [introduction, setIntroduction] = useState('회원님의 이야기를 작성해주세요!! (200자 이내)');
  const [UserEmail, setUserEmail] = useState('l50227697');
  const [UserEmail2, setUserEmail2] = useState('gmail.com');
  const fileInputRef = useRef(null);
  const maxIntroductionLength = 200;

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
    const inputIntroduction = e.target.value;

    if (inputIntroduction.length <= maxIntroductionLength) {
      setIntroduction(inputIntroduction);
    } else {
      // Display a warning or handle exceeding character limit as needed
      console.log('Introduction exceeds character limit');
    }
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserEmailChange2 = (e) => {
    setUserEmail2(e.target.value);
  };

  const handleModify = () => {
    // Add logic to save the changes
    console.log('Changes saved!');
  };

  return (
    <All>
      <SettingsSidebar />
      <Container>
        <ProfileTitleContainer>
          <Tilte>프로필 수정</Tilte>
          <Content>본인의 기록을 비공개로 설정하면 다른사람들이 본인의 게시물을 볼 수 없어요!!</Content>
        </ProfileTitleContainer>
        <ProfileImageContainer>
          <ImageContainer>
            <PhotoText>사진</PhotoText>
            <ProfileImage src={profileImage} alt="Profile" />
          </ImageContainer>
          <ChangeImageButton onClick={openFileExplorer}>변경</ChangeImageButton>
        </ProfileImageContainer>
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
        <NameContainer1>
          <NameText1>이름</NameText1>
          <NameInput
            type="text"
            value={name}
            onChange={handleNameChange}
            onClick={() => setName('')}
            onBlur={() => {
              if (name === '') setName('민서');
            }}
          />
        </NameContainer1>
        <NameContainer2>
          <NameText2>성</NameText2>
          <LastNameInput
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            onClick={() => setLastName('')}
            onBlur={() => {
              if (lastName === '') setLastName('김');
            }}
          />
        </NameContainer2>
        <IntroductionContainer>
          <IntroductionText>소개</IntroductionText>
          <IntroductionInput
            value={introduction}
            onChange={handleIntroductionChange}
            onClick={() => setIntroduction('')}
            onBlur={() => {
              if (introduction === '') setIntroduction('회원님의 이야기를 작성해주세요!! (200자 이내)');
            }}
          />
        </IntroductionContainer>
        <EmailContainer1>
          <EmailText>사용자 이메일</EmailText>
          <UserEmailInput1
            type="text"
            value={UserEmail}
            onChange={handleUserEmailChange}
            onClick={() => setUserEmail('')}
            onBlur={() => {
              if (UserEmail === '') setUserEmail('l50227697');
            }}
          />
        </EmailContainer1>
        <SymbolContainer>
          <AtSymbol>@</AtSymbol>
        </SymbolContainer>
        <EmailContainer2>
          <UserEmailInput2
            type="text"
            value={UserEmail2}
            onChange={handleUserEmailChange2}
            onClick={() => setUserEmail2('')}
            onBlur={() => {
              if (UserEmail2 === '') setUserEmail2('gmail.com');
            }}
          />
        </EmailContainer2>
        <ModifyButton onClick={handleModify}>수정하기</ModifyButton>
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
  margin-bottom: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileTitleContainer = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 60px;
`;

const Tilte = styled.div`
  display: block;
  margin-top: 10px;
  font-size: 30px;
`;

const Content = styled.div`
  display: block;
  margin-top: 10px;
  font-size: 15px;
  color: #939393;
`;

const PhotoText = styled.div`
  display: block;
  top: 10px;
  margin-top: 40px;
  margin-bottom: 10px;
  margin-left: 8px;
  color: #464646;
`;

const ImageContainer = styled.div`
  display: block;
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
  font-size: 16px;
  margin-top: 100px;
  margin-left: 12px;
  
`;

const NameContainer1 = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 40px;
`;
const NameContainer2 = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 20px;
  margin-left: 10px;
`;

const NameText1 = styled.div`
  display: block;
  padding-left: 10px;
  color: #464646;
`;

const NameText2 = styled.div`
  display: block;
  color: #464646;
  padding-left: 8px;
`;

const InputBaseStyles = `
  display: flex;
  border: 1px solid #ccc;
  padding: 8px;
  margin-top: 10px;
`;

const NameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '민서' ? '#939393' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 220px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const LastNameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '김' ? '#939393' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 220px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const IntroductionContainer = styled.div`
  top: 120px;
  left: 0;
  right: 0;
  font-size: 15px;
  color: #333;
  margin-top: 50px;
  width: 476px;
  height: 147px;
`;

const IntroductionText = styled.div`
  display: block;
  padding-left: 10px;
  color: #464646;
`;

const IntroductionInput = styled.textarea`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '회원님의 이야기를 작성해주세요!! (200자 이내)' ? '#939393' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  padding: 5px;
  width: 100%;
  height: 80%;
  font-weight: 2px;
  font-size: 16px;
  resize: none;
  font-family: 'KNU20TRUTH-Regular';
`;

const EmailContainer1 = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 10px;
`;

const EmailContainer2 = styled.div`
  display: inline-block;
  gap: 16px;
  margin-top: 10px;
`;

const EmailText = styled.div`
  display: block;
  color: #464646;
  padding-left: 8px;
  margin-top: 20px;
`;

const UserEmailInput1 = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === 'l50227697' ? '#939393' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 220px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const SymbolContainer = styled.div`
  display: inline-block;
  padding: 0 8px;
`;

const AtSymbol = styled.span`
  color: #939393;
`;

const UserEmailInput2 = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === 'gmail.com' ? '#939393' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 200px;
  height: 30px;
  top: 454px;
  left: 411px;
  gap: 10px;
`;

const ModifyButton = styled.button`
  background-color: #DCDCDC;
  border: none;
  padding: 5px, 15px, 5px, 15px
  cursor: pointer;
  border-radius: 10px;
  width: 90px;
  height: 34px;
  display: block;
  text-align: center;
  font-size: 16px;
  margin-top: 30px;
  font-family: 'KNU20TRUTH-Regular';
  margin-left: auto;
  margin-right: 200px;
  margin-bottom: 20px;
`;

export default ProfileEditPage;
