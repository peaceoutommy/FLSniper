import xrplClientRepository from "../repositories/xrplClientRepository";

class XrplClientService {
    async initializeClient() {
        try {
            const client = await xrplClientRepository.createClient();
            await xrplClientRepository.connectClient(client);
            return client;
        } catch (error) {
            console.error('XrplService: Error initializing client:', error);
            throw error;
        }
    }

    async disconnectClient(client) {
        try {
            await xrplClientRepository.disconnectClient(client);
        } catch (error) {
            console.error('XrplService: Error disconnecting client:', error);
            throw error;
        }
    }
}

export default new XrplClientService();