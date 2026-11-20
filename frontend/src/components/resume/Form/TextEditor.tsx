import { useContext } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

export default function TextEditor({ index, onRichTextChange }: {
  index: number;
  onRichTextChange: (value: string) => void;
}) {
  const { resumeInfo } = useContext(ResumeInfoContext)!;
  return (
    <label className="block text-xs">
      Summary
      <Textarea defaultValue={resumeInfo?.experience?.[index]?.workSummary ?? ''}
        onChange={event => onRichTextChange(event.target.value)} />
    </label>
  );
}
