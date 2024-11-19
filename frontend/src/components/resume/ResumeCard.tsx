import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";
const ResuneCard = ({ resume }: { resume: any }) => {
  console.log(resume.id);
  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`}>
      <div className="p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
        <div>
          <Notebook />
        </div>
        <h2 className="text-center my-1 ">{resume.title}</h2>
      </div>
    </Link>
  );
};

export default ResuneCard;
