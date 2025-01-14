import { useEffect, useState } from "react";
import { animateCircles } from "../components/ui/Home"; 
import "../components/ui/Home.css";


const Home = () => {
  useEffect(() => {
    animateCircles(); 
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home">
      <header className="navbar">
        <div className="logo">Smart CV Maker</div>
        <button
          className="menu-icon-button"
          onClick={() => (window.location.href = "/dashboard")}
        >
          ► 
        </button>
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
      </section>

      <section className="advantages-section">
        <h2>Why Choose Us?</h2>
        <div className="hero-image-section">
          <div className="hero-image">
            <img src="/example-cv.jpg" alt="Example CV" />
          </div>
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
        </div>
      </section>

      {/* Sec?iunea de performan?? */}
      <section className="performance-section">
  <h2>Our Performance</h2>
  <div className="performance-cards">
    <div className="performance-card">
      <h3>CVs Created</h3>
      <p>Over 1,000,000 CVs have been created using our platform.</p>
      <div className="card-icon">📄</div>
    </div>
    <div className="performance-card">
      <h3>Time Saved</h3>
      <p>On average, users save 2 hours per resume compared to traditional methods.</p>
      <div className="card-icon">⏱</div>
    </div>
    <div className="performance-card">
      <h3>Customer Satisfaction</h3>
      <p>98% of our users are satisfied with the quality of the templates.</p>
      <div className="card-icon">👍</div>
  </div>
  </div>

  <div className="performance-graph">
    <h3>Performance Overview</h3>
    <div className="circle-container">
      <div className="progress-circle" data-percent="80">
        <span className="progress-text">80%</span>
        <svg className="circle" viewBox="0 0 120 120">
          <circle className="bg-circle" cx="60" cy="60" r="55" />
          <circle className="progress-circle-path" cx="60" cy="60" r="55" />
        </svg>
        <h4>Time Efficiency</h4>
      </div>
      <div className="progress-circle" data-percent="95">
        <span className="progress-text">95%</span>
        <svg className="circle" viewBox="0 0 120 120">
          <circle className="bg-circle" cx="60" cy="60" r="55" />
          <circle className="progress-circle-path" cx="60" cy="60" r="55" />
        </svg>
        <h4>Customer Satisfaction</h4>
      </div>
      <div className="progress-circle" data-percent="90">
        <span className="progress-text">90%</span>
        <svg className="circle" viewBox="0 0 120 120">
          <circle className="bg-circle" cx="60" cy="60" r="55" />
          <circle className="progress-circle-path" cx="60" cy="60" r="55" />
        </svg>
        <h4>Resumes Created</h4>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;