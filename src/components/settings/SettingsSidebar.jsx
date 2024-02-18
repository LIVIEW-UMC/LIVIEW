import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

function SettingsSidebar() {
  const location = useLocation();
  return (
    <SettingsSidebarContainer>
      <Contact to="/profile" className={location.pathname === '/profile' ? 'selected' : ''} hoverEffect>
        프로필 수정
      </Contact>
      <Contact to="/record" className={location.pathname === '/record' ? 'selected' : ''} hoverEffect>
        기록 공개여부
      </Contact>
      <Contact to="/clickedpost" className={location.pathname === '/clickedpost' ? 'selected' : ''} hoverEffect>
        조회한 게시물
      </Contact>
      <Contact to="/privacy" className={location.pathname === '/privacy' ? 'selected' : ''} hoverEffect>
        개인정보 및 데이터
      </Contact>
      <Contact to="/service" className={location.pathname === '/service' ? 'selected' : ''} hoverEffect>
        서비스 약관
      </Contact>
    </SettingsSidebarContainer>
  );
}

const SettingsSidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0px 30px 0px 0px;
  box-shadow: 4px -4px 10px 0px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  line-height: 122%;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  gap: 13px;
`;

const Contact = styled(Link)`
  width: max-content;
  height: 34px;
  padding: 5px 10px 5px 5px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #000;
  font-family: 'KNU20TRUTH-Regular';

  ${(props) =>
    props.hoverEffect &&
    css`
      &:hover {
        border-bottom: 2px solid #000;
      }
    `}

  &.selected {
    border-bottom: 2px solid #000;
    color: #000;
  }
`;
export default SettingsSidebar;
