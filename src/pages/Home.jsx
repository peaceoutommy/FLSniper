import React, { useState, useEffect } from 'react'
import { Router, Routes } from 'react-router-dom';
import { useXrplClientContext } from '../context/xrplClientContex';
import { useWalletContext } from '../context/WalletContext';


function Home() {
    const { wallet, createWallet } = useWalletContext();
    const { client } = useXrplClientContext();

    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}

export default Home