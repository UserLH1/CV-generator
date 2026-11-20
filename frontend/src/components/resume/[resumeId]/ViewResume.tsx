import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewSection from "../PreviewSection";

import "./ViewResume.css"; // importul fiÈ™ierului de CSS

function ViewResume() {
  const [loading, setLoading] = useState(true);
  const { resumeId } = useParams<{ resumeId: string }>();
  const [resumeInfo, setResumeInfo] = useState<any>(null);

  // Fetch resume info from the API
  useEffect(() => {
    const GetResumeInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL ?? ""}/api/cv/getCV/${resumeId}`
        );
        setResumeInfo(response.data);
      } catch (error) {
        console.error("Error fetching resume info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      GetResumeInfo();
    }
  }, [resumeId]);

  // Log updated resumeInfo
  useEffect(() => {
    if (resumeInfo) {

    }
  }, [resumeInfo]);

  // Trigger the browser's print dialog
  const HandleDownload = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resumeInfo) {
    return <div>Error loading resume. Please try again later.</div>;
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {/* AceastÄƒ secÈ›iune e ascunsÄƒ la print */}
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your resume
          </h2>
          <p className="text-center text-gray-400">
            Download a copy of your resume to share.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
          </div>
        </div>
      </div>

      {/* AceastÄƒ secÈ›iune rÄƒmÃ¢ne vizibilÄƒ È™i la print */}
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
