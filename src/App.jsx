import React, { useState, useEffect } from 'react'
import { useXrplClient } from './hooks/useXrplClient';
import { useWallet } from './hooks/useWallet';
import './App.css'

function App() {
  const {
    client,
    isConnecting,
    isConnected,
    error: clientError,
    connect,
    disconnect
  } = useXrplClient();

  const {
    wallet,
    isLoading: walletLoading,
    error: walletError,
    getWalletDetails
  } = useWallet();

  // Auto-connect to XRPL Client on mount
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (isConnected && client) {
      getWalletDetails(client);
    }
  }, [isConnected, client, getWalletDetails]);

  if (isConnecting) {
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

  if (walletLoading) {
    return <div>Loading wallet details...</div>;
  }

  if (walletError) {
    return <div>Error loading wallet: {walletError}</div>;
  }

  return (
    <div className="App">
      <h1>XRPL Wallet</h1>

      <div>
        <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
        <button onClick={isConnected ? disconnect : connect}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      {wallet && (
        <div>
          <h2>Wallet Details</h2>
          <p><strong>Address:</strong> {wallet.address}</p>
        </div>
      )}
    </div>
  );
}

export default App;