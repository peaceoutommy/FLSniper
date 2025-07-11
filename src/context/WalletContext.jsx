import React, { createContext, useContext, useEffect, useState } from "react";
import { useXrplClientContext } from "./xrplClientContex";
import { useWallet } from "../hooks/useWallet";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    const { client, isConnected } = useXrplClientContext();
    const wallet = useWallet();

    // Fetch all wallets (not in Wallet object but as a list of strings)
    // Fetch selected wallet details once connected
    useEffect(() => {
        if (client && isConnected) {
            wallet.getAllWallets()
            wallet.getWalletDetails(client)
        }
    }, [client, isConnected])

    return (
        <WalletContext.Provider value={wallet}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("WalletContext: useXrpl must be used within a XrplClientProvider");
    }
    return context;
};