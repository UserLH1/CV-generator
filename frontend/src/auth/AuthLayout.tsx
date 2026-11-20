import type { ReactNode } from "react";
import { FileText } from "lucide-react";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="mx-auto grid max-w-screen-xl gap-8 px-4 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <aside
        aria-hidden="true"
        className="hidden min-h-[34rem] items-end overflow-hidden rounded-md border bg-secondary bg-[url('/easy-cv-paper.webp')] bg-cover bg-center p-8 lg:flex"
      >
        <div className="w-full max-w-xs rounded-sm border-t-4 border-t-primary bg-card p-7 shadow-xl">
          <FileText size={23} className="mb-5 text-primary" />
          <p className="font-serif text-3xl leading-tight text-primary">Alex Morgan</p>
          <p className="mt-1 text-sm text-muted-foreground">Operations Coordinator</p>
          <div className="mt-5 border-b border-primary/25 pb-2 text-sm font-semibold text-primary">Experience</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Coordinated weekly schedules across three project teams.</p>
          <div className="mt-4 border-b border-primary/25 pb-2 text-sm font-semibold text-primary">Skills</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Project coordination · Reporting</p>
        </div>
      </aside>
      <section className="flex items-center justify-center lg:py-8" aria-labelledby="auth-title">
        <div className="w-full max-w-md rounded-md border bg-card px-5 py-8 sm:px-9 sm:py-10">
          <h1 id="auth-title" className="font-serif !text-4xl tracking-tight text-primary">{title}</h1>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          {children}
        </div>
      </section>
    </div>
  );
}
