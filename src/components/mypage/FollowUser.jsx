import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

function FollowUser({ photosrc, alt }) {
  const [follow, setFollow] = useState(false);

  const followClikck = () => {
    setFollow(!follow);
  };
  return (
    <FollowUserContainer>
      <UserImg src={photosrc} alt={alt} />
      <UserName>김아영</UserName>
      <FollowButton onClick={followClikck} Follow={follow}>
        {follow ? '팔로우' : '언팔로우'}
      </FollowButton>
    </FollowUserContainer>
  );
}

const FollowUserContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
`;

const UserName = styled.div`
  width: 89px;
  height: 15px;
  left: 75px;
  position: absolute;
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

const FollowButton = styled.div`
  width: fit-content;
  height: 21px;
  right: 20px;
  padding: 4px 7px;
  border-radius: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.sortBackgroundColor};
  background-color: ${({ Follow }) => (Follow ? colors.mainColor : colors.moreWhiteGray)};
  cursor: pointer;
`;

export default FollowUser;
