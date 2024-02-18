import styled from 'styled-components';
import CustomLoginButton from './CustomLoginButton';
import LoginImg from '../../assets/LoginImg';
import LoginLogo from '../../assets/LoginLogo';

function Login() {
  return (
    <LoginContainer>
      <LogoContainer>
        <LoginLogo />
      </LogoContainer>
      <LoginTitle>LIVIEW에 방문하신 것을 환영합니다</LoginTitle>
      <LoginImgContainer>
        <LoginImg />
      </LoginImgContainer>
      <LoginLine />
      <CustomLoginButton />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  position: absolute;
  top: 1000px;
  left: 54vw;

  width: 420px;
  height: 590px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 6.8px 3px rgba(0, 0, 0, 0.25);

  background: linear-gradient(#ffffff 93%, #e9e9e9 50%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin: 3.2vh 0 2.2vh 0;
`;

const LoginTitle = styled.div`
  width: 300px;

  color: #2f2f2f;
  text-align: center;
  font-family: 'JalnanGothicTTF-Regular';
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 4px;
`;

const LoginImgContainer = styled.div`
  margin: 8vh 0 1.5vh 0;
`;

const LoginLine = styled.div`
  width: 320px;
  height: 1px;
  flex-shrink: 0;
  background: #d9d9d9;

  margin-bottom: 1.5vh;
`;

export default Login;
