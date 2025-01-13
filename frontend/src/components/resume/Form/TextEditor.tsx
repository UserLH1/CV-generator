import { useState } from "react";
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
const TextEditor = () => {
  const [value, setValue] = useState<string>("");
  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.innerHTML);
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
  );
};

export default TextEditor;
