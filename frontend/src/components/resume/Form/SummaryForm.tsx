import { AiDraft } from "./AiDraft";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/services/api";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
interface SummaryFormProps {
  enableNext: (value: boolean) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(false);
  const updateSummary = (summary: string) => {
    enableNext(false);
    setResumeInfo((current) => ({ ...current, summary }));
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enableNext(false);
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL ?? ""}/api/cv/updateCV`, {
        id: resumeId,
        summary: resumeInfo.summary,
      });
      enableNext(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title </p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
          </div>
          <Textarea
            className="border-input rounded mt-5"
            value={resumeInfo.summary ?? ""}
            required
            onChange={(event) => updateSummary(event.target.value)}
          />
          <AiDraft kind="summary" role={resumeInfo.jobTitle} onApply={updateSummary} />
          <div className="mt-5 flex justify-end">
            <Button
              className="flex justify-end text-primary-foreground border rounded mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
