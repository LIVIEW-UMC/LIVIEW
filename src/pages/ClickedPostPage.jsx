import styled from 'styled-components';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ClickedPost from '../components/settings/ClickedPost/ClickedPost';

function ClickedPostPage() {
  return (
    <SettingsContainer>
      <SettingsSidebar />
      <ClickedPost />
    </SettingsContainer>
  );
}

const SettingsContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100vh;
`;
export default ClickedPostPage;
