import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { AIChatSession } from "../../../services/GenAIService";
interface SummaryFormProps {
  enableNext: (value: boolean) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ enableNext }) => {
  // @ts-ignore
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<any[]>([]);
  const { resumeId } = useParams<{ resumeId: string }>();

  const prompt =
    "Job Title: {jobTitle}. Based on the job title write a summary for my resume within 4-5 lines in a professional manner and in JSON format with field experience level and summary with experience level for junior, mid-level, senior.";
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    enableNext(false);
    setResumeInfo({
      ...resumeInfo,
      summary: e.target.value,
    });
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summary: "",
    });
  }, []);

  useEffect(() => {
    if (resumeInfo.firstName && resumeInfo.lastName && resumeInfo.jobTitle) {
      enableNext(true);
    }
  }, [resumeInfo, enableNext]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummary(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enableNext(false);
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/cv/updateCV`, {
        id: resumeId,
        ...resumeInfo,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title </p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-primary rounded text-primary flex gap-2"
              onClick={() => GenerateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" />
              Generate with AI
            </Button>
          </div>
          <Textarea
            className="border-gray-300 rounded mt-5"
            required
            onChange={handleChange}
          />
          <div className="mt-5 flex justify-end">
            <Button
              className="flex justify-end text-white border rounded mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
        {aiGeneratedSummary.length > 0 && (
          <div>
            <h2 className="font-bold text-lg  mt-5">Suggestions:</h2>
            {aiGeneratedSummary.map((summary: any, index: number) => (
              <div
                key={index}
                className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5"
              >
                <h3 className="font-bold text-lg my-1">
                  Experience Level: {summary.experience_level}
                </h3>
                <p>{summary.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryForm;
