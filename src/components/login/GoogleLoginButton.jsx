import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CustomLoginButton from './CustomLoginButton';

const GoogleLoginButton = () => (
  <GoogleOAuthProvider clientId="585105516148-kdtcnbcgqb077ujtgh9i7lc0s0spr980.apps.googleusercontent.com">
    <CustomLoginButton />
  </GoogleOAuthProvider>
);

export default GoogleLoginButton;
