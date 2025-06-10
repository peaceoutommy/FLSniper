import React, { useState } from "react"
import { Wallet } from 'lucide-react';


function WalletModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>

            {isOpen ?
                <div>
                    <h2>Wallet Details</h2>
                    <p><strong>Address:</strong> {wallet.address}</p>
                    <p><strong>Balance:</strong> {wallet.balanceInXrp} XRP</p>

                    {/* Wallet seed comes from the object created when calling the createTestnetWallet method, it only appears when creating a testnet wallet */}
                    {wallet.seed && (
                        <>
                            <p><strong>Seed:</strong> {wallet.seed}</p>
                            <p><strong>Public Key:</strong> {wallet.publicKey}</p>
                            <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                        </>
                    )}
                </div>
                :
                <div onClick={() => setIsOpen(!isOpen)}>
                    <Wallet />
                </div>
            }
        </div>
    )

}

export default WalletModal