import { ArrowDown, ArrowRight, Download, FileText, Palette, PencilLine } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { resumeAccents } from "@/data/resume-theme";
import "../components/ui/Home.css";

const steps = [
  { icon: PencilLine, title: "Write the essentials", detail: "Add your experience, education, and skills one section at a time." },
  { icon: Palette, title: "Make it yours", detail: "Pick an accent and see how it looks in the live preview." },
  { icon: Download, title: "Take it with you", detail: "Save your progress and export a PDF when you’re ready to apply." },
];

export default function Home() {
  const { token } = useAuth();
  const [accent, setAccent] = useState<(typeof resumeAccents)[number]>(resumeAccents[0]);
  const editorPath = token ? "/dashboard" : "/register";

  return (
    <div className="cv-home">
      <header className="cv-home__nav">
        <Link to="/" className="cv-home__brand">
          <span className="cv-home__mark"><FileText size={18} aria-hidden="true" /></span>
          Easy CV
        </Link>
        <nav aria-label="Homepage">
          <a href="#how-it-works" className="cv-home__how-link">How it works</a>
          <Link to={token ? "/dashboard" : "/login"} className="cv-home__sign-in">
            {token ? "My CVs" : "Sign in"}
          </Link>
        </nav>
      </header>

      <section className="cv-home__hero">
        <div className="cv-home__intro">
          <h1>A CV with your <em>name on it.</em></h1>
          <p>
            Put your experience on paper. Build your CV with a live preview
            and export a PDF when it’s ready to send.
          </p>
          <div className="cv-home__actions">
            <Link to={editorPath} className="cv-home__button">
              {token ? "Open my CVs" : "Create a CV"}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="#sample-cv" className="cv-home__sample-link">
              Try the preview <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure
          className="cv-home__sample"
          id="sample-cv"
          style={{ "--sample-accent": accent.value } as CSSProperties}
        >
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
          <figcaption className="cv-home__toolbar">
            <span className="cv-home__sample-label">
              Sample CV
              <span aria-live="polite">Accent · {accent.name}</span>
            </span>
            <div className="cv-home__swatches" role="group" aria-label="Sample CV accent">
              {resumeAccents.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  aria-label={option.name}
                  aria-pressed={accent.name === option.name}
                  title={option.name}
                  onClick={() => setAccent(option)}
                >
                  <span style={{ backgroundColor: option.value }} />
                </button>
              ))}
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="cv-home__process" id="how-it-works">
        <h2>From first draft to PDF</h2>
        <ol>
          {steps.map(({ icon: Icon, title, detail }) => (
            <li key={title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="cv-home__footer">
        <span>Easy CV</span>
        <Link to={editorPath}>{token ? "Open my CVs" : "Create a CV"} <ArrowRight size={16} aria-hidden="true" /></Link>
      </footer>
    </div>
  );
}
