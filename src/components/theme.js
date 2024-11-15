// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// Light mode theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',  // Set light mode
    primary: {
      main: '#00796b',  // Custom primary color
    },
    secondary: {
      main: '#c2185b',  // Custom secondary color
    },
    background: {
      default: '#fafafa',  // Light background
      paper: '#ffffff',  // Paper color for containers
    },
    text: {
      primary: '#000000',  // Primary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontSize: '1.2rem', // Smaller headings
    },
    body1: {
      fontSize: '0.875rem', // Smaller body text
    },
  },
});

export default theme;
