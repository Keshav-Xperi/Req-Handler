import React from 'react';
import { Box, Stack, Typography, IconButton, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';
import CollectionItem from './CollectionItem';

const CollectionList = ({ collections, onSelectCollection, onAddCollection }) => {
  return (
    <Box sx={{ p: 2, height: '100%', bgcolor: 'white', borderRadius: '8px', boxShadow: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Collections</Typography>
        <IconButton onClick={onAddCollection} color="primary">
          <Add />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2} sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
        {collections.length > 0 ? (
          collections.map((collection, index) => (
            <CollectionItem
              key={index}
              collection={collection}
              onSelect={() => onSelectCollection(collection)}
            />
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No collections added yet.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CollectionList;
