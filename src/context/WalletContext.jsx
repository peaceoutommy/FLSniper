import React, { createContext, useContext, useEffect } from "react";
import { useXrplClientContext } from "./xrplClientContex";
import { useWallet } from "../hooks/useWallet";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    const { client, isConnected } = useXrplClientContext();
    const wallet = useWallet();

    // Fetch wallet details once connected
    useEffect(() => {
        if (client && isConnected) {
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