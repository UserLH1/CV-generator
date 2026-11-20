import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { defaultResumeAccent, resumeAccents } from "@/data/resume-theme";
import axios from "@/services/api";
import { Palette } from "lucide-react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export default function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  const { resumeId } = useParams();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const selected = resumeInfo.themeColor || defaultResumeAccent;
  const hasSavedCustomColor = !resumeAccents.some(({ value }) => value.toLowerCase() === selected.toLowerCase());

  async function selectColor(color: string) {
    if (selected === color || saving) return;
    setSaving(true);
    setError(false);
    try {
      await axios.put((import.meta.env.VITE_API_URL ?? "") + "/api/cv/updateCV/" + resumeId, { themeColor: color });
      setResumeInfo((current) => ({ ...current, themeColor: color }));
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette size={16} aria-hidden="true" /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56">
        <h2 className="mb-2 text-sm font-semibold text-primary">CV accent</h2>
        <div className="flex flex-wrap gap-1" role="group" aria-label="CV accent">
          {resumeAccents.map(({ name, value }) => (
            <button
              type="button"
              key={value}
              title={name}
              aria-label={name}
              aria-pressed={selected.toLowerCase() === value.toLowerCase()}
              disabled={saving}
              onClick={() => void selectColor(value)}
              className="grid size-9 place-items-center rounded-full border border-transparent hover:border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring aria-pressed:border-primary disabled:opacity-60"
            >
              <span className="size-5 rounded-full" style={{ backgroundColor: value }} />
            </button>
          ))}
        </div>
        {hasSavedCustomColor && (
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-3 rounded-full" style={{ backgroundColor: selected }} />
            Current custom accent
          </p>
        )}
        {error && <p role="alert" className="mt-2 text-xs text-destructive">Could not save the accent.</p>}
      </PopoverContent>
    </Popover>
  );
}
