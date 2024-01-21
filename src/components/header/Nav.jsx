import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import User from '../../assets/icon/User';
import Logo from '../../assets/icon/Logo';
import Alarm from '../../assets/icon/Alarm';
import MoreOption from '../../assets/icon/MoreOption';
import Search from '../../assets/icon/Search';
import SearchModal from './SearchModal';

function Nav() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <NavContainer>
      <MainContent>
        <LogoContainer>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/">
            <LogoName>LIVIEW</LogoName>
          </Link>
        </LogoContainer>
        <Home>홈</Home>
        <Link to="/createmap">
          <Map>지도 만들기</Map>
        </Link>
      </MainContent>
      <SearchTab>
        <SearchInput
          type="text"
          placeholder="검색"
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <SearchIcon>
          <Search />
        </SearchIcon>
        {modalOpen && (
          <>
            <SearchModal />
            <Overlay
              onClick={() => {
                setModalOpen(false);
              }}
            />
          </>
        )}
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoName = styled.div`
  font-size: 25px;
  line-height: 15px;
  color: ${colors.mainColor};
  margin-left: 15px;
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
  position: relative;
  z-index: 2;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 20px;
  z-index: 2;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export default Nav;
