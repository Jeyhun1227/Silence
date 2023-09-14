import EditorCapturePlugin from "components/lexical/editor-capture-plugin";
import { useRef, useState, forwardRef } from "react";
import { useSearchUser } from "./use-search-user";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SubmitPlugin from "components/lexical/submit-plugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { AutoLinkNode } from "@lexical/link";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import MentionsPlugin from "components/lexical/mentions-plugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $isRootTextContentEmptyCurry } from "@lexical/text";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { InputContainer, Placeholder, Send, StyledContentEditable } from "./styled";
import useToggle from "hooks/useToggle";
import Button from "components/Button";
import { useCreatePost } from "../hooks/use-post-action";
import { useRouter } from "next/router";
import Upload from "./Upload";
import { useUser } from "feature/auth/context";

//TODO update regex to match any url
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
      attributes: { rel: "noopener", target: "_blank" },
    };
  },
];

const editorConfig = {
  onError(error) {
    throw error;
  },
  nodes: [MentionNode, AutoLinkNode],
};

const Input = forwardRef(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [showFiles, toggleFiles] = useToggle(false);
  const [files, setFiles] = useState([]);

  const editorRef = useRef();
  const user = useUser();

  const router = useRouter();
  const { id: groupId } = router.query;

  const searchUserQuery = useSearchUser(searchQuery);

  const createPostMutation = useCreatePost(groupId);

  const checkEmpty = () => {
    const editor = editorRef.current;
    const isComposing = editor.isComposing();
    const editorState = editor.getEditorState();
    return editorState.read($isRootTextContentEmptyCurry(isComposing, true));
  };

  const handleChange = () => setIsEmpty(checkEmpty());

  const handleSubmit = () => {
    if (!checkEmpty()) {
      const editor = editorRef.current;
      const editorState = editor.getEditorState();

      createPostMutation.mutate(
        { userId: user.id, groupId, content: JSON.stringify(editorState.toJSON()), files },
        {
          onSuccess: () => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
            setFiles([]);
            if (showFiles) toggleFiles();
          },
        }
      );
    }
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <LexicalComposer initialConfig={editorConfig}>
        <EditorCapturePlugin ref={editorRef} />
        <InputContainer>
          <PlainTextPlugin
            contentEditable={<StyledContentEditable />}
            placeholder={
              <Placeholder>
                <Typography color="text.disabled">What's on your mind..</Typography>
              </Placeholder>
            }
          />
        </InputContainer>

        <AutoLinkPlugin matchers={MATCHERS} />
        <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchQuery} />
        <SubmitPlugin onSubmit={handleSubmit} />
        <ClearEditorPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
      {!showFiles && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <IconButton onClick={toggleFiles}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Box>
      )}
      {showFiles && <Upload onChangeFiles={setFiles} files={files} />}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button disabled={isEmpty} onClick={handleSubmit} loading={createPostMutation.isLoading}>
          Post
        </Button>
      </Box>
    </Card>
  );
});

export default Input;
