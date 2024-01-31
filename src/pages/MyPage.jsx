import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileArea from '../components/mypage/ProfileArea';
import PostArea1 from '../components/mypage/PostArea1';
import PostArea2 from '../components/mypage/PostArea2';
import PostArea3 from '../components/mypage/PostArea3';
import FollowModal from '../components/mypage/FollowModal';

function MyPage() {
  const [follower, setFollower] = useState(false);

  const followerOpen = () => {
    setFollower(true);
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100vw;
    `;
  };

  const followerClose = () => {
    setFollower(false);
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  const [following, setFollowing] = useState(false);

  const followingOpen = () => {
    setFollowing(true);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
  `;
  };

  const followingClose = () => {
    setFollowing(false);
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  return (
    <MyPageContainer>
      {follower ? <FollowModal Close={followerClose} Title="팔로워" /> : null}
      {following ? <FollowModal Close={followingClose} Title="팔로잉" /> : null}

      <ProfileArea FollowerClick={followerOpen} FollowingClick={followingOpen} />
      <PostArea>
        <PostArea1 />
        <PostArea2 />
        <PostArea3 />
      </PostArea>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const PostArea = styled.div`
  width: 100%;
  display: flex;
`;

export default MyPage;
