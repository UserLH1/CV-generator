import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import EducationForm from "./Form/EducationForm";
import ExperienceForm from "./Form/ExperienceForm";
import PersonalDetails from "./Form/PersonalDetails";
import SkillsForm from "./Form/SkillsForm";
import SummaryForm from "./Form/SummaryForm";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border rounded"
        >
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2 text-white border rounded"
              size="sm"
              onClick={() => setActiveFormIndex((prevIndex) => prevIndex - 1)}
            >
              Back
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 text-white border rounded"
            size="sm"
            onClick={() => setActiveFormIndex((prevIndex) => prevIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <SummaryForm enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <ExperienceForm enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <EducationForm enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <SkillsForm enableNext={(v) => setEnableNext(v)} />
      ) : null}
    </div>
  );
};

export default FormSection;
