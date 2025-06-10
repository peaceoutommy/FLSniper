import React, { useState, useEffect } from 'react'
import { Router, Routes } from 'react-router-dom';
import { useXrplClientContext } from '../context/xrplClientContex';
import { useWalletContext } from '../context/WalletContext';


function Home() {
    const { wallet, createWallet } = useWalletContext();
    const { client } = useXrplClientContext();

    return (
        <div>
           
            <p><strong>Wallet: </strong></p>
            
        </div>
    )
}

export default Home