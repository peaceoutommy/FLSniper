import { useState, useEffect } from "react";
import WalletService from "../services/walletService";
import { useCallback } from "react";

export const useWallet = () => {
    const [wallet, setWallet] = useState(null)
    const [wallets, setWallets] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getAllWallets = useCallback(async () => {
        setError(null)
        setIsLoading(true)

        try {
            const allWallets = await WalletService.getAllWallets()
            console.log("useWallet getAllWallets: ", allWallets)
            setWallets(allWallets)
            return allWallets
        } catch (error) {
            console.log("useWallet: Error getting all wallets: ", error)
        } finally {
            setIsLoading(false)
        }
    })

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

    const selectWallet = useCallback(async (client, index) => {
        try {
            if (!client) {
                console.log("useWallet selectWallet: no client provided")
                return
            }
            await WalletService.selectWallet(index)
            getWalletDetails(client)

        } catch (error) {
            console.log("useWallet error selecting wallet: ", error)
        }
    }, [wallet])

    const createWallet = useCallback(async (client = null, name = "default") => {
        try {
            await WalletService.createWallet(client, name)
            const updatedWallets = await getAllWallets()
            const newWalletIndex = updatedWallets.length - 1
            await selectWallet(client, newWalletIndex)
            await getWalletDetails(client)

        } catch (error) {
            console.log("Error generating wallet", error)
        }
    }, [])

    const clearWallet = useCallback(() => {
        setWallet(null)
        setError(null)
    }, [])

    const removeWallet = useCallback(async (wallet, client) => {
        try {
            await WalletService.removeWallet(wallet)
            await getAllWallets()
            await selectWallet(client, 0)
            await getWalletDetails(client)
        } catch (error) {
            console.log("Error removing wallet on useWallet", error)
        }
    }, [])

    return {
        wallet,
        wallets,
        isLoading,
        error,
        getWalletDetails,
        getAllWallets,
        createWallet,
        clearWallet,
        selectWallet,
        removeWallet
    };
}