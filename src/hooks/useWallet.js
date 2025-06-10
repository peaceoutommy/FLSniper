import { useState, useEffect } from "react";
import WalletService from "../services/walletService";
import { useCallback } from "react";

export const useWallet = () => {
    const [wallet, setWallet] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getWalletDetails = useCallback(async (client) => {

        setError(null)

        if (!client) {
            setError("useWallet: Client is required")
            return
        }

        setIsLoading(true)

        try {
            const walletDetails = await WalletService.getWalletDetails(client)
            setWallet(walletDetails)
        } catch (error) {
            console.log("useWallet: Error getting wallet details: ", error)
        } finally {
            setIsLoading(false)
        }
    }, []);

    const createWallet = useCallback(async (client = null) => {
        try {
            const walletDetails = await WalletService.createWallet(client)
            setWallet(walletDetails)
        } catch (error) {
            console.log("Error generating wallet", error)
        }
    }, [])

    const clearWallet = useCallback(() => {
        setWallet(null)
        setError(null)
    }, [])

    return {
        wallet,
        isLoading,
        error,
        getWalletDetails,
        createWallet,
        clearWallet
    };
}