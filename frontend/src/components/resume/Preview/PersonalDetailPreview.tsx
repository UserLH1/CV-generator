const PersonalDetailPreview = ({ resumeInfo }: { resumeInfo: any }) => {
  return (
    <div>
      {/* Full name */}
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}{" "}
      </h2>

      {/* JobTitle*/}
      <h2
        className="text-center text-sm font-medium"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.jobTitle}
      </h2>

      {/* Address */}
      <h2
        className="text-center font-normal text-xs"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address}
      </h2>

      {/* Contact */}
      <div className="flex justify-between">
        {/* Phone */}
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.phone}
        </h2>

        {/* Email */}
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      ></hr>
    </div>
  );
};

export default PersonalDetailPreview;
