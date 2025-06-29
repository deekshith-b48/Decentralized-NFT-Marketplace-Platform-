import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import NftCard from './NftCard';

// Mock react-router-dom's Link component or wrap with Router
// Easiest is often to wrap with Router for components using Link

describe('NftCard Component', () => {
  const mockNft = {
    id: '101',
    name: 'Test NFT Alpha',
    description: 'This is a detailed description for Test NFT Alpha, used for testing purposes.',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Test+NFT',
  };

  const mockNftShortDescription = {
    id: '102',
    name: 'Test NFT Beta',
    description: 'Short desc.',
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Test+NFT+Beta',
  };

  test('renders NFT name and full short description', () => {
    render(
      <Router>
        <NftCard nft={mockNftShortDescription} />
      </Router>
    );

    expect(screen.getByText('Test NFT Beta')).toBeInTheDocument();
    expect(screen.getByText('Short desc.')).toBeInTheDocument();
  });

  test('renders NFT name and truncated long description', () => {
    render(
      <Router>
        <NftCard nft={mockNft} />
      </Router>
    );

    expect(screen.getByText('Test NFT Alpha')).toBeInTheDocument();
    // Check for the truncated description (first 97 chars + '...')
    const expectedTruncatedDescription = `${mockNft.description.substring(0, 97)}...`;
    expect(screen.getByText(expectedTruncatedDescription)).toBeInTheDocument();
  });

  test('renders placeholder if NFT data is not provided', () => {
    render(
      <Router>
        <NftCard nft={null} />
      </Router>
    );
    expect(screen.getByText('Loading NFT...')).toBeInTheDocument();
  });

  test('renders image with correct alt text', () => {
    render(
      <Router>
        <NftCard nft={mockNft} />
      </Router>
    );
    const image = screen.getByAltText('Test NFT Alpha');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://via.placeholder.com/300x200.png?text=Test+NFT');
  });
});
