const ExperiencePreview = ({ resumeInfo }: { resumeInfo: any }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Proffesional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} className="mb-4" />

      {resumeInfo?.experience.map((experience: any, index: number) => (
        <div key={index} className="my-4">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}{" "}
            <span>
              {experience?.startDate},{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <p className="text-xs my-2">{experience?.workSummary}</p>
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;