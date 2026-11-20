import AddResume from "@/components/AddResume";
import ResumeCard from "@/components/resume/ResumeCard";
import axios from "@/services/api";
import { useEffect, useState } from "react";

type Resume = { id: string; title?: string; themeColor?: string };

export default function Dashboard() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadResumes() {
    setError(false);
    try {
      const response = await axios.get<Resume[]>((import.meta.env.VITE_API_URL ?? "") + "/api/cv/getCVs");
      setResumes(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadResumes();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-8 sm:px-10 sm:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="font-serif text-4xl tracking-tight text-primary sm:text-5xl">Your CVs</h1>
          <p className="mt-2 text-muted-foreground">Pick up a draft or start a CV for your next application.</p>
        </div>
        <AddResume />
      </header>

      {loading ? (
        <p role="status" className="text-muted-foreground">Loading your CVs…</p>
      ) : error ? (
        <p role="alert" className="text-destructive">Could not load your CVs. <button type="button" className="underline" onClick={() => void loadResumes()}>Try again</button></p>
      ) : resumes.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resumes.map((resume) => (
            <li key={resume.id}>
              <ResumeCard resume={resume} refreshData={loadResumes} />
            </li>
          ))}
        </ul>
      ) : (
        <section className="rounded-lg border bg-card px-6 py-12 text-center">
          <h2 className="font-serif text-2xl text-primary">Your first CV starts here</h2>
          <p className="mt-2 text-muted-foreground">Give your draft a title, then add your experience.</p>
        </section>
      )}
    </div>
  );
}
