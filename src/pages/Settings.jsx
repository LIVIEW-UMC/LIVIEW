import styled from 'styled-components';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ClickedPost from '../components/settings/ClickedPost';

function Settings() {
  return (
    <SettingsContainer>
      <SettingsSidebar />
      <ClickedPost />
    </SettingsContainer>
  );
}

const SettingsContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
export default Settings;
