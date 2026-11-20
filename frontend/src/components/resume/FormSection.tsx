import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import EducationForm from "./Form/EducationForm";
import ExperienceForm from "./Form/ExperienceForm";
import PersonalDetails from "./Form/PersonalDetails";
import SkillsForm from "./Form/SkillsForm";
import SummaryForm from "./Form/SummaryForm";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { resumeId } = useParams();
  const [stepStatus, setStepStatus] = useState<Record<number, boolean>>({});
  // Optional steps can be skipped until the user makes a change.
  const enableNext = stepStatus[activeFormIndex] ?? activeFormIndex > 1;
  const setEnableNext = (enabled: boolean) => {
    setStepStatus((status) => ({ ...status, [activeFormIndex]: enabled }));
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <ThemeColor />
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2 text-primary-foreground border rounded"
              size="sm"
              onClick={() => setActiveFormIndex((prevIndex) => prevIndex - 1)}
            >
              Back
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < 6 && (
            <Button
              disabled={!enableNext}
              className="flex gap-2 text-primary-foreground border rounded"
              size="sm"
              onClick={() => setActiveFormIndex((prevIndex) => prevIndex + 1)}
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={setEnableNext} />
      ) : activeFormIndex == 2 ? (
        <SummaryForm enableNext={setEnableNext} />
      ) : activeFormIndex == 3 ? (
        <ExperienceForm enableNext={setEnableNext} />
      ) : activeFormIndex == 4 ? (
        <EducationForm enableNext={setEnableNext} />
      ) : activeFormIndex == 5 ? (
        <SkillsForm enableNext={setEnableNext} />
      ) : activeFormIndex == 6 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Your resume</h2>
          <Button asChild>
            <Link to={'/dashboard/resume/' + resumeId + '/view'}>Open print preview</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default FormSection;
