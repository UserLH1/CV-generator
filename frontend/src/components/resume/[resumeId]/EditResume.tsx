// EditResume.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../FormSection";
import PreviewSection from "../PreviewSection";

interface FormData {
  personalDetails: string;
  summary: string;
  experience: string;
  education: string;
}

const EditResume: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    personalDetails: "",
    summary: "",
    experience: "",
    education: "",
  });

  const { resumeId } = useParams<{ resumeId: string }>();

  const handleFormChange = (updatedFormData: FormData) => {
    setFormData(updatedFormData);
  };

  useEffect(() => {
    // Fetch data for the resume
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cv/${resumeId}`)
      .then((response) => {
        setFormData(response.data);
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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <FormSection formData={formData} onFormChange={handleFormChange} />
      </div>
      <div className="md:w-1/2">
        <PreviewSection formData={formData} />
      </div>
      <div className="mt-4">
        <button
          onClick={handleSaveResume}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default EditResume;
