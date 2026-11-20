import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "@/services/api";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface SkillsFormProps {
  id?: number;
  name: string;
  rating: number;
}

const SkillsForm: React.FC<{ enableNext: (value: boolean) => void }> = ({ enableNext }) => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  const [skillsList, setSkillsList] = useState<SkillsFormProps[]>(() => resumeInfo.skills);

  // Update resumeInfo whenever skillsList changes
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList.map((skill, index) => ({ ...skill, id: skill.id ?? index })),
    }));
  }, [skillsList, setResumeInfo]);

  const handleChange = (
    index: number,
    name: keyof SkillsFormProps,
    value: number | string
  ) => {
    enableNext(false);
    const newEntries = skillsList.slice();
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    enableNext(false);
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    enableNext(false);
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL ?? ""}/api/cv/updateCV`, {
        id: resumeId,
        skills: skillsList,
      });
      enableNext(true);
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Server Error, Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-t-4 border-t-primary bg-card p-5 shadow-sm">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="flex flex-wrap items-center justify-between gap-2 mb-2 border rounded-lg p-3">
            <div className="min-w-0 flex-1">
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v: number) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;
