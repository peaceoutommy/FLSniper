import React, { useState, useEffect } from 'react'
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useXrplClient } from './hooks/useXrplClient';
import { useWallet } from './hooks/useWallet';
import './App.css'

// Pages
import Home from './pages/Home';

// Components
import WalletModal from './components/layout/WalletModal';

function App() {
  const root = document.getElementById("root");

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
    getWalletDetails,
    createWallet
  } = useWallet();

  useEffect(() => {
    if (isConnected && client) {
      getWalletDetails(client);
      console.log(wallet)
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
    <BrowserRouter>
      <div className='max-w-6xl mx-auto space-y-12'>
        <WalletModal />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <div className="App">

    //   {wallet && (
    //     <div>
    //       <h2>Wallet Details</h2>
    //       <p><strong>Address:</strong> {wallet.address}</p>
    //       <p><strong>Balance:</strong> {wallet.balanceInXrp} XRP</p>

    //       {/* Wallet seed comes from the object created when calling the createTestnetWallet method, it only appears when creating a testnet wallet */}
    //       {wallet.seed && (
    //         <>
    //           <p><strong>Seed:</strong> {wallet.seed}</p>
    //           <p><strong>Public Key:</strong> {wallet.publicKey}</p>
    //           <p><strong>Private Key:</strong> {wallet.privateKey}</p>
    //         </>
    //       )}
    //     </div>
    //   )}

    //   <button onClick={() => createWallet(client)}>
    //     New wallet
    //   </button>
    // </div>
  );
}

export default App;