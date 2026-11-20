import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/services/api";
import { Loader2, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function AddResume() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function createResume(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || creating) return;
    setCreating(true);
    setError(false);
    try {
      const response = await axios.post((import.meta.env.VITE_API_URL ?? "") + "/api/cv/createCV", {
        title: title.trim(),
      });
      setOpen(false);
      navigate("/dashboard/resume/" + response.data.id + "/edit");
    } catch {
      setError(true);
    } finally {
      setCreating(false);
    }
  }

  return (
    <>
      <Button type="button" aria-label="Add resume" className="gap-2" onClick={() => {
        setTitle("");
        setError(false);
        setOpen(true);
      }}>
        <Plus size={16} aria-hidden="true" />
        New CV
      </Button>
      <Dialog open={open} onOpenChange={(next) => {
        if (!creating) setOpen(next);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new CV</DialogTitle>
            <DialogDescription>Give your draft a title.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={createResume}>
            <label className="block text-sm font-medium">
              CV title
              <Input
                className="mt-1"
                placeholder="Ex: CV Full Stack"
                maxLength={160}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={creating}
                required
              />
            </label>
            {error && <p role="alert" className="text-sm text-destructive">Could not create the CV. Try again.</p>}
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setOpen(false)} variant="ghost" disabled={creating}>Cancel</Button>
              <Button type="submit" disabled={!title.trim() || creating}>
                {creating ? <Loader2 aria-label="Creating CV" className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
