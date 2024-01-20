import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import ProfileArea from '../components/mypage/ProfileArea';
import PostArea1 from '../components/mypage/PostArea1';
import PostArea2 from '../components/mypage/PostArea2';
import PostArea3 from '../components/mypage/PostArea3';

function MyPage() {
  const location = useLocation();
  const minBody = location.pathname === '/mypage';

  if (minBody) {
    document.body.style.minWidth = '910px';
  } else {
    document.body.style.minWidth = '';
  }
  return (
    <MyPageContainer>
      <ProfileArea />
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
