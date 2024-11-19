import AddResume from "@/components/AddResume";
import axios from "axios";

const GetResumesList = () => 
{
  axios.get(`${import.meta.env.VITE_API_URL}/api/cv/getCVs`, {
    params: {
      email: localStorage.getItem("user"),
    }
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
}

import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    GetResumesList();
  }, []);
  return <div className="p-10 md:px-20 lg:px-32">
    <h2 className="text-3xl font-semibold">Dashboard</h2>
    <p className="text-gray-600">Welcome to your dashboard</p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10"><AddResume /></div>
    
  </div>;
};

export default Dashboard;
