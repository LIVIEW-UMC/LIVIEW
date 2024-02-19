import styled from 'styled-components';
import { useState, useEffect } from 'react'; // useState와 useEffect 훅 임포트
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import colors from '../../styles/colors';
import profile from '../../assets/dummy/IMG_2918.jpg';

function MoreOptionModal({ setMoreOptionModalOpen }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios({
      url: 'https://jin-myserver.shop/users',
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-type': 'application/json',
      },
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);

  const logoutClick = () => {
    axios({
      url: 'https://jin-myserver.shop/auth/logout',
      method: 'Post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-type': 'application/json',
      },
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };
  return (
    <MoreOptionModalContainer
      onClick={() => {
        setMoreOptionModalOpen(false);
      }}
    >
      <Login>
        <Title>현재 로그인 계정</Title>
        {userData && (
          <Link to="/mypage">
            <AccountInfo>
              <Profile src={userData.imgUrl || profile} alt="프로필 사진" />
              <UserInfo>
                <UserName>{userData.name}</UserName>
                <UserEmail>{userData.email}</UserEmail>
              </UserInfo>
            </AccountInfo>
          </Link>
        )}
        <Logout onClick={logoutClick}>로그아웃</Logout>
      </Login>
      <Title>설정 더보기</Title>
      <Settings>
        <Link to="/profile">
          <li>프로필 수정</li>
        </Link>
        <Link to="/record">
          <li>기록 공개 여부</li>
        </Link>
        <Link to="/clickedpost">
          <li>조회한 게시물</li>
        </Link>
        <Link to="/privacy">
          <li>개인정보 및 데이터</li>
        </Link>
        <Link to="/service">
          <li>서비스 약관</li>
        </Link>
      </Settings>
    </MoreOptionModalContainer>
  );
}

const MoreOptionModalContainer = styled.div`
  position: absolute;
  top: 65px;
  right: 20px;
  width: 232px;
  height: 348px;
  padding: 20px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  font-family: KNU20TRUTH-Regular;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: Pretendard-Regular;
  font-size: 15px;
  margin-bottom: 15px;
`;

const AccountInfo = styled.div`
  background-color: ${colors.lightGray};
  border-radius: 10px;
  width: 100%;
  display: flex;
  gap: 5px;
  padding: 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const UserName = styled.div``;

const UserEmail = styled.div`
  color: ${colors.gray};
  font-size: 12px;
  line-height: 122%;
`;

const Logout = styled.div`
  display: flex;
  justify-content: flex-end;
  color: red;
  font-size: 15px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Settings = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 10px;
`;

export default MoreOptionModal;
