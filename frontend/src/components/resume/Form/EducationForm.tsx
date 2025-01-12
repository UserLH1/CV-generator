import React from 'react'
interface EducationFormProps {
  enableNext: (value: boolean) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({enableNext}) => {
  return (
    <div>
    {" "}
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Get Started with the basic information</p>
    </div>
  </div>
  )
}

export default EducationForm