import { useContext } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import PersonalDetailPreview from "./Preview/PersonalDetailPreview";

const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)!;
  return (
    <div
      className="shadow-lg p-14 h-full border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      {/* Proffesional Exprerience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
};

export default PreviewSection;
