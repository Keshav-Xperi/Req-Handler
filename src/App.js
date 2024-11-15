import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';  // MUI imports
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import HistoryList from './components/HistoryList';
import CollectionPage from './pages/CollectionPage';  // Assuming you have a CollectionPage component
import { RequestProvider } from './context/RequestContext';

const theme = createTheme({
  // You can add custom theme settings here
  palette: {
    primary: {
      main: '#00796b', // MUI primary color
    },
    secondary: {
      main: '#c2185b', // MUI secondary color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RequestProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<RequestForm />} />
            <Route path="/history" element={<HistoryList />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </Router>
      </RequestProvider>
    </ThemeProvider>
  );
};

export default App;
