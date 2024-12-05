import { useState } from "react";
import "../components/ui/Home.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home">
      <header className="navbar">
        <div className="logo">Smart CV Maker</div>
        <div className="burger-menu" onClick={toggleMenu}>
          <span>☰</span>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <a href="/login">Login</a>
              <a href="/dashboard">Create CV</a>
              <a href="/dashboard">Edit Profile</a>
              <a href="/dashboard">History</a>
            </div>
          )}
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Create Your CV Quickly and Easily</h1>
          <p>
            Stand out in the job market with professional resumes crafted
            effortlessly.
          </p>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Get Started
          </button>
        </div>
        <div className="hero-image mt-24">
          <img src="/example-cv.jpg" alt="Example CV" />
        </div>
      </section>

      <section className="advantages-section">
        <h2>Why Choose Us?</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Easy Online Resume Builder</h3>
            <p>Create resumes directly in your browser with ease.</p>
          </div>
          <div className="card">
            <h3>Professional Templates</h3>
            <p>Choose from a variety of professionally designed templates.</p>
          </div>
          <div className="card">
            <h3>Customizable Designs</h3>
            <p>Personalize your CV to match your unique style.</p>
          </div>
          <div className="card">
            <h3>Save & Download</h3>
            <p>Save your progress and download your CV in multiple formats.</p>
          </div>
          <div className="card">
            <h3>Job-Specific Tips</h3>
            <p>Get tailored advice for your specific career path.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>Our team is here to help you anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
