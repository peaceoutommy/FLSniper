import { Client, dropsToXrp, rippleTimeToISOTime } from 'xrpl';

class XrplClient {
    async createClient() {
        try {
            const client = new Client(process.env.REACT_APP_CLIENT);
            return client;
        } catch (error) {
            console.error('XrplClientRepository: Error creating client:', error);
            throw error;
        }
    }

    async connectClient(client) {
        try {
            await client.connect();

            // Subscribe to the ledger stream
            await client.request({
                command: 'subscribe',
                streams: ['ledger'],
            });

            return true;
        } catch (error) {
            console.error('XrplClientRepository: Error connecting client:', error);
            throw error;
        }
    }

    async disconnectClient(client) {
        try {
            if (client && client.isConnected()) {
                await client.disconnect();
            }
        } catch (error) {
            console.error('XrplClientRepository: Error disconnecting client:', error);
            throw error;
        }
    }
}

export default new XrplClient