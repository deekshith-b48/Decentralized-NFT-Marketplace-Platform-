import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import './Navbar.css';

const Navbar = () => {
  const { currentAccount, isConnected, loading, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">NFT Dashboard</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/" className="navbar-link">Home</a></li>
        {/* We'll add more links later, e.g., for Profile or Wallet */}
        {/* <li><a href="/profile" className="navbar-link">Profile</a></li> */}
      </ul>
      <div className="navbar-actions">
        {isConnected ? (
          <div className="wallet-info">
            <span className="wallet-address">{formatAddress(currentAccount)}</span>
            <button onClick={disconnectWallet} className="wallet-connect-btn disconnect-btn">
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={connectWallet} className="wallet-connect-btn" disabled={loading}>
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
