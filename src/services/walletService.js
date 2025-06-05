import WalletRepository from "../repositories/WalletRepository";

class WalletService {

    async getWalletDetails(client) {

        if (!client) {
            throw new Error("Client is required to get wallet details!")
        }

        try {
            const walletDetails = await WalletRepository.getWalletDetails(client)
            return walletDetails
        } catch (error) {
            console.log("Wallet Service: Error getting wallet details", error)
            throw error
        }
    }

    async createWallet(client = null) {
        try {
            const testMode = process.env.REACT_APP_EXPLORER_NETWORK === "testnet";

            let wallet;
            if (testMode && client) {
                // Create and fund a testnet wallet automatically
                wallet = await WalletRepository.createTestnetWallet(client);
            } else {
                // Just generate a new wallet (not funded)
                wallet = await WalletRepository.createWallet();
            }

            return wallet;
        } catch (error) {
            console.log("Wallet Service: Error creating wallet", error)
            throw error
        }
    }
}

export default new WalletService();