import { useContext } from "react";
import { defaultResumeAccent } from "@/data/resume-theme";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import EducationalPreview from "./Preview/EducationalPreview";
import ExperiencePreview from "./Preview/ExperiencePreview";
import PersonalDetailPreview from "./Preview/PersonalDetailPreview";
import SkillPreview from "./Preview/SkillPreview";
import SummaryPreview from "./Preview/SummaryPreview";

const PreviewSection = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)!;
  const previewInfo = { ...resumeInfo, themeColor: resumeInfo.themeColor || defaultResumeAccent };
  return (
    <div
      className="border border-t-8 bg-card p-5 shadow-sm break-words sm:p-10 lg:p-14 print:border-x-0 print:border-b-0 print:bg-white print:p-8 print:shadow-none"
      style={{ borderTopColor: previewInfo.themeColor }}
    >
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={previewInfo} />
      {/* Summary */}
      <SummaryPreview resumeInfo={previewInfo} />
      {/* Proffesional Exprerience */}
      <ExperiencePreview resumeInfo={previewInfo} />
      {/* Education */}
      <EducationalPreview resumeInfo={previewInfo} />
      {/* Skills */}
      <SkillPreview resumeInfo={previewInfo} />
    </div>
  );
};

export default PreviewSection;
