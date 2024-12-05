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
        setResumes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetResumesList();
  }, []);

  return (
    <div className="p-6 md:p-10 lg:p-16 bg-gray-50 min-h-screen mt-28">
      <header className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-lg text-gray-600 mt-2">
          Welcome back, {localStorage.getItem("user") || "User"}!
        </p>
      </header>

      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Your Resumes</h3>
          <AddResume />
        </div>

        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resumes.map((resume, index) => (
              <ResumeCard resume={resume} key={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">You have no resumes yet.</p>
            <div className="mt-6">
              <AddResume />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
