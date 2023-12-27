import styled from 'styled-components';
import colors from '../styles/colors';
import Search from '../assets/Search';
import User from '../assets/User';
import Setting from '../assets/Setting';
import Alarm from '../assets/Alarm';
import Map from '../assets/Map';

function Nav() {
  return (
    <NavContainer>
      <Menu>
        <MenuItem>
          <Map />
          <Location>
            울산광역시,
            <br />
            남구 대학로 23
          </Location>
        </MenuItem>
        <MenuItem>
          <div>메인화면</div>
        </MenuItem>
        <MenuItem>
          <div>지도상 표기</div>
        </MenuItem>
      </Menu>
      <Logo>LIVIEW</Logo>
      <Content>
        <ContentItem>
          <Search />
        </ContentItem>
        <ContentItem>
          <User />
        </ContentItem>
        <ContentItem>
          <Setting />
        </ContentItem>
        <ContentItem>
          <Alarm />
        </ContentItem>
      </Content>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 16px 17px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 282px;
  height: 100%;
  font-family: 'Pretendard-SemiBold';
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Location = styled.div`
  margin-left: 8px;
  font-size: 12px;
  color: ${colors.gray};
`;

const Logo = styled.div`
  font-family: 'Kavoon-Regular';
  font-size: 50px;
  color: ${colors.mainColor};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 276px;
  height: 100%;
`;

const ContentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

export default Nav;
