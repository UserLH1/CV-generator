import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface SkillsFormProps {
  name: string;
  rating: number;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ enableNext }) => {
  const [skillsList, setSkillsList] = useState<SkillsFormProps[]>([
    {
      name: "",
      rating: 0,
    },
  ]);

  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Sync resumeInfo skills with local state on mount
  useEffect(() => {
    if (resumeInfo) {
      setSkillsList(resumeInfo.skills);
    }
  }, []);

  // Update resumeInfo whenever skillsList changes
  useEffect(() => {
    setResumeInfo((prev: { skills: SkillsFormProps[] }) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  const handleChange = (
    index: number,
    name: keyof SkillsFormProps,
    value: number | string
  ) => {
    const newEntries = skillsList.slice();
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);
    console.log("skillsLis ", skillsList, " id ", resumeId);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/cv/updateCV`, {
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
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between mb-2 border rounded-lg p-3 ">
            <div>
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
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
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
