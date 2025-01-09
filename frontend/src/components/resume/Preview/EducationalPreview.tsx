const EducationalPreview = ({ resumeInfo }: { resumeInfo: any }) => {
  return (
    <div>
      <div className="my-6">
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{ color: resumeInfo?.themeColor }}
        >
          Education
        </h2>
        <hr style={{ borderColor: resumeInfo?.themeColor }} className="mb-4" />
        {resumeInfo.education.map((education: any, index: number) => (
          <div key={index} className="my-4">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {education?.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {education?.degree} in {education?.major}
              <span>
                {education?.startDate} - {education?.endDate}
              </span>
            </h2>
            <p className="text-xs my-2">{education?.description}</p>
            <p className="text-xs my-2">{education?.educationSummary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalPreview;
