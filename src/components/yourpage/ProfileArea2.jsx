import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import profileImg from '../../assets/dummy/IMG_0828.jpg';

function ProfileArea2({ FollowerClick, FollowingClick }) {
  const [follow, setFollow] = useState(false);

  return (
    <ProfileContainer>
      <BackgroundImg src={profileImg} alt="profileImg" />
      <ProfileImg src={profileImg} alt="profileImg" />
      <ProfileName>이진성</ProfileName>
      <ProfileEmail>l50227697@gmail.com</ProfileEmail>
      <FollowProfileEditContainer>
        <Follow onClick={FollowerClick}>팔로워 12</Follow>
        <Follow onClick={FollowingClick}>팔로잉 12</Follow>
        <ProfileEdit onClick={() => setFollow((prevState) => !prevState)} follow={follow}>
          {follow ? '팔로잉' : '팔로우'}
        </ProfileEdit>
      </FollowProfileEditContainer>
    </ProfileContainer>
  );
}
const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const BackgroundImg = styled.img`
  width: 100%;
  height: 230px;
  position: absolute;
  z-index: -1;
  top: 13px;
  object-fit: cover;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  margin: 190px 0px 23px 0px;
`;

const ProfileName = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 30px;
  font-weight: 400;
  line-height: 36.6px;
  letter-spacing: 0;
  text-align: left;
  color: ${colors.profileNameColor};
`;

const ProfileEmail = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
  color: ${colors.profileEmailColor};
`;

const FollowProfileEditContainer = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 17px 0px 53px 0px;
`;

const Follow = styled.div`
  width: 67px;
  height: 18px;
  display: flex;
  align-items: center;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
  color: ${colors.followerProfileEditColor};
  cursor: pointer;
`;

const ProfileEdit = styled.div`
  width: 60px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
  color: ${({ follow }) => (follow ? colors.sortBackgroundColor : '')};
  background-color: ${({ follow }) => (follow ? colors.mainColor : colors.profileEditBackgroundColor)};
  cursor: pointer;
`;

export default ProfileArea2;
