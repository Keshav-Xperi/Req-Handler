import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

const AppLayout = () => {
  return (
    <Box sx={{ backgroundColor: '#2f2f2f', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" sx={{ backgroundColor: '#424242', padding: '16px', borderRadius: '8px' }}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Postman Clone
        </Typography>

        <Button variant="contained" color="primary" sx={{ width: '100%', padding: '8px 16px' }}>
          Test Button
        </Button>
      </Container>
    </Box>
  );
};

export default AppLayout;
