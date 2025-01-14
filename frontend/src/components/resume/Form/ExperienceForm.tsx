import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import TextEditor from "./TextEditor";

interface ExperienceFormProps {
  enableNext: (value: boolean) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ enableNext }) => {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  };

  const [experienceList, setExperienceList] = React.useState([formField]);
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name as keyof typeof formField] = value;
    setExperienceList(newEntries);
  };

  const addExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const removeExperience = () => {
    const list = [...experienceList];
    list.pop();
    setExperienceList(list);
  };

  const handleRichTextEditor = (value: string, name: string, index: number) => {
    const newEntries = experienceList.slice();
    newEntries[index][name as keyof typeof formField] = value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Proffesional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((experience, index) => (
            <div key={index} className="mt-5">
              <div className="grid grid-cols-2 gap-3 border-gray-300 rounded p-3 mt-5">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    className="border-gray-300 rounded"
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    className="border-gray-300 rounded"
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input
                    className="border-gray-300 rounded"
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input
                    className="border-gray-300 rounded"
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    className="border-gray-300 rounded text-gray-500"
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">End date</label>
                  <Input
                    className="border-gray-300 rounded text-gray-500"
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <TextEditor
                    index={index}
                    onRichTextChange={(value: string) =>
                      handleRichTextEditor(value, "workSummary", index)
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
                variant={"outline"}
              >
                <p className="font-semibold" onClick={addExperience}>
                  + Add More Experience
                </p>
              </Button>

              <Button
                className="border-gray-400 rounded mt-3 text-primary "
                variant={"outline"}
              >
                <p className="font-semibold" onClick={removeExperience}>
                  - Remove
                </p>
              </Button>
            </div>
            <Button
              className="flex justify-end text-white border rounded mt-3"
              type="submit"
              disabled={loading}
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
