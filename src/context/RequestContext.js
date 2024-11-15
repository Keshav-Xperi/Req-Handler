import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const RequestContext = createContext();

// Create a Provider
export const RequestProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [history, setHistory] = useState([]);

  // Load collections from localStorage
  useEffect(() => {
    const savedCollections = JSON.parse(localStorage.getItem('collections')) || [];
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setCollections(savedCollections);
    setHistory(savedHistory);
  }, []);

  // Save collections to localStorage
  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const addCollection = (collection) => {
    setCollections((prev) => [...prev, collection]);
  };

  const addToHistory = (request) => {
    setHistory((prev) => [...prev, request]);
  };

  return (
    <RequestContext.Provider value={{ collections, addCollection, history, addToHistory }}>
      {children}
    </RequestContext.Provider>
  );
};

// Create a custom hook to use context
export const useRequestContext = () => useContext(RequestContext);
