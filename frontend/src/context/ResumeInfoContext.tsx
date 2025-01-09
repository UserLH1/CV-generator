// frontend/src/context/ResumeInfoContext.tsx

import { createContext } from "react";

// Define the shape of the context
interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summery: string;
  experience: Array<{
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  }>;
  education: Array<{
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    name: string;
    rating: number;
  }>;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
}

// Initialize context with the defined type or null
export const ResumeInfoContext = createContext<ResumeInfoContextType | null>(
  null
);
