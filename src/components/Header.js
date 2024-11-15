import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 1201, padding: '4px 16px' }}>
      <Toolbar sx={{ padding: '0' }}>
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 1, fontSize: '1.25rem' }}>
          <HomeIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1rem' }}>
          Xperi Req Handler
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
