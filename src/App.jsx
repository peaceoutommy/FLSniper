import React, { useState, useEffect } from 'react'
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useXrplClientContext } from './context/xrplClientContex';
import { useWalletContext } from './context/WalletContext';
import './App.css'

// Pages
import Home from './pages/Home';

// Components
import WalletWidget from './components/layout/WalletWidget';

function App() {
  const { isConnected, error: clientError, connect } = useXrplClientContext();
  const { isLoading: walletLoading, error: walletError, wallet } = useWalletContext();

  if (!isConnected) {
    return <div>Connecting to XRPL...</div>;
  }


  if (clientError) {
    return (
      <div>
        <p>Error connecting to XRPL: {clientError}</p>
        <button onClick={connect}>Retry Connection</button>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <div className='max-w-6xl mx-auto space-y-12'>
        <WalletWidget />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;