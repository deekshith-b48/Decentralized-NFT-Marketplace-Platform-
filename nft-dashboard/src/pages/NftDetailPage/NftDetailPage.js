import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNftById } from '../../services/mockNftService';
import './NftDetailPage.css';

const NftDetailPage = () => {
  const { id } = useParams(); // Get the NFT ID from URL params
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNftDetails = async () => {
      try {
        setLoading(true);
        const data = await getNftById(id);
        setNft(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch NFT details: ${err.message}`);
        console.error(err);
        setNft(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNftDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="nft-detail-status">Loading NFT details...</div>;
  }

  if (error) {
    return <div className="nft-detail-status error">{error}</div>;
  }

  if (!nft) {
    return <div className="nft-detail-status">NFT not found or details are unavailable.</div>;
  }

  return (
    <div className="nft-detail-page">
      <Link to="/" className="back-link">&larr; Back to Gallery</Link>
      <div className="nft-detail-content">
        <div className="nft-detail-image-container">
          <img src={nft.imageUrl || 'https://via.placeholder.com/400x400.png?text=NFT+Image'} alt={nft.name} className="nft-detail-image" />
        </div>
        <div className="nft-detail-info">
          <h1 className="nft-detail-name">{nft.name || 'Unnamed NFT'}</h1>
          <p className="nft-detail-description">{nft.description || 'No description available.'}</p>

          <div className="nft-detail-section">
            <strong>Owner:</strong> <span>{nft.owner || 'Unknown'}</span>
          </div>
          <div className="nft-detail-section">
            <strong>Price:</strong> <span>{nft.price || 'Not listed'}</span>
          </div>

          {nft.attributes && nft.attributes.length > 0 && (
            <div className="nft-detail-section">
              <strong>Attributes:</strong>
              <ul className="nft-attributes-list">
                {nft.attributes.map((attr, index) => (
                  <li key={index} className="nft-attribute-item">
                    <span className="trait-type">{attr.trait_type}:</span>
                    <span className="trait-value">{attr.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Add more details as needed, e.g., transaction history, contract address */}
        </div>
      </div>
    </div>
  );
};

export default NftDetailPage;
