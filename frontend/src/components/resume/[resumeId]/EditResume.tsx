// frontend/src/components/resume/[resumeId]/EditResume.tsx

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../FormSection";
import PreviewSection from "../PreviewSection";

interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: Array<{
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummary: string;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resumeId } = useParams<{ resumeId: string }>();

  
  console.log("resumeId in edit resume page: ", resumeId);
  const [formData, setFormData] = useState({
    personalDetails: "",
    summary: "",
    experience: "",
    education: "",
  });
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo>(dummy);

  const GetResumeInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cv/${resumeId}`
      );
      console.log("response", response);
      setFormData(response.data);
      console.log("formData", formData);
      setResumeInfo(response.data); // Assuming the response matches ResumeInfo type
      setError(null);
    } catch (error) {
      console.error("Error fetching CV:", error);
      setError("Failed to load CV data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resumeId) {
      GetResumeInfo();
    }
  }, [resumeId]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }
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
