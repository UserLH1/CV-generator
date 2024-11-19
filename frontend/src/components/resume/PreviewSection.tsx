// PreviewSection.tsx
import React from "react";

interface FormData {
  personalDetails: string;
  summary: string;
  experience: string;
  education: string;
}

interface PreviewSectionProps {
  formData: FormData;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ formData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Preview</h2>
      <div className="space-y-8">
        {/* Personal Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
          <p className="text-gray-700">{formData.personalDetails}</p>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {formData.summary}
          </p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {formData.experience}
          </p>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {formData.education}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
