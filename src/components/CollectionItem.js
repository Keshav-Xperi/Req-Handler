import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const CollectionItem = ({ collection, onSelect }) => {
  return (
    <Box
      p={2}
      borderRadius="8px"
      boxShadow={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="white"
      sx={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 3,
        },
      }}
    >
      <Typography variant="body1" noWrap sx={{ flexGrow: 1 }}>
        {collection.name}
      </Typography>
      <Button 
        onClick={onSelect} 
        variant="outlined" 
        color="primary"
        size="small"
        sx={{
          ml: 2,
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.dark',
            color: 'white',
          },
        }}
      >
        Select
      </Button>
    </Box>
  );
};

export default CollectionItem;
