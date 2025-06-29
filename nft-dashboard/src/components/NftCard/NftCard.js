import React from 'react';
import { Link } from 'react-router-dom';
import './NftCard.css';

const NftCard = ({ nft }) => {
  if (!nft) {
    return <div className="nft-card-placeholder">Loading NFT...</div>;
  }

  return (
    <Link to={`/nft/${nft.id}`} className="nft-card-link">
      <div className="nft-card">
        <img src={nft.imageUrl || 'https://via.placeholder.com/300x200.png?text=NFT+Image'} alt={nft.name} className="nft-card-image" />
        <div className="nft-card-info">
          <h3 className="nft-card-name">{nft.name || 'Unnamed NFT'}</h3>
          <p className="nft-card-description">
            {nft.description ?
              (nft.description.length > 100 ? `${nft.description.substring(0, 97)}...` : nft.description) :
              'No description available.'}
          </p>
        </div>
        {/* Optionally, add a "View Details" button or link here if preferred over making the whole card clickable */}
      </div>
    </Link>
  );
};

export default NftCard;
