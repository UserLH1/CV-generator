import ExperienceForm from "./Form/ExperienceForm";
import PersonalDetails from "./Form/PersonalDetails";
import SummaryForm from "./Form/SummaryForm";
import EducationForm from "./Form/EducationForm";
import SkillsForm from "./Form/SkillsForm";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" className="flex gap-2 border rounded"><LayoutGrid/>Theme</Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && <Button className="flex gap-2 text-white border rounded" size="sm" onClick={() => setActiveFormIndex(prevIndex => prevIndex - 1)}>Back<ArrowLeft/></Button>}
          <Button className="flex gap-2 text-white border rounded" size="sm" onClick={() => setActiveFormIndex(prevIndex => prevIndex + 1)}>Next<ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex==1?<PersonalDetails />:null}
      {/* Summary */}
      <SummaryForm />
      {/* Experience */}
      <ExperienceForm />
      {/* Education */}
      <EducationForm />
      {/* Skills */}
      <SkillsForm />
    </div>
  );
};

export default FormSection;
