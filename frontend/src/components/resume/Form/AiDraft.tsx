import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/services/api";
import { isAxiosError } from "axios";
import { Sparkles } from "lucide-react";
import { useState } from "react";

type AiDraftProps = {
  kind: "summary" | "experience";
  role?: string;
  onApply: (draft: string) => void;
};

export function AiDraft({ kind, role, onApply }: AiDraftProps) {
  const [open, setOpen] = useState(false);
  const [roleOverride, setRoleOverride] = useState<string>();
  const [notes, setNotes] = useState("");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const draftRole = roleOverride ?? role ?? "";

  async function generate() {
    if (busy || !draftRole.trim() || !notes.trim()) return;
    setBusy(true);
    setError("");
    setDraft("");
    try {
      const { data } = await axios.post<{ draft: string }>(
        (import.meta.env.VITE_API_URL ?? "") + "/api/cv/ai/draft",
        { kind, role: draftRole, notes },
        { timeout: 18000 },
      );
      setDraft(data.draft);
    } catch (failure) {
      const message = isAxiosError<{ message?: string }>(failure) && failure.response?.data?.message;
      setError(message || "Could not generate a draft. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-2 space-y-3">
      <Button type="button" variant="outline" size="sm" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Sparkles aria-hidden="true" /> Generate with AI
      </Button>
      {open && (
        <div className="space-y-3 rounded-md border p-3 text-sm">
          <label className="block">
            Role
            <Input className="mt-1" value={draftRole} disabled={busy} maxLength={120} onChange={(event) => setRoleOverride(event.target.value)} />
          </label>
          <label className="block">
            Notes for Gemini
            <Textarea className="mt-1" value={notes} disabled={busy} maxLength={1600} onChange={(event) => setNotes(event.target.value)}
              placeholder="Add relevant responsibilities, skills, or results you can verify." />
          </label>
          <p className="text-muted-foreground">The role and notes above are sent to Google Gemini when you request a draft. Leave out names and contact details.</p>
          <Button type="button" size="sm" disabled={busy || !draftRole.trim() || !notes.trim()} onClick={() => void generate()}>
            {busy ? "Generating…" : "Draft with Gemini"}
          </Button>
          {error && <p role="alert" className="text-destructive">{error}</p>}
          {draft && (
            <div className="space-y-2 border-t pt-3">
              <p className="font-medium">Suggested draft</p>
              <p className="whitespace-pre-wrap break-words">{draft}</p>
              <p className="text-muted-foreground">Check the facts before replacing your field with this draft.</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={() => {
                  onApply(draft);
                  setDraft("");
                  setOpen(false);
                }}>Use draft</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setDraft("")}>Discard draft</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
