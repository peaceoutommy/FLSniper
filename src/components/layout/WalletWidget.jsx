import React, { useState } from "react"
import { Wallet } from 'lucide-react';
import { useXrplClientContext } from '../../context/xrplClientContex';
import { useWalletContext } from '../../context/WalletContext';
import { useWalletWidgetContext } from "../../context/WalletWidgetContext";

function WalletWidget() {
    const walletContext = useWalletContext();
    const { client } = useXrplClientContext();
    const { isOpen, toggleWidget } = useWalletWidgetContext();

    const [newWalletName, setNewWalletName] = useState(null)

    console.log(walletContext.wallet)

    return (
        <>
            {isOpen ?
                <div>
                    {walletContext.wallet ?
                        <>
                            <h1>Wallet</h1>

                            {walletContext.wallet.wName
                                ?
                                <p><strong>Name:</strong> {walletContext.wallet.wName}</p>
                                :
                                <p><strong>Name:</strong> Default</p>
                            }

                            <p><strong>Address:</strong> {walletContext.wallet.address}</p>
                            <p><strong>Balance:</strong> {walletContext.wallet.balanceInXrp} XRP</p>

                            <button onClick={() => walletContext.removeWallet(walletContext.wallet, client)}>Remove selected Wallet</button>

                            {/* Wallet seed comes from the object created when calling the createTestnetWallet method, it only appears when creating a testnet wallet */}
                            {walletContext.wallet.seed != null && (
                                <>
                                    <p><strong>Seed:</strong> {walletContext.wallet.seed}</p>
                                    <p><strong>Public Key:</strong> {walletContext.wallet.publicKey}</p>
                                    <p><strong>Private Key:</strong> {walletContext.wallet.privateKey}</p>
                                </>
                            )}
                        </>
                        :
                        <>
                            <p><strong>No wallet found.</strong></p>
                        </>
                    }

                    <input
                        type="text"
                        value={newWalletName || ""}
                        onChange={(e) => setNewWalletName(e.target.value)}
                        placeholder="Enter wallet name"
                    />


                    <button onClick={() => walletContext.createWallet(newWalletName)}>Add a new wallet (Mainnet)</button>
                    <br />
                    <button onClick={() => walletContext.createWallet(client, newWalletName)}>Add a new wallet (Testnet)</button>

                    {
                        walletContext.wallets.map((wallet, index) => {
                            return (
                                <div key={index} onClick={() => walletContext.selectWallet(client, index)}>

                                    {wallet.name
                                        ?
                                        <p><strong>Name:</strong> {wallet.name}</p>
                                        :
                                        <p><strong>Name:</strong> Default</p>
                                    }

                                    <p>{wallet.classicAddress}</p>
                                </div>
                            )
                        })
                    }

                </div>
                :
                <Wallet onClick={toggleWidget} />
            }
        </>
    )

}

export default WalletWidget