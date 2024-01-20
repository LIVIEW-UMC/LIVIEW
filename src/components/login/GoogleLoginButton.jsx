import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const clientId = '585105516148-kdtcnbcgqb077ujtgh9i7lc0s0spr980.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
