import styled from 'styled-components';
import colors from '../styles/colors';
import User from '../assets/User';
import Logo from '../assets/Logo';
import Alarm from '../assets/Alarm';
import MoreOption from '../assets/MoreOption';
import Search from '../assets/Search';

function Nav() {
  return (
    <NavContainer>
      <MainContent>
        <Logo />
        <LogoName>LIVIEW</LogoName>
        <Home>홈</Home>
        <Map>지도 만들기</Map>
      </MainContent>
      <SearchTab>
        <SearchInput type="text" placeholder="검색" />
        <SearchIcon>
          <Search />
        </SearchIcon>
      </SearchTab>
      <Content>
        <ContentItem>
          <Alarm />
        </ContentItem>
        <ContentItem>
          <User />
        </ContentItem>
        <ContentItem>
          <MoreOption />
        </ContentItem>
      </Content>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 62px;
  box-sizing: border-box;
  padding: 8px 17px;
  align-items: center;
`;

const MainContent = styled.div`
  font-family: 'KNU20TRUTH-Regular';
  width: 272px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoName = styled.div`
  font-size: 25px;
  line-height: 15px;
  color: ${colors.mainColor};
`;

const Home = styled.div`
  font-size: 15px;
`;

const Map = styled.div`
  font-size: 15px;
`;

const SearchTab = styled.form`
  position: relative;
`;

const SearchInput = styled.input`
  width: 795px;
  height: 31px;
  padding-left: 50px;
  border-radius: 30px;
  border: none;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  background-color: ${colors.lightGray};
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 144px;
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
