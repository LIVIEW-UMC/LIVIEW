import styled from 'styled-components';

function SettingsSidebar() {
  return (
    <SettingsSidebarContainer>
      <Contact>프로필 수정</Contact>
      <Contact>기록 공개여부</Contact>
      <Contact>조회한 게시물</Contact>
      <Contact>개인정보 및 데이터</Contact>
      <Contact>서비스 약관</Contact>
    </SettingsSidebarContainer>
  );
}

const SettingsSidebarContainer = styled.div`
  position: absolute;
  width: 160px;
  height: 90vh;
  padding: 20px 30px 0px 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  offset-y: 0;
`;

const Contact = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'KNU20TRUTH-Regular';
`;
export default SettingsSidebar;
