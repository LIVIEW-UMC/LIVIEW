import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
import colors from '../../../styles/colors';

const ProfileEditPage = () => {
  const [profileImage, setProfileImage] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserEmail2, setUserEmail2] = useState('');
  const [isModified, setIsModified] = useState(false);
  const fileInputRef = useRef(null);
  const maxIntroductionLength = 200;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jin-myserver.shop/users/detail', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MDgyNzY2MjksImV4cCI6MTcwODI3NzIyOX0.CZFrBDJRdwKMwArVo9BQzlPKBaREbW44wtntHlqsmd8',
          },
        });
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setProfileImage(data.imgUrl);
        const nameParts = data.name.split('');
        setLastName(nameParts[0]); // 성
        setFirstName(nameParts.slice(1).join(' ')); // 이름
        const emailParts = data.email.split('@');
        setUserEmail(emailParts[0]);
        setUserEmail2(emailParts[1]);
        setIntroduction(data.introduction || '');
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setIsModified(true);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleIntroductionChange = (e) => {
    const inputIntroduction = e.target.value;

    if (inputIntroduction.length <= maxIntroductionLength) {
      setIntroduction(inputIntroduction);
      setIsModified(true); // 소개글이 변경될 때 수정하기 버튼을 활성화
    } else {
      console.log('Introduction exceeds character limit');
      setIsModified(false);
    }
  };

  const handleModify = () => {
    if (isModified) {
      // 수정된 데이터가 있을 때만 서버로 데이터를 전송
      fetch('https://jin-myserver.shop/users/myInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MDgyNzY2MjksImV4cCI6MTcwODI3NzIyOX0.CZFrBDJRdwKMwArVo9BQzlPKBaREbW44wtntHlqsmd8',
        },
        body: JSON.stringify({
          userProfile: {
            introduction,
          },
          file: profileImage !== null ? profileImage : undefined,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버에 데이터를 보내는데 실패했습니다.');
          }
          console.log('서버에 데이터 전송 성공!');
          setIsModified(false); // 수정 후 수정 여부를 false로 초기화
        })
        .catch((error) => {
          console.error('서버에 데이터 전송 오류:', error);
        });
    }
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
            <ContentText>사진</ContentText>
            <ProfileImage src={profileImage} alt="Profile" />
          </ImageContainer>
          <ChangeImageButton onClick={openFileExplorer}>변경</ChangeImageButton>
        </ProfileImageContainer>
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
        <NameContainer>
          <NameContainer1>
            <ContentText>이름</ContentText>
            <NameInput
              type="text"
              defaultValue={firstName}
              readOnly
              // onChange={handleFirstNameChange}
              // onClick={handleFirstNameClick}
              // onBlur={() => {
              //   if (firstName === '') setFirstName('');
              // }}
            />
          </NameContainer1>
          <NameContainer2>
            <ContentText>성</ContentText>
            <LastNameInput
              type="text"
              defaultValue={lastName}
              readOnly
              // onChange={handleLastNameChange}
              // onClick={handleLastNameClick}
              // onBlur={() => {
              //   if (lastName === '') setLastName('');
              // }}
            />
          </NameContainer2>
        </NameContainer>
        <IntroductionContainer>
          <ContentText>소개</ContentText>
          <IntroductionInput
            defaultValue={introduction}
            onChange={handleIntroductionChange}
            placeholder="회원님의 이야기를 작성해주세요!! (200자 이내)"
            onClick={() => setIntroduction('')}
          />
        </IntroductionContainer>
        <EmailContainer>
          <ContentText>사용자 이메일</ContentText>
          <EmailInputContainer>
            <UserEmailInput1 type="text" value={UserEmail} readOnly />
            <AtSymbol>@</AtSymbol>
            <UserEmailInput2 type="text" value={UserEmail2} readOnly />
          </EmailInputContainer>
        </EmailContainer>
        <ModifyButton onClick={handleModify} style={{ backgroundColor: isModified ? '#2655FF' : '#dcdcdc' }}>
          수정하기
        </ModifyButton>
      </Container>
    </All>
  );
};
const All = styled.div`
  display: flex;
  font-family: 'KNU20TRUTH-Regular';
  justify-content: center;
  position: relative;
  min-height: calc(100vh - 62px);
`;

const Container = styled.div`
  width: 777px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 5vh 0px;
`;

const ProfileTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tilte = styled.div`
  display: flex;
  font-size: 30px;
`;

const Content = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 15px;
  color: #939393;
`;

const ContentText = styled.div`
  margin-bottom: 8px;
  font-size: 15px;
  color: black;
`;

const ImageContainer = styled.div`
  display: block;
  margin-right: 21px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChangeImageButton = styled.div`
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: #e1e1e1;
  color: black;
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const NameContainer1 = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
`;

const InputBaseStyles = `
    height: 38px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1.5px solid #909090;
    font-family: KNU20TRUTH-Regular;
`;

const NameInput = styled.input`
  ${InputBaseStyles}
  color: #939393;
  width: 220px;
  padding-left: 10px;
`;

const LastNameInput = styled.input`
  ${InputBaseStyles}
  color: #939393;
  width: 220px;
  padding-left: 10px;
`;

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #333;
`;

const IntroductionInput = styled.textarea`
  ${InputBaseStyles}
  height: 140px;
  color: ${(props) => (props.value === '회원님의 이야기를 작성해주세요!! (200자 이내)' ? '#939393' : '#000')};
  padding: 10px;
  width: 453px;
  resize: none;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInputContainer = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
  gap: 5px;
`;

const UserEmailInput1 = styled.input`
  ${InputBaseStyles}
  color: #939393;
  width: 224px;
  padding-left: 10px;
  border:;
`;

const UserEmailInput2 = styled.input`
  ${InputBaseStyles}
  color: #939393;
  width: 195px;
  padding-left: 10px;
`;

const AtSymbol = styled.div`
  color: ${colors.gray};
`;

const ModifyButton = styled.button`
  font-family: KNU20TRUTH-Regular;
  width: max-content;
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: #e1e1e1;
  color: black;
  cursor: pointer;
  align-self: flex-end;
`;

export default ProfileEditPage;
