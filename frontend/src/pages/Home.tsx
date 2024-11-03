import React, { useState } from 'react';
import '../components/ui/Home.css'; 

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home">
      <header className="navbar">
        <div className="logo">l o g o</div>
        <div className="burger-menu" onClick={toggleMenu}>
          <span>☰</span>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <a href="/auth">Login</a>
              <a href="/create-cv">Create CV</a>
              <a href="/edit-profile">Edit Profile</a>
              <a href="/history">History</a>
            </div>
          )}
        </div>
      </header>
      <div className="content">
        <h1>Create Professional CVs with Ease</h1>
        <p>Our tool helps you build resumes that stand out, making it easy to showcase your skills and experience.</p>
      </div>
    </div>
  );
};

export default Home;
