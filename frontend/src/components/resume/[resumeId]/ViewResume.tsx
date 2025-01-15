import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

import "./ViewResume.css"; // importul fișierului de CSS

function ViewResume() {
  const [loading, setLoading] = useState(true);
  const { resumeId } = useParams<{ resumeId: string }>();
  const [resumeInfo, setResumeInfo] = useState<any>(null);

  // Fetch resume info from the API
  useEffect(() => {
    const GetResumeInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cv/getCV/${resumeId}`
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
      console.log("Updated resumeInfo in view resume page", resumeInfo);
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
      {/* Această secțiune e ascunsă la print */}
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI Generated Resume is Ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and share the unique URL
            with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                url: `${
                  import.meta.env.VITE_BASE_URL
                }/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName || ""} ${
                  resumeInfo?.lastName || ""
                }'s Resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      {/* Această secțiune rămâne vizibilă și la print */}
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <p className="text-center text-gray-400">
            Resume preview is currently disabled.
          </p>
          {/* 
            Aici poți include preview-ul real al CV-ului, 
            ex. <ResumePreview /> sau alt component ce afișează conținutul.
          */}
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
