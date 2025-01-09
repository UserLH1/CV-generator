// frontend/src/components/resume/[resumeId]/EditResume.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormSection from "../FormSection";
import PreviewSection from "../PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";

interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summery: string;
  experience: Array<{
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  }>;
  education: Array<{
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    rating: number;
  }>;
}

const EditResume: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [formData, setFormData] = useState({
    personalDetails: "",
    summary: "",
    experience: "",
    education: "",
  });
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo>(dummy);

  useEffect(() => {
    // Fetch data for the resume
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cv/${resumeId}`)
      .then((response) => {
        setFormData(response.data);
        setResumeInfo(response.data.resumeInfo); // Adjust based on your API response
      })
      .catch((error) => {
        console.error(error);
      });
  }, [resumeId]);

  const handleSaveResume = () => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/cv/${resumeId}`, formData)
      .then((response) => {
        alert("Resume saved successfully");
      })
      .catch((error) => {
        console.error("Error saving resume:", error);
      });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        <FormSection />
        <PreviewSection />
        <button onClick={handleSaveResume}>Save Resume</button>{" "}
        {/* Example Save Button */}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
