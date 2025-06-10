import React, { createContext, useContext } from "react";
import { useXrplClientContext } from "./xrplClientContex";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    const { client, isConnected } = useXrplClientContext();


}