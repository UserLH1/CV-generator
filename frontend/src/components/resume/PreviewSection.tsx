import { useContext } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import EducationalPreview from "./Preview/EducationalPreview";
import ExperiencePreview from "./Preview/ExperiencePreview";
import PersonalDetailPreview from "./Preview/PersonalDetailPreview";
import SkillPreview from "./Preview/SkillPreview";
import SummaryPreview from "./Preview/SummaryPreview";

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
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Proffesional Exprerience */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationalPreview resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;
