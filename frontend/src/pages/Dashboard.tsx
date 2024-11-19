import AddResume from "@/components/AddResume";
import ResumeCard from "@/components/resume/ResumeCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);

  const GetResumesList = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cv/getCVs`, {
        params: {
          email: localStorage.getItem("user"),
        },
      })
      .then((response) => {
        console.log(response);
        setResumes(response.data); // Update resumes state with fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetResumesList();
  }, []);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <p className="text-gray-600">Welcome to your dashboard</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumes.length > 0 &&
          resumes.map((resume, index) => (
            <ResumeCard resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
