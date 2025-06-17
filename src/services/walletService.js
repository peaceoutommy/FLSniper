import { dropsToXrp } from "xrpl";
import WalletRepository from "../repositories/WalletRepository";

class WalletService {

    async getAllWallets() {
        return await WalletRepository.getAllWallets();
    }

    async getWalletDetails(client) {

        if (!client) {
            throw new Error("Client is required to get wallet details!")
        }

        try {
            const walletDetails = await WalletRepository.getWalletDetails(client)
            const balanceInXrp = dropsToXrp(walletDetails.account_data.Balance)

            return { ...walletDetails, balanceInXrp }
        } catch (error) {
            console.log("Wallet Service: Error getting wallet details", error)
            throw error
        }
    }

    async selectWallet(index) {
        if (index < 0) { return }
        await WalletRepository.selectWallet(index);
    }

    async createWallet(client = null, name = "default") {
        try {
            const testMode = process.env.REACT_APP_EXPLORER_NETWORK === "testnet";

            if (testMode && client) {
                // Create and fund a testnet wallet automatically
                // wallet = await WalletRepository.createTestnetWallet(client, name);
                await WalletRepository.createTestnetWallet(client, name);

            } else {
                // Just generate a new wallet (not funded)
                // wallet = await WalletRepository.createWallet(name);
                await WalletRepository.createWallet(name);

            }

            // return wallet;
        } catch (error) {
            console.log("Wallet Service: Error creating wallet", error)
            throw error
        }
    }

    async removeWallet(wallet) {
        try {
            if (!wallet) {
                console.log("Wallet is not defined")
                return
            }
            await WalletRepository.removeWallet(wallet)
        } catch (error) {
            console.log("Error removing wallet: ", error)
        }
    }

    async sendPayment(client, amount, address, wallet) {
        try {
            if (!client || !amount || !address || !wallet) {
                console.log("client or amount or address or wallet are not defined")
            }
            await WalletRepository.sendPayment(client, amount, address, wallet)
        } catch (error) {
            console.log("walletService sendPayment error", error)
        }
    }
}

export default new WalletService();