import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultResumeAccent } from "@/data/resume-theme";
import axios from "@/services/api";
import { FileText, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type ResumeCardProps = {
  resume: { id: string; title?: string; themeColor?: string };
  refreshData: () => void;
};

export default function ResumeCard({ resume, refreshData }: ResumeCardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);
  const resumePath = "/dashboard/resume/" + resume.id;
  const title = resume.title || "Untitled CV";

  async function deleteResume() {
    setDeleting(true);
    setError(false);
    try {
      await axios.delete((import.meta.env.VITE_API_URL ?? "") + "/api/cv/deleteCV/" + resume.id);
      setConfirmingDelete(false);
      refreshData();
    } catch {
      setError(true);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Link
        to={resumePath + "/edit"}
        aria-label={"Edit " + title}
        className="grid min-h-36 place-items-center border-b bg-secondary p-5 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span
          className="grid h-24 w-[4.5rem] place-items-center rounded-sm border border-t-4 bg-card text-primary shadow-sm"
          style={{ borderTopColor: resume.themeColor || defaultResumeAccent }}
        >
          <FileText size={24} aria-hidden="true" />
        </span>
      </Link>
      <div className="flex min-h-14 items-center justify-between gap-2 py-2 pl-4 pr-2">
        <h2 className="truncate font-medium text-primary" title={title}>{title}</h2>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={"Actions for " + title}>
              <MoreHorizontal size={18} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild><Link to={resumePath + "/edit"}>Edit</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to={resumePath + "/view"}>View and download</Link></DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setConfirmingDelete(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={confirmingDelete} onOpenChange={(open) => {
        if (!deleting) {
          setConfirmingDelete(open);
          if (open) setError(false);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this CV?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes {title} from your account.</AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p role="alert" className="text-sm text-destructive">Could not delete this CV.</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void deleteResume();
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}
