// FormSection.tsx
import React, { ChangeEvent, useEffect, useState } from "react";

interface FormData {
  personalDetails: string;
  summary: string;
  experience: string;
  education: string;
}

interface FormSectionProps {
  onFormChange: (formData: FormData) => void;
  formData: FormData;
}

const FormSection: React.FC<FormSectionProps> = ({
  onFormChange,
  formData,
}) => {
  const [localFormData, setLocalFormData] = useState<FormData>(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
      <form className="space-y-6">
        {/* Personal Details */}
        <div>
          <label
            htmlFor="personalDetails"
            className="block text-lg font-semibold mb-2"
          >
            Personal Details
          </label>
          <input
            type="text"
            id="personalDetails"
            name="personalDetails"
            value={localFormData.personalDetails}
            onChange={handleChange}
            placeholder="Enter your full name, address, contact info"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-lg font-semibold mb-2">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={localFormData.summary}
            onChange={handleChange}
            placeholder="Brief summary about yourself"
            className="w-full p-3 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="block text-lg font-semibold mb-2"
          >
            Experience
          </label>
          <textarea
            id="experience"
            name="experience"
            value={localFormData.experience}
            onChange={handleChange}
            placeholder="Your work experience"
            className="w-full p-3 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Education */}
        <div>
          <label
            htmlFor="education"
            className="block text-lg font-semibold mb-2"
          >
            Education
          </label>
          <textarea
            id="education"
            name="education"
            value={localFormData.education}
            onChange={handleChange}
            placeholder="Your educational background"
            className="w-full p-3 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default FormSection;
