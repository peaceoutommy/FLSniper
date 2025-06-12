import React, { createContext, useContext, useState } from "react";

const WalletWidgetContext = createContext(null);

export const WalletWidgetProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleWidget = () => setIsOpen((prev) => !prev);

    return (
        <WalletWidgetContext.Provider value={{ isOpen, toggleWidget }}>
            {children}
        </WalletWidgetContext.Provider>
    );
}

export const useWalletWidgetContext = () => {
    const context = useContext(WalletWidgetContext);
    if (!context) {
        throw new Error("WalletWidgetContext: Error toggling the widget.");
    }
    return context;
};