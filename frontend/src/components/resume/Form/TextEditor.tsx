import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { AIChatSession } from "../../../services/GenAIService";

interface TextEditorProps {
  index: number;
  onRichTextChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ index, onRichTextChange }) => {
  const [value, setValue] = useState<string>("");
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const PROMPT = `
    Position Title: {positionTitle}. 
    Based on the position title, generate 5-7 bullet points for my resume experience. 
    Each bullet point should be concise and relevant to the position. 
    Provide the response in JSON format with the following structure:
    {
      "position_title": "{positionTitle}",
      "bullet_points": [
        "Bullet point 1",
        "Bullet point 2",
        "Bullet point 3",
        "Bullet point 4",
        "Bullet point 5",
        "Bullet point 6",
        "Bullet point 7"
      ]
    }
  `;

  const GenerateSummaryFromAi = async () => {
    setLoading(true);
    if (!resumeInfo?.experience || !resumeInfo.experience[index]?.title) {
      alert("Please enter the job title first");
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const parsedResult = JSON.parse(result.response.text());
      setAiGeneratedSummary(parsedResult.bullet_points);
      setValue(parsedResult.bullet_points.join("\n"));
      onRichTextChange(parsedResult.bullet_points.join("\n"));
    } catch (error) {
      console.error("Error generating summary from AI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary:</label>
        <Button
          onClick={GenerateSummaryFromAi}
          variant="outline"
          className="flex gap-2 border-primary rounded text-primary"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.innerHTML);
            onRichTextChange(e.currentTarget.innerHTML);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <HtmlButton />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default TextEditor;
