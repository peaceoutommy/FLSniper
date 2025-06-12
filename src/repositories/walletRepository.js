import { Wallet, classicAddressToXAddress } from "xrpl";

class WalletRepository {

    async getAllWallets() {
        return JSON.parse(localStorage.getItem("wallets") || "[]")
    }

    async getWalletDetails(client) {
        // Get all wallets from localstorage
        const wallets = await this.getAllWallets();

        // Get selected wallet index from localstorage
        const selectedWalletIndex = await this.getSelectedWalletIndex()

        // Create the XRPL Wallet object based on the selected wallet index
        const wallet = Wallet.fromSeed(wallets[selectedWalletIndex].seed)

        // Get selectedWallet name
        const walletName = wallets[selectedWalletIndex].name

        // Get wallet details
        const { result: { account_data } } = await client.request({
            command: 'account_info',
            account: wallet.address,
            ledger_index: 'validated',
        });

        const ownerCount = account_data.OwnerCount || 0;

        // Get the reserve base and increment
        const {
            result: {
                info: {
                    validated_ledger: { reserve_base_xrp, reserve_inc_xrp },
                },
            },
        } = await client.request({ command: 'server_info' });

        // Calculate the total reserve amount
        const accountReserve = ownerCount * reserve_inc_xrp + reserve_base_xrp;

        return {
            account_data,
            accountReserve,
            xAddress: classicAddressToXAddress(wallet.address, false, false),
            address: wallet.address,
            wName: walletName
        };
    }

    async getSelectedWalletIndex() {
        return JSON.parse(localStorage.getItem("selectedWalletIndex") || "0")
    }

    async selectWallet(index) {
        localStorage.setItem("selectedWalletIndex", index);
    }

    async createWallet(name) {
        const wallet = Wallet.generate()
        const walletWithName = { ...wallet, name: name }
        await this.addWallet(walletWithName)
        return walletWithName
    }

    async createTestnetWallet(client, name) {
        const fund_result = await client.fundWallet()
        const wallet = fund_result.wallet
        const walletWithName = { ...wallet, name: name }
        await this.addWallet(walletWithName)
        return walletWithName
    }

    async addWallet(wallet) {
        // Get Wallet list from localstorage
        let wallets = JSON.parse(localStorage.getItem("wallets"))

        if (wallets != null) {
            // If wallet already exists return
            if (wallets.some(w => w.seed === wallet.seed)) {
                return;
            }
            wallets.push(wallet);

        } else {

            wallets = [];
            wallets.push(wallet);

        }

        localStorage.setItem("wallets", JSON.stringify(wallets))
    }

    async removeWallet(wallet) {
        // Get Wallet list from localstorage
        let wallets = JSON.parse(localStorage.getItem("wallets"))

        if (wallets != null) {

            // Find the wallet which address match the address from the wallet passed on props
            const index = wallets.findIndex(w => w.classicAddress === wallet.address)
            if (index >= 0) {
                wallets.splice(index, 1) // Remove it

                // Set the updated wallet array on localstorage
                localStorage.setItem("wallets", JSON.stringify(wallets))

                // Set the selected Wallet to the 1st Wallet
                this.selectWallet(0)
            }
        }
    }
}

export default new WalletRepository