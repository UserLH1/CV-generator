import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/services/api";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import TextEditor from "./TextEditor";

interface ExperienceFormProps {
  enableNext: (value: boolean) => void;
}

const emptyExperience = () => ({
  id: 0,
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummary: "",
});

const ExperienceForm: React.FC<ExperienceFormProps> = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  const [experienceList, setExperienceList] = useState(() =>
    resumeInfo.experience.length ? resumeInfo.experience : [emptyExperience()]
  );
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams<{ resumeId: string }>();

  const updateExperience = (index: number, name: string, value: string) => {
    enableNext(false);
    setExperienceList((entries) =>
      entries.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [name]: value } : entry
      )
    );
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    updateExperience(index, event.target.name, event.target.value);
  };

  const addExperience = () => {
    enableNext(false);
    setExperienceList((entries) => [...entries, emptyExperience()]);
  };

  const removeExperience = () => {
    enableNext(false);
    setExperienceList((entries) => entries.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo((current) => ({ ...current, experience: experienceList }));
  }, [experienceList, setResumeInfo]);

  const onSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL ?? ""}/api/cv/updateCV`, {
        id: resumeId,
        experience: experienceList,
      });
      enableNext(true);
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Server Error, Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-6 rounded-lg border border-t-4 border-t-primary bg-card p-5 shadow-sm">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((experience, index) => (
            <div key={index} className="mt-5">
              <div className="grid grid-cols-2 gap-3 border-input rounded p-3 mt-5">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    className="border-input rounded"
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.title}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    className="border-input rounded"
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.companyName}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input
                    className="border-input rounded"
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.city}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input
                    className="border-input rounded"
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.state}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    className="border-input rounded text-gray-500"
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End date</label>
                  <Input
                    className="border-input rounded text-gray-500"
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={experience.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <TextEditor
                    value={experience.workSummary}
                    onRichTextChange={(value) =>
                      updateExperience(index, "workSummary", value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-3">
            <div>
              <Button
                className="border-gray-400 rounded mt-3 text-primary "
                type="button"
                variant="outline"
                onClick={addExperience}
              >
                + Add More Experience
              </Button>

              <Button
                className="border-gray-400 rounded mt-3 text-primary "
                type="button"
                variant="outline"
                onClick={removeExperience}
                disabled={experienceList.length === 0}
              >
                - Remove
              </Button>
            </div>
            <Button
              className="flex justify-end text-primary-foreground border rounded mt-3"
              type="submit"
              disabled={loading}
              onClick={onSave}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
