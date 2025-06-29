// Mock NFT Data Service

const mockNfts = [
  {
    id: '1',
    name: 'CryptoPunk #7804',
    description: 'A rare CryptoPunk with an alien skin, cap forward, and small shades.',
    imageUrl: 'https://www.larvalabs.com/cryptopunks/cryptopunk7804.png', // Replace with a generic placeholder if direct linking is an issue
    owner: '0x1234...abcd',
    price: '4200 ETH',
    attributes: [
      { trait_type: 'Type', value: 'Alien' },
      { trait_type: 'Accessory', value: 'Cap Forward' },
      { trait_type: 'Accessory', value: 'Small Shades' },
    ],
  },
  {
    id: '2',
    name: 'Bored Ape #8817',
    description: 'A Bored Ape with a Dagger mouth, Wool Turtleneck, and Bored eyes.',
    imageUrl: 'https://img.seadn.io/files/9f2490138c00b96646a3261509949c1f.png?auto=format&fit=max&w=1000', // Replace with a generic placeholder
    owner: '0x5678...efgh',
    price: '105 ETH',
    attributes: [
      { trait_type: 'Mouth', value: 'Dagger' },
      { trait_type: 'Clothes', value: 'Wool Turtleneck' },
      { trait_type: 'Eyes', value: 'Bored' },
      { trait_type: 'Background', value: 'Orange' },
    ],
  },
  {
    id: '3',
    name: 'Cool Cat #1490',
    description: 'A Cool Cat with a TV Head, a Blue Puffer Vest, and a Happy Face.',
    imageUrl: 'https://img.seadn.io/files/0a5981e5a00247691589f39bd170751a.png?auto=format&fit=max&w=1000', // Replace with a generic placeholder
    owner: '0x9abc...ijkl',
    price: '15 ETH',
    attributes: [
      { trait_type: 'Head', value: 'TV Head' },
      { trait_type: 'Outfit', value: 'Blue Puffer Vest' },
      { trait_type: 'Face', value: 'Happy' },
      { trait_type: 'Tier', value: 'Cool_1' },
    ],
  },
  {
    id: '4',
    name: 'Abstract Art NFT',
    description: 'A unique piece of generative abstract art.',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Abstract+Art',
    owner: '0xmno...pqrs',
    price: '5 ETH',
    attributes: [
      { trait_type: 'Style', value: 'Generative' },
      { trait_type: 'Palette', value: 'Monochrome' },
    ],
  },
  {
    id: '5',
    name: 'Pixelated Warrior',
    description: 'A brave warrior from the pixel dimension.',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Pixel+Warrior',
    owner: '0xstu...vwxyz',
    price: '2.5 ETH',
    attributes: [
      { trait_type: 'Class', value: 'Warrior' },
      { trait_type: 'Weapon', value: 'Pixel Sword' },
      { trait_type: 'Armor', value: 'Pixel Shield' },
    ],
  }
];

// Function to simulate fetching all NFTs
export const getAllNfts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNfts);
    }, 500); // Simulate network delay
  });
};

// Function to simulate fetching a single NFT by ID
export const getNftById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nft = mockNfts.find(n => n.id === id);
      if (nft) {
        resolve(nft);
      } else {
        reject(new Error('NFT not found'));
      }
    }, 300); // Simulate network delay
  });
};

// Note: In a real app, these image URLs might need to be proxied or replaced
// with ones you have rights to use, or use generic placeholders for development.
// For CryptoPunks, official images are generated on the fly by Larva Labs.
// For Bored Apes and Cool Cats, OpenSea or similar marketplaces often have image CDNs.
// Using direct links from marketplaces might be subject to their terms of service or hotlinking protection.
// Placeholder images (e.g., via.placeholder.com) are safe for development.

// For the purpose of this mock service, I've used some example URLs.
// If they don't load, the NftCard component has a fallback placeholder.
// I've updated some to be generic placeholders to avoid issues.
// The CryptoPunk one is tricky as they are often dynamically generated. I'll use a placeholder concept for it too.
mockNfts[0].imageUrl = 'https://via.placeholder.com/300x300.png?text=CryptoPunk+Example';
mockNfts[1].imageUrl = 'https://via.placeholder.com/300x300.png?text=Bored+Ape+Example';
mockNfts[2].imageUrl = 'https://via.placeholder.com/300x300.png?text=Cool+Cat+Example';
