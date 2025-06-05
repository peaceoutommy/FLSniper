import { useState, useEffect, useCallback } from "react";
import XrplClientService from "../services/xrplClientService";

export const useXrplClient = () => {
    const [client, setClient] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const connect = useCallback(async () => {
        setIsConnecting(true);
        setError(null);

        try {
            const newClient = await XrplClientService.initializeClient();
            setClient(newClient);
            setIsConnected(true);
        } catch (err) {
            setError(err.message);
            console.error("useXrplClient: Connection error:", err);
        } finally {
            setIsConnecting(false);
        }
    }, []);

    const disconnect = useCallback(async () => {
        if (client) {
            try {
                await XrplClientService.disconnectClient(client);
                setClient(null);
                setIsConnected(false);
            } catch (err) {
                setError(err.message);
                console.error("useXrplClient: Disconnect error:", err);
            }
        }
    }, [client]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (client) {
                XrplClientService.disconnectClient(client);
            }
        };
    }, [client]);

    return {
        client,
        isConnecting,
        isConnected,
        error,
        connect,
        disconnect
    };
};