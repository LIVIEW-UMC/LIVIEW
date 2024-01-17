import styled from 'styled-components';

function Login() {
  return <LoginContainer />;
}

const LoginContainer = styled.div`
  position: absolute;
  top: 1080px;
  left: 1050px;

  width: 440px;
  height: 667px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 6.8px 3px rgba(0, 0, 0, 0.25);

  background: linear-gradient(#ffffff 93%, #e9e9e9 50%);
`;
export default Login;
