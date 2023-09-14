import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, forwardRef } from "react";

const EditorCapturePlugin = forwardRef((_, ref) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    ref.current = editor;
    return () => {
      ref.current = null;
    };
  }, [editor, ref]);

  return null;
});

export default EditorCapturePlugin;
