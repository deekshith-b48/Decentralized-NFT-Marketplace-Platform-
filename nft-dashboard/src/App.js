import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import NftDetailPage from './pages/NftDetailPage/NftDetailPage';
import { WalletProvider } from './contexts/WalletContext';
import './App.css'; // Keep general app styles

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content"> {/* Added a main wrapper for content area */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nft/:id" element={<NftDetailPage />} />
              {/* Define other routes here later, e.g., for a Profile Page */}
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
