import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import GetUser from '../../api/GetUser';

const BackgroundContext = require.context('../../assets/background', false, /\.(jpg)$/);

function ProfileArea({ FollowerClick, FollowingClick }) {
  const [User, setUser] = useState([]);

  useEffect(() => {
    GetUser().then((result) => {
      setUser(result);
    });
  }, []);

  const Background = BackgroundContext.keys().map(BackgroundContext);

  const BackgroundNum = User.following % 16;

  return (
    <ProfileContainer>
      <BackgroundImg src={Background[BackgroundNum]} alt="" />
      <ProfileImg src={User.imgUrl} alt="" />
      <ProfileName>{User.name}</ProfileName>
      <ProfileEmail>{User.email}</ProfileEmail>
      <FollowProfileEditContainer>
        <Follow onClick={FollowerClick}>팔로워 {User.follower}</Follow>
        <Follow onClick={FollowingClick}>팔로잉 {User.following}</Follow>
        <Link to="/profile">
          <ProfileEdit>프로필 수정</ProfileEdit>
        </Link>
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
  width: 270px;
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
