import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
// import basicImage from '../../../assets/profile/basic.png';

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
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcwODEwOTg0NCwiZXhwIjoxNzExNzA5ODQ0fQ.ZfcS8EOZs3MvKauuMCA36TrBcmCgDTmX-02JADV-QXc',
          },
        });
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setProfileImage(data.imgUrl);
        const nameParts = data.name.split('');
        setLastName(nameParts[0]); // 첫 번째 부분을 성으로 설정
        setFirstName(nameParts.slice(1).join(' ')); // 나머지 부분을 이름으로 설정
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
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    const regex = /^[가-힣]*$/;

    if (inputFirstName !== '' && regex.test(inputFirstName)) {
      setFirstName(inputFirstName);
      setIsModified(true);
    } else if (inputFirstName === '') {
      console.log('이름은 자음+모음으로만 입력 가능합니다.');
      // 사용자가 입력하지 않은 경우, 원래 이름으로 설정
      setFirstName(firstName);
      setIsModified(false);
    }
  };

  const handleFirstNameClick = () => {
    if (firstName === '') {
      setFirstName(firstName);
    }
  };

  const handleLastNameChange = (e) => {
    const inputLastName = e.target.value;
    const regex = /^[가-힣]*$/;

    if (inputLastName !== '' && regex.test(inputLastName)) {
      setLastName(inputLastName);
      setIsModified(true);
    } else if (inputLastName === '') {
      console.log('성은 자음+모음으로만 입력 가능합니다.');
      // 사용자가 입력하지 않은 경우, 원래 성으로 설정
      setLastName(lastName);
      setIsModified(false);
    }
  };

  const handleLastNameClick = () => {
    if (lastName === '') {
      setLastName(lastName);
    }
  };

  const handleIntroductionChange = (e) => {
    const inputIntroduction = e.target.value;

    if (inputIntroduction.length <= maxIntroductionLength) {
      setIntroduction(inputIntroduction);
    } else {
      console.log('Introduction exceeds character limit');
      setIsModified(true);
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
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcwODEwOTg0NCwiZXhwIjoxNzExNzA5ODQ0fQ.ZfcS8EOZs3MvKauuMCA36TrBcmCgDTmX-02JADV-QXc',
        },
        body: JSON.stringify({
          userProfile: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
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
            <PhotoText>사진</PhotoText>
            <ProfileImage src={profileImage} alt="Profile" />
          </ImageContainer>
          <ChangeImageButton onClick={openFileExplorer}>변경</ChangeImageButton>
        </ProfileImageContainer>
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
        <NameContainer>
          <NameContainer1>
            <NameText>이름</NameText>
            <NameInput
              type="text"
              defaultValue={firstName}
              onChange={handleFirstNameChange}
              onClick={handleFirstNameClick}
              onBlur={() => {
                if (firstName === '') setFirstName('');
              }}
            />
          </NameContainer1>
          <NameContainer2>
            <NameText>성</NameText>
            <LastNameInput
              type="text"
              defaultValue={lastName}
              onChange={handleLastNameChange}
              onClick={handleLastNameClick}
              onBlur={() => {
                if (lastName === '') setLastName('');
              }}
            />
          </NameContainer2>
        </NameContainer>
        <IntroductionContainer>
          <IntroductionText>소개</IntroductionText>
          <IntroductionInput
            defaultValue={introduction}
            onChange={handleIntroductionChange}
            placeholder="회원님의 이야기를 작성해주세요!! (200자 이내)"
            onClick={() => setIntroduction('')}
          />
        </IntroductionContainer>
        <EmailContainer1>
          <EmailText>사용자 이메일</EmailText>
        </EmailContainer1>
        <EmailContainer2>
          <UserEmailInput1 type="text" value={UserEmail} readOnly />
          <SymbolContainer>
            <AtSymbol>@</AtSymbol>
          </SymbolContainer>
          <UserEmailInput2 type="text" value={UserEmail2} readOnly />
        </EmailContainer2>
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
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileTitleContainer = styled.div`
  display: flex;
  margin-top: 60px;
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

const PhotoText = styled.div`
  display: flex;
  margin-top: 48px;
  margin-bottom: 8px;
  font-size: 20px;
  color: #464646;
`;

const ImageContainer = styled.div`
  display: block;
  margin-right: 21px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChangeImageButton = styled.div`
  display: flex;
  background-color: #DCDCDC;
  padding: 5px, 15px
  cursor: pointer;
  border-radius: 10px;
  width: 65px;
  height: 34px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 120px;
  
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
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

const NameText = styled.div`
  font-size: 20px;
  padding-left: 2px;
  padding-bottom: 5px;
  color: #4f4f4f;
`;

const InputBaseStyles = `
  display: flex;
  border: 2px solid #939393;
  margin-top: 5px;
`;

const NameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '' ? '#a4a4a4' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 220px;
  height: 38px;
  padding-left: 10px;
`;

const LastNameInput = styled.input`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '' ? '#a4a4a4' : '#000')};
  border-radius: 15px;
  border-width: 2px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 220px;
  height: 38px;
  padding-left: 10px;
`;

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 120px;
  font-size: 15px;
  color: #333;
  margin-top: 49px;
`;

const IntroductionText = styled.div`
  font-size: 20px;
  padding-left: 1px;
  padding-bottom: 5px;
  color: #4f4f4f;
`;

const IntroductionInput = styled.textarea`
  ${InputBaseStyles}
  color: ${(props) => (props.value === '회원님의 이야기를 작성해주세요!! (200자 이내)' ? '#939393' : '#000')};
  display: flex;
  border-radius: 15px;
  padding: 10px;
  width: 453px;
  height: 147px;
  font-size: 15px;
  resize: none;
  font-family: 'KNU20TRUTH-Regular';
`;

const EmailContainer1 = styled.div`
  display: flex;
  color: #4f4f4f;
  padding-left: 2px;
  padding-top: 23px;
  font-size: 20px;
`;

const EmailContainer2 = styled.div`
  display: flex;
  padding-top: 5px;
  flex-direction: row;
`;

const EmailText = styled.div``;

const UserEmailInput1 = styled.input`
  color: #939393;
  border-radius: 15px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 224px;
  height: 40px;
  padding-left: 10px;
`;

const SymbolContainer = styled.div`
  display: flex;
  padding: 9px;
  padding-top: 20px;
`;

const AtSymbol = styled.span`
  color: #939393;
`;

const UserEmailInput2 = styled.input`
  color: #939393;
  border-radius: 15px;
  font-family: 'KNU20TRUTH-Regular';
  font-size: 15px;
  width: 195px;
  height: 40px;
  padding-left: 10px;
`;

const ModifyButton = styled.button`
  display: flex;
  background-color: #DCDCDC;
  border: none;
  padding: 5px, 15px, 5px, 15px
  cursor: pointer;
  border-radius: 10px;
  width: 99px;
  height: 34px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 49px;
  font-family: 'KNU20TRUTH-Regular';
  margin-left: 530px;
  margin-bottom: 143px;
`;

export default ProfileEditPage;