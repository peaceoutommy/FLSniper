import { Wallet, classicAddressToXAddress } from "xrpl";

class WalletRepository {
    async getWalletDetails(client) {

        // Get wallet seed from .env
        const wallet = Wallet.fromSeed(process.env.REACT_APP_SEED)

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

        console.log('Wallet Repository: Got wallet details!');

        return {
            account_data,
            accountReserve,
            xAddress: classicAddressToXAddress(wallet.address, false, false),
            address: wallet.address
        };
    }

    async createWallet() {
        const wallet = Wallet.generate()
        return wallet
    }

    async createTestnetWallet(client) {
        console.log("Creating testwallet")
        const fund_result = await client.fundWallet()
        const wallet = fund_result.wallet
        return wallet
    }

}

export default new WalletRepository