import { AiDraft } from './AiDraft';
import { Textarea } from '@/components/ui/textarea';

export default function TextEditor({ value, role, onRichTextChange }: {
  value: string;
  role?: string;
  onRichTextChange: (value: string) => void;
}) {
  return (
    <>
      <label className="block text-xs">
        Summary
        <Textarea value={value ?? ""}
          onChange={event => onRichTextChange(event.target.value)} />
      </label>
      <AiDraft kind="experience" role={role} onApply={onRichTextChange} />
    </>
  );
}
