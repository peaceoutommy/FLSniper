import React, { createContext, useContext } from "react";
import { useXrplClient } from "../hooks/useXrplClient";

const XrplClientContext = createContext(null);

export const XrplClientProvider = ({ children }) => {
    const xrplClient = useXrplClient();

    // Auto connect to Xrpl client on mount
    useEffect(() => {
        xrplClient.connect();

        // Cleanup function that runs on unmount (right before it)
        // Shouldnt run bcs the whole App is wrapped by the XrplClientContext but its a safety measure
        return () => {
            xrplClient.disconnect();
        };
    }, []); 
    // Use effect runs on mount AND everytime the dependencies on the dependency list change
    // If there are no dependencies it will run only Once

    return (
        <XrplClientContext.Provider value={xrplClient}>
            {children}
        </XrplClientContext.Provider>
    );
};

export const useXrplClientContext = () => {
    const context = useContext(XrplClientContext);
    if (!context) {
        throw new Error("XrplClientContext: useXrpl must be used within a XrplClientProvider");
    }
    return context;
};