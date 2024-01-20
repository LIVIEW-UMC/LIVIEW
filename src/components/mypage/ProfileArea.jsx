import styled from 'styled-components';
import colors from '../../styles/colors';
import profileImg from '../../assets/dummy/IMG_0828.jpg';

function ProfileArea() {
  return (
    <ProfileContainer>
      <ProfileImg src={profileImg} alt="profileImg" />
      <ProfileName>이진성</ProfileName>
      <ProfileEmail>l50227697@gmail.com</ProfileEmail>
      <FollowerProfileEditContainer>
        <Follower>팔로워 0</Follower>
        <ProfileEdit>프로필 수정</ProfileEdit>
      </FollowerProfileEditContainer>
    </ProfileContainer>
  );
}
const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const FollowerProfileEditContainer = styled.div`
  width: 164px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px 0px 56px 0px;
`;

const Follower = styled.div`
  width: 52px;
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
`;

const ProfileEdit = styled.div`
  width: 88px;
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
  color: ${colors.followerProfileEditColor};
  background-color: ${colors.profileEditBackgroundColor};
`;

export default ProfileArea;
