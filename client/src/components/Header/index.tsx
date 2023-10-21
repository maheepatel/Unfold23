import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ConnectWalletButton from '../ConnectWalletButton';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <ConnectWalletButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;