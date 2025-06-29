import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletProvider, useWallet } from '../../contexts/WalletContext'; // Import actual provider and hook
import Navbar from './Navbar';

// Mock the useWallet hook
jest.mock('../../contexts/WalletContext', () => ({
  ...jest.requireActual('../../contexts/WalletContext'), // Import and retain actual WalletProvider
  useWallet: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockConnectWallet = jest.fn();
  const mockDisconnectWallet = jest.fn();

  beforeEach(() => {
    // Reset mocks for each test
    mockConnectWallet.mockClear();
    mockDisconnectWallet.mockClear();
    useWallet.mockReturnValue({
      currentAccount: null,
      isConnected: false,
      loading: false,
      connectWallet: mockConnectWallet,
      disconnectWallet: mockDisconnectWallet,
    });
  });

  test('renders logo and connect button when not connected', () => {
    render(
      <Router>
        <WalletProvider> {/* Navbar needs WalletProvider if not using a global mock */}
          <Navbar />
        </WalletProvider>
      </Router>
    );

    expect(screen.getByText('NFT Dashboard')).toBeInTheDocument(); // Logo/Brand
    expect(screen.getByText('Home')).toBeInTheDocument(); // Home link
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
  });

  test('calls connectWallet when connect button is clicked', () => {
    render(
      <Router>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /connect wallet/i }));
    expect(mockConnectWallet).toHaveBeenCalledTimes(1);
  });

  test('shows "Connecting..." when loading', () => {
    useWallet.mockReturnValue({
      currentAccount: null,
      isConnected: false,
      loading: true,
      connectWallet: mockConnectWallet,
      disconnectWallet: mockDisconnectWallet,
    });

    render(
      <Router>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
      </Router>
    );
    expect(screen.getByRole('button', { name: /connecting.../i })).toBeInTheDocument();
  });

  test('renders address and disconnect button when connected', () => {
    const mockAddress = '0x123...cdef';
    useWallet.mockReturnValue({
      currentAccount: '0x1234567890abcdef1234567890abcdef12345678', // Full address
      isConnected: true,
      loading: false,
      connectWallet: mockConnectWallet,
      disconnectWallet: mockDisconnectWallet,
    });

    render(
      <Router>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
      </Router>
    );

    // The address is formatted, so we check for the formatted version.
    // formatAddress function: `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    // For '0x1234567890abcdef1234567890abcdef12345678', this is '0x1234...5678'
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
  });

  test('calls disconnectWallet when disconnect button is clicked', () => {
    useWallet.mockReturnValue({
      currentAccount: '0x1234567890abcdef1234567890abcdef12345678',
      isConnected: true,
      loading: false,
      connectWallet: mockConnectWallet,
      disconnectWallet: mockDisconnectWallet,
    });

    render(
      <Router>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /disconnect/i }));
    expect(mockDisconnectWallet).toHaveBeenCalledTimes(1);
  });
});
