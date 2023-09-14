import { Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { useUser } from "feature/auth/context";

import { useCreateComment } from "../hooks/use-comment";
import { useResponsive } from "hooks/useResponsive";
import config from "@config/index";
import CommentInput from "components/comment-input";
import { useDispatch } from "react-redux";
import { changeState } from "store/slices/commentSlice";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useSnackbar } from "notistack";

const NewComment = ({ postId, parentCommentId, placeholder, sx }) => {
  const user = useUser();

  const dispatch = useDispatch();
  const { mobile } = useResponsive();
  const commentMutation = useCreateComment(postId);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (editorState, files, editor) => {

    commentMutation.mutate(
      {userId: user.id, parentCommentId: parentCommentId, postId: postId, content: JSON.stringify(editorState.toJSON()), media: files },
      {
        onSuccess: () => {
          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          dispatch(changeState());
        },
        onError: () => {
          enqueueSnackbar("An error occured! Please try again!", { variant: "error" });
        }
      }
    );
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
      {!mobile && (
        <CustomAvatar
          sx={{ height: 32, width: 32 }}
          name={user.firstName}
          src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
          alt="avatar"
        />
      )}
      <CommentInput onSubmit={handleSubmit} placeholder={placeholder} />
    </Stack>
  );
};

export default NewComment;
