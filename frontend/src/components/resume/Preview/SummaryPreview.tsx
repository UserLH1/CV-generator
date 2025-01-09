const SummaryPreview = ({ resumeInfo }: { resumeInfo: any }) => {
  return (
    <div>
      <p className="text-xs ">{resumeInfo?.summary}</p>
    </div>
  );
};

export default SummaryPreview;
