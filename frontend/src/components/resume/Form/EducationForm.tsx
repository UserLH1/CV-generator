import axios from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Education({ enableNext }: { enableNext: (value: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  const { resumeId } = useParams<{ resumeId: string }>();
  const [educationalList, setEducationalList] = useState<EducationEntry[]>(() => resumeInfo.education);

  interface EducationEntry {
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  type HandleChangeEvent = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >;

  const handleChange = (event: HandleChangeEvent, index: number) => {
    enableNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name as keyof EducationEntry] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    enableNext(false);
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    enableNext(false);
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = async () => {
    setLoading(true);
    try {
      await axios.put((import.meta.env.VITE_API_URL ?? "") + "/api/cv/updateCV", { id: resumeId, education: educationalList });
      enableNext(true);
    } catch {
      alert("Could not save education.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo((current) => ({
      ...current,
      education: educationalList.map((entry, index) => ({ id: index, ...entry })),
    }));
  }, [educationalList, setResumeInfo]);
  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="sm:col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
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
}

export default Education;
