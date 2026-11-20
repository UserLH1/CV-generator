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
        <div className="mx-auto my-8 w-[calc(100%-2rem)] max-w-4xl">
          <h2 className="text-center font-serif text-4xl text-primary">
            Your resume
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Download a copy of your resume to share.
          </p>
          <div className="my-6 flex justify-center">
            <Button onClick={HandleDownload}>Download</Button>
          </div>
        </div>
      </div>

      {/* AceastÄƒ secÈ›iune rÄƒmÃ¢ne vizibilÄƒ È™i la print */}
      <div className="mx-auto my-8 w-[calc(100%-2rem)] max-w-4xl">
        <div id="print-area">
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
