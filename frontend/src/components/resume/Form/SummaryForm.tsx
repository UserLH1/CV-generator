import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useContext, useState } from "react";
import axios from "axios";
import { Brain, LoaderCircle } from "lucide-react";
interface SummaryFormProps {
  enableNext: (value: boolean) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ enableNext })  => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
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


  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enableNext(false);
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/cv/updateCV`, {
        id: resumeInfo.id, // Or however you store the CV id
        ...resumeInfo,
        
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

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
            >
              <Brain className="h-4 w-4"/>
              Generate with AI
            </Button>
          </div>
          <Textarea
            className="border-gray-400 rounded mt-5" required
            onChange={handleChange}
          />
          <div className="mt-5 flex justify-end">
          <Button className='flex justify-end text-white border rounded mt-3' type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
