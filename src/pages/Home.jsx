import React, { useState, useEffect } from 'react'
import { Router, Routes } from 'react-router-dom';
import { useXrplClient } from '../hooks/useXrplClient';
import { useWallet } from '../hooks/useWallet';

function Home() {
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

    // Auto-connect to XRPL Client on mount
    useEffect(() => {
        connect();
    }, [connect]);

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
        <div>
            <div>
                <p>XRPL Client Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
                <button onClick={isConnected ? disconnect : connect}>
                    {isConnected ? 'Disconnect' : 'Connect'}
                </button>
            </div>
        </div>
    )
}

export default Home