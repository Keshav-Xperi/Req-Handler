import React, { useState } from 'react';
import { TextField, Button, Paper, Stack } from '@mui/material';
import { useRequestContext } from '../context/RequestContext';

const CollectionPage = () => {
  const { collections, addCollection } = useRequestContext();
  const [newCollection, setNewCollection] = useState('');

  const handleAddCollection = () => {
    if (newCollection.trim()) {
      addCollection({ name: newCollection });
      setNewCollection('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Stack spacing={2}>
        <TextField
          label="Enter Collection Name"
          value={newCollection}
          onChange={(e) => setNewCollection(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddCollection} variant="contained" color="primary">
          Add Collection
        </Button>

        <Stack spacing={2}>
          {collections.map((collection, index) => (
            <Paper key={index} elevation={3} style={{ padding: '15px' }}>
              <h3>{collection.name}</h3>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default CollectionPage;
