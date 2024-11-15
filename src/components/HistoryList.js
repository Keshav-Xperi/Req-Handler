import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useRequestContext } from '../context/RequestContext';

const HistoryList = () => {
  const { history } = useRequestContext();

  return (
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Request History
        </Typography>
        <List>
          {history.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`URL: ${item.url}`}
                  secondary={`Method: ${item.method}`}
                />
              </ListItem>
              {index < history.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default HistoryList;
