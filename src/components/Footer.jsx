import styled from 'styled-components';
import Youtube from '../assets/icon/Youtube';
import Facebook from '../assets/icon/Facebook';
import Twitter from '../assets/icon/Twitter';
import Instagram from '../assets/icon/Instagram';
import Linkedin from '../assets/icon/Linkedin';
import colors from '../styles/colors';

function Footer() {
  return (
    <FooterContainer>
      <FooterItem>
        <Logo>LIVIEW</Logo>
        <Sns>
          <Youtube />
          <Facebook />
          <Twitter />
          <Instagram />
          <Linkedin />
        </Sns>
      </FooterItem>
      <Hr />
      <FooterItem>
        <Copyright>
          umc_5th @2023.
          <CopyrightName>자동일상기록어플</CopyrightName>
        </Copyright>
        <Contact>
          <div>사이트 담당자</div>
          <div>개발 동기</div>
          <div>연혁</div>
          <div>기타</div>
        </Contact>
      </FooterItem>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 192px;
  padding: 33px;
  background-color: ${colors.mainDarkColor};
  color: white;
  box-sizing: border-box;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  font-family: 'Kavoon-Regular';
  font-size: 50px;
`;

const Sns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 168px;
`;

const Hr = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
`;

const Copyright = styled.div`
  font-family: 'Kavoon-Regular';
  font-size: 18px;
  display: flex;
`;

const CopyrightName = styled.div`
  font-family: 'Pretendard-SemiBold';
`;

const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  width: 470px;
  font-family: 'Pretendard-SemiBold';
`;

export default Footer;
