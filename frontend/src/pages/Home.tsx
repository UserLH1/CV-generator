import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import "../components/ui/Home.css";

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="cv-home">
      <header className="cv-home__nav">
        <Link to="/" className="cv-home__brand">
          <FileText size={19} aria-hidden="true" />
          Smart CV Maker
        </Link>
        <Link to={token ? "/dashboard" : "/login"} className="cv-home__sign-in">
          {token ? "My CVs" : "Sign in"}
        </Link>
      </header>

      <section className="cv-home__hero">
        <div className="cv-home__intro">
          <h1>Build a CV worth reading.</h1>
          <p>
            Add your experience, see your CV take shape as you edit, and export
            a PDF when it’s ready.
          </p>
          <div className="cv-home__actions">
            <Link to={token ? "/dashboard" : "/register"} className="cv-home__button">
              {token ? "Open my CVs" : "Create a CV"}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href="#sample-cv">See an example</a>
          </div>
        </div>

        <figure className="cv-home__sample" id="sample-cv">
          <div className="cv-home__paper">
            <div className="cv-home__paper-head">
              <h2>Alex Morgan</h2>
              <p>Operations Coordinator</p>
              <p>Manchester, UK · alex@example.com</p>
            </div>
            <div className="cv-home__paper-section">
              <h3>Experience</h3>
              <p><strong>Operations Coordinator</strong> · Northline Studio</p>
              <p>2022–Present</p>
              <ul>
                <li>Coordinated weekly schedules across three project teams.</li>
                <li>Built a handover checklist that reduced missed deadlines.</li>
              </ul>
            </div>
            <div className="cv-home__paper-section">
              <h3>Education</h3>
              <p><strong>BSc Business Management</strong></p>
              <p>2018–2021</p>
            </div>
            <div className="cv-home__paper-section">
              <h3>Skills</h3>
              <p>Project coordination · Reporting · Process improvement</p>
            </div>
          </div>
          <figcaption>Sample CV</figcaption>
        </figure>
      </section>
    </div>
  );
}
