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
}

export default new WalletService();