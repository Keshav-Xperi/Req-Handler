import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Alert,
  AlertTitle,
  Grid,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import { Add, History, Bookmarks, Settings, List, Code, Close, ContentCopy } from '@mui/icons-material';
import axios from 'axios';
import { GENERAL_HEADERS } from '../constants';
import { useRequestContext } from '../context/RequestContext';
import CollectionList from './CollectionList';

const RequestForm = () => {
  const { addToHistory } = useRequestContext();

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState(GENERAL_HEADERS);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [collections, setCollections] = useState([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [showHeaders, setShowHeaders] = useState(true);

  const isValidUrl = (url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);

  const handleHeaderChange = (index, field, value) => {
    setHeaders((prevHeaders) =>
      prevHeaders.map((header, i) =>
        i === index ? { ...header, [field]: value } : header
      )
    );
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);

  const removeHeader = (index) => {
    setHeaders((prevHeaders) => prevHeaders.filter((_, i) => i !== index));
  };

  const handleRequest = async () => {
    if (!isValidUrl(url)) {
      setAlert({ message: 'Invalid URL! Please enter a valid URL.', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const result = await axios({
        url,
        method,
        headers: headers.reduce((acc, { key, value }) => (key ? { ...acc, [key]: value } : acc), {}),
        data: body,
      });

      setResponse(result.data);
      addToHistory({ url, method, response: result.data, timestamp: new Date() });
      setAlert({ message: 'Request was successful!', severity: 'success' });
    } catch (error) {
      setResponse({ error: 'Request failed' });
      setAlert({ message: 'Request failed. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = () => {
    if (url) {
      setCollections((prevCollections) => [
        ...prevCollections,
        { name: url, url }
      ]);
      setAlert({ message: 'URL added to collection!', severity: 'success' });
    }
  };

  const handleToggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleCopyCURL = () => {
    const curlCommand = `curl -X ${method} "${url}" ${headers.map(header => `-H "${header.key}: ${header.value}"`).join(' ')} ${body ? `-d '${body}'` : ''}`;
    navigator.clipboard.writeText(curlCommand).then(() => {
      setAlert({ message: 'CURL command copied to clipboard!', severity: 'success' });
    });
  };

  return (
    <Box display="flex" height="100vh" overflow="hidden" bgcolor="background.default">
      {/* Left Toolbar */}
      <Box
        width="60px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="white"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        p={1}
        sx={{ gap: 2 }}
      >
        <IconButton color="primary">
          <List />
        </IconButton>
        <IconButton color="primary">
          <History />
        </IconButton>
        <IconButton color="primary">
          <Bookmarks />
        </IconButton>
        <IconButton color="primary">
          <Settings />
        </IconButton>
      </Box>

      {/* Collections Sidebar */}
      <Box
        width="300px"
        p={3}
        bgcolor="white"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
      >
        <CollectionList collections={collections} onSelectCollection={(collection) => setUrl(collection.url)} />
      </Box>

      {/* Main Content Area */}
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        p={3}
        sx={{
          maxWidth: rightSidebarOpen ? 'calc(100% - 710px)' : 'calc(100% - 360px)',
          transition: 'max-width 0.3s ease',
        }}
      >
        {/* Alert */}
        {alert.message && (
          <Alert severity={alert.severity} sx={{ mb: 2 }}>
            <AlertTitle>{alert.severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
            {alert.message}
          </Alert>
        )}

        {/* URL Input, Method Selector, and Send/Add to Collection Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          <FormControl sx={{ width: 120 }}>
            <InputLabel>Method</InputLabel>
            <Select value={method} onChange={(e) => setMethod(e.target.value)} label="Method">
              {['GET', 'POST', 'PUT', 'DELETE'].map((method) => (
                <MenuItem key={method} value={method}>{method}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="API URL"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={url && !isValidUrl(url)}
            helperText={url && !isValidUrl(url) ? "Please enter a valid URL." : ""}
            sx={{ flexGrow: 1 }}
          />

          <IconButton color="primary" onClick={handleAddToCollection}>
            <Add />
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            onClick={handleRequest}
            disabled={loading}
            sx={{ ml: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>

          <IconButton color="primary" onClick={handleToggleRightSidebar}>
            <Code />
          </IconButton>
        </Box>

        {/* Header and Body Toggle */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant={showHeaders ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setShowHeaders(true)}
            sx={{ marginRight: 2 }}
          >
            Headers
          </Button>
          <Button
            variant={showHeaders ? 'outlined' : 'contained'}
            color="primary"
            onClick={() => setShowHeaders(false)}
          >
            Body
          </Button>
        </Box>

        {/* Headers/Body Section */}
        <Paper variant="outlined" sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {showHeaders ? (
            <Box>
              <Typography variant="h6" fontWeight="bold">Headers</Typography>
              <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 2 }}>
                {headers.map((header, index) => (
                  <Grid container key={index} spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                      <TextField
                        placeholder="Header Key"
                        value={header.key}
                        onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        placeholder="Header Value"
                        value={header.value}
                        onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removeHeader(index)}>
                        <Close />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" color="primary" onClick={addHeader}>Add Header</Button>
              </Box>
            </Box>
          ) : (
            <FormControl fullWidth margin="normal">
              <TextField
                label="Request Body"
                placeholder="Enter request body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                multiline
                rows={6}
                variant="outlined"
              />
            </FormControl>
          )}
        </Paper>

        {/* Response Display */}
        {response && (
          <Box mt={3} p={2} bgcolor="grey.100" borderRadius="8px" sx={{ maxHeight: 300, overflowY: 'auto' }}>
            <Typography variant="h6" fontWeight="bold">Response</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </Box>
        )}
      </Box>

      {/* Right Sidebar for CURL */}
      <Box
        width={rightSidebarOpen ? '300px' : '0'}
        bgcolor="white"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        position="absolute"
        right="0"
        top="64px" 
        bottom="0"
        transition="width 0.3s ease"
        overflow="hidden"
      >
        <Box p={3}>
          {rightSidebarOpen && (
            <>
              <Typography variant="h9" fontWeight="bold">CURL Command</Typography>
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  curl -X {method} "{url}" {headers.map(header => `-H "${header.key}: ${header.value}"`).join(' ')} {body ? `-d '${body}'` : ''}
                </pre>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" color="primary" onClick={handleCopyCURL}>
                  <ContentCopy /> 
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleToggleRightSidebar}>
                  <Close /> 
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RequestForm;
