import React, { useState } from "react"
import { Wallet, X } from 'lucide-react';
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
                <div className="fixed top-4 right-4 z-50 bg-tertiary border border-border rounded-xl shadow-medium w-80">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary rounded-lg">
                                <Wallet className="w-4 h-4 text-text-secondary" />
                            </div>
                            <h1 className="text-lg font-medium text-text-primary">Wallet</h1>
                        </div>
                        <button
                            onClick={toggleWidget}
                            className="p-1.5 hover:bg-secondary rounded-lg transition-colors duration-200"
                        >
                            <X className="w-4 h-4 text-text-tertiary hover:text-text-secondary" />
                        </button>
                    </div>

                    <div className="p-4">
                        {walletContext.wallet ?
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-text-tertiary">Name</span>
                                        <span className="text-text-secondary font-medium">
                                            {walletContext.wallet.wName || "Default"}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-sm text-text-tertiary">Address</span>
                                        <p className="text-text-secondary font-mono text-xs break-all bg-secondary p-3 rounded-lg border border-border">
                                            {walletContext.wallet.address}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg border border-border">
                                        <span className="text-sm text-text-tertiary">Balance</span>
                                        <span className="text-text-primary font-medium text-lg">
                                            {walletContext.wallet.balanceInXrp} XRP
                                        </span>
                                    </div>
                                </div>

                                {/* Wallet seed comes from the object created when calling the createTestnetWallet method, it only appears when creating a testnet wallet */}
                                {walletContext.wallet.seed != null && (
                                    <div className="space-y-3 p-4 bg-secondary rounded-lg border border-border">
                                        <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Developer Keys</h4>

                                        <div className="space-y-3 text-xs">
                                            <div>
                                                <span className="text-text-tertiary block mb-1">Seed</span>
                                                <p className="font-mono text-text-secondary bg-primary p-2 rounded border border-border break-all">
                                                    {walletContext.wallet.seed}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-text-tertiary block mb-1">Public Key</span>
                                                <p className="font-mono text-text-secondary bg-primary p-2 rounded border border-border break-all">
                                                    {walletContext.wallet.publicKey}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-text-tertiary block mb-1">Private Key</span>
                                                <p className="font-mono text-text-secondary bg-primary p-2 rounded border border-border break-all">
                                                    {walletContext.wallet.privateKey}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => walletContext.removeWallet(walletContext.wallet, client)}
                                    className="w-full bg-secondary hover:bg-border text-text-secondary hover:text-red-400 border border-border hover:border-red-900/30 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                                >
                                    Remove Wallet
                                </button>
                            </div>
                            :
                            <div className="text-center py-8">
                                <div className="p-4 bg-secondary rounded-lg w-fit mx-auto mb-4">
                                    <Wallet className="w-8 h-8 text-text-tertiary" />
                                </div>
                                <p className="text-text-secondary font-medium">No wallet connected</p>
                                <p className="text-text-tertiary text-sm mt-1">Create or import a wallet to get started</p>
                            </div>
                        }

                        <div className="mt-4 pt-4 border-t border-border space-y-4">
                            <input
                                type="text"
                                value={newWalletName || ""}
                                onChange={(e) => setNewWalletName(e.target.value)}
                                placeholder="Wallet name (optional)"
                                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-text-primary text-sm placeholder-text-tertiary focus:outline-none focus:border-border-hover focus:bg-primary transition-all duration-200"
                            />

                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => walletContext.createWallet(newWalletName)}
                                    className="w-full bg-accent hover:bg-accent-hover text-text-primary font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm border border-accent-muted hover:border-accent"
                                >
                                    Create Mainnet Wallet
                                </button>

                                <button
                                    onClick={() => walletContext.createWallet(client, newWalletName)}
                                    className="w-full bg-secondary hover:bg-border text-text-secondary hover:text-text-primary border border-border hover:border-border-hover font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                                >
                                    Create Testnet Wallet
                                </button>
                            </div>
                        </div>

                        {walletContext.wallets.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <h3 className="text-xs font-medium text-text-tertiary mb-3 uppercase tracking-wider">Available Wallets</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {walletContext.wallets.map((wallet, index) => (
                                        <button
                                            key={index}
                                            onClick={() => walletContext.selectWallet(client, index)}
                                            className="w-full text-left p-3 bg-secondary hover:bg-border border border-border hover:border-border-hover rounded-lg transition-all duration-200"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-text-secondary font-medium text-sm">
                                                        {wallet.name || "Default"}
                                                    </p>
                                                    <p className="text-text-tertiary text-xs font-mono mt-1 truncate">
                                                        {wallet.classicAddress}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <button
                    onClick={toggleWidget}
                    className="fixed top-4 right-4 z-50 p-3 bg-tertiary hover:bg-secondary border border-border hover:border-border-hover rounded-xl transition-all duration-200 shadow-subtle"
                >
                    <Wallet className="w-5 h-5 text-text-tertiary hover:text-text-secondary transition-colors" />
                </button>
            }
        </>
    )
}

export default WalletWidget