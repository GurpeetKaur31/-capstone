import React from 'react';
import { Button } from '@material-ui/core';

const SocialLogin = ({ provider }) => {
  const handleLogin = () => {   
    const oauthLoginUrl = `https://account.facebook.com/v12.0/dialog.oauth/${provider}`;

    window.location.href = oauthLoginUrl;
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login with {provider}
    </Button>
  );
};

export default SocialLogin;
