import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

interface Resume {
  id: string;
  title: string;
}

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md">
            <Notebook className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
            {resume.title || "Untitled Resume"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
