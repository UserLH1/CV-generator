import { Textarea } from '@/components/ui/textarea';

export default function TextEditor({ value, onRichTextChange }: {
  value: string;
  onRichTextChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs">
      Summary
      <Textarea value={value ?? ""}
        onChange={event => onRichTextChange(event.target.value)} />
    </label>
  );
}
