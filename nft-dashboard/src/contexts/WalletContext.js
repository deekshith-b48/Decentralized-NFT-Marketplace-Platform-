import React, { createContext, useState, useContext } from 'react';

// Create the context
const WalletContext = createContext();

// Custom hook to use the WalletContext
export const useWallet = () => {
  return useContext(WalletContext);
};

// WalletProvider component
export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false); // To simulate async connection

  // Mock connect function
  const connectWallet = async () => {
    setLoading(true);
    console.log('Attempting to connect wallet...');
    // Simulate an asynchronous action (e.g., user approving connection in MetaMask)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful connection
    const mockAccount = '0x1234567890abcdef1234567890abcdef12345678'; // Example mock address
    setCurrentAccount(mockAccount);
    setIsConnected(true);
    setLoading(false);
    console.log(`Wallet connected: ${mockAccount}`);
  };

  // Mock disconnect function
  const disconnectWallet = () => {
    console.log('Disconnecting wallet...');
    setCurrentAccount(null);
    setIsConnected(false);
    console.log('Wallet disconnected.');
  };

  const value = {
    currentAccount,
    isConnected,
    loading,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
