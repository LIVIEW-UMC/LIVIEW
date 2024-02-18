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
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 62px);
`;

export default ClickedPostPage;
