import React, { useState, useEffect } from 'react';
import NftCard from '../../components/NftCard/NftCard';
import { getAllNfts } from '../../services/mockNftService';
import './HomePage.css';

const HomePage = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        setLoading(true);
        const data = await getAllNfts();
        setNfts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch NFTs.');
        console.error(err);
        setNfts([]); // Clear any existing nfts
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, []);

  if (loading) {
    return <div className="homepage-status">Loading NFTs...</div>;
  }

  if (error) {
    return <div className="homepage-status error">{error}</div>;
  }

  if (nfts.length === 0) {
    return <div className="homepage-status">No NFTs found.</div>;
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">Explore NFTs</h1>
      <div className="nft-grid">
        {nfts.map(nft => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
