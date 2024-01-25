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
      <br />
      <Contact to="/record" className={location.pathname === '/record' ? 'selected' : ''} hoverEffect>
        기록 공개여부
      </Contact>
      <br />
      <Contact to="/clickedpost" className={location.pathname === '/clickedpost' ? 'selected' : ''} hoverEffect>
        조회한 게시물
      </Contact>
      <br />
      <Contact to="/privacy" className={location.pathname === '/privacy' ? 'selected' : ''} hoverEffect>
        개인정보 및 데이터
      </Contact>
      <br />
      <Contact to="/service" className={location.pathname === '/service' ? 'selected' : ''} hoverEffect>
        서비스 약관
      </Contact>
    </SettingsSidebarContainer>
  );
}

const SettingsSidebarContainer = styled.div`
  margin-bottom: 10px;
  left: 0;
  width: 150px;
  height: 600px;
  padding: 20px 30px 0px 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  offset-y: 0;
`;

const Contact = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
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
