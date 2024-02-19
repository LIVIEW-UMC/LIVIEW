import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileArea from '../components/mypage/ProfileArea';
import PostArea1 from '../components/mypage/PostArea1';
import PostArea2 from '../components/mypage/PostArea2';
import PostArea3 from '../components/mypage/PostArea3';
import FollowModal from '../components/mypage/FollowModal';
import colors from '../styles/colors';

function MyPage() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
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
      <div
        style={{
          height: '26px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transitionProperty: 'all',
          transitionDuration: '0.5s',
        }}
      >
        <svg width="26" height="52" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00004 0C3.58146 0 0 3.7189 0 8.30706C0 10.2856 0.669992 12.0997 1.78326 13.5258C2.14211 13.9847 2.74245 14.7074 3.05538 15.2015C4.85725 18.044 7.16889 22.1721 7.84255 25.5599C7.95813 26.1384 8.09744 26.1485 8.24742 25.5787C8.72791 23.752 9.97408 19.7607 12.5476 15.5844C12.8545 15.0863 13.4767 14.3893 13.8629 13.9553C14.4224 13.3262 14.888 12.6059 15.2418 11.8206C15.7242 10.7493 16 9.56339 16 8.30804C16 3.71935 12.4185 0 8.00004 0ZM8.00004 12.7953C5.53382 12.7953 3.53459 10.7194 3.53459 8.15851C3.53459 5.59808 5.53382 3.52222 8.00004 3.52222C10.4663 3.52222 12.4655 5.59817 12.4655 8.15851C12.4655 10.7195 10.4663 12.7953 8.00004 12.7953Z"
            fill={colors.mainColor}
          />
        </svg>
      </div>

      <ProfileArea FollowerClick={followerOpen} FollowingClick={followingOpen} />
      <PostArea>
        <PostArea1 Event={handleOptionSelect} Sort={selectedOption} />
        <PostArea2 Sort={selectedOption} />
        <PostArea3 Sort={selectedOption} />
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
  justify-content: center;
`;

export default MyPage;
