import CommentInput from "components/comment-input";
import { useNewComment } from "../hooks/use-comment";
import { useUser } from "feature/auth/context";
import { Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { formatName } from "utils/user";
import config from "@config/index";

const NewComment = ({ parentCommentId, liveStreamId }) => {
  const user = useUser();
  const newCommentMutation = useNewComment(liveStreamId);
  const handleSubmit = (editorState) => {
    newCommentMutation.mutate({
      userId: user.id,
      parentCommentId,
      liveStreamId,
      content: JSON.stringify(editorState.toJSON()),
    });
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <CustomAvatar
        sx={{ height: 32, width: 32 }}
        name={formatName(user)}
        src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
      />

      <CommentInput onSubmit={handleSubmit} />
    </Stack>
  );
};

export default NewComment;
