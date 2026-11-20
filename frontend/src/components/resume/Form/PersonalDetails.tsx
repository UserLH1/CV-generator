import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "@/services/api";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
interface PersonalDetailsProps {
  enableNext: (value: boolean) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ enableNext }) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  // @ts-ignore
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    enableNext(false);
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };


  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enableNext(false);
    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL ?? ""}/api/cv/updateCV`, {
        id: resumeId,
        firstName: resumeInfo.firstName,
        lastName: resumeInfo.lastName,
        jobTitle: resumeInfo.jobTitle,
        address: resumeInfo.address,
        phone: resumeInfo.phone,
        email: resumeInfo.email,
      });
      enableNext(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name:</label>
            <Input
              name="firstName"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name:</label>
            <Input
              name="lastName"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title:</label>
            <Input
              name="jobTitle"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address:</label>
            <Input
              name="address"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.address}
            />
          </div>

          <div>
            <label className="text-sm">Phone:</label>
            <Input
              type="tel"
              name="phone"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email:</label>
            <Input
              type="email"
              name="email"
              className="border-input rounded"
              required
              onChange={handleChange}
              defaultValue={resumeInfo.email}
            />
          </div>
        </div>
        <div className="flex justify-end">
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
  );
};

export default PersonalDetails;
