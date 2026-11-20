import { ArrowUpRight, Download, FileText, PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./auth-layout.css";

type AuthLayoutProps = {
  mode: "login" | "register";
  title: string;
  description: string;
  children: ReactNode;
};

const workflow = [
  { icon: PencilLine, label: "Add your experience" },
  { icon: FileText, label: "See it in the live preview" },
  { icon: Download, label: "Export your CV as a PDF" },
];

export function AuthLayout({ mode, title, description, children }: AuthLayoutProps) {
  return (
    <div className={`auth-layout auth-layout--${mode}`}>
      <section className="auth-layout__form" aria-labelledby="auth-title">
        <div className="auth-layout__form-inner">
          <h1 id="auth-title">{title}</h1>
          <p className="auth-layout__description">{description}</p>
          {children}
        </div>
      </section>

      {mode === "register" && (
        <aside className="auth-layout__guide" aria-labelledby="auth-guide-title">
          <div className="auth-layout__photo" aria-hidden="true">
            <div className="auth-layout__sheet">
              <span>Alex Morgan</span>
              <span>Operations Coordinator</span>
              <hr />
              <span>Experience</span>
              <span>Coordinated weekly schedules across three project teams.</span>
            </div>
          </div>
          <div className="auth-layout__guide-content">
            <h2 id="auth-guide-title">From draft to PDF</h2>
            <ol>
              {workflow.map(({ icon: Icon, label }) => (
                <li key={label}><Icon size={17} aria-hidden="true" />{label}</li>
              ))}
            </ol>
            <Link to="/#sample-cv" className="auth-layout__sample-link">
              Explore a sample CV <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
