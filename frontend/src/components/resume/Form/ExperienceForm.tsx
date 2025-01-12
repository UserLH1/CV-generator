import React from 'react'
interface ExperienceFormProps {
  enableNext: (value: boolean) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ enableNext })  => {
  return (
    <div>
    {" "}
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Experience</h2>
      <p>Enter your Experience</p>
    </div>
  </div>
  )
}

export default ExperienceForm