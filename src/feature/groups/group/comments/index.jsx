import { useState } from "react";
import { Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "components/Button";
import { useComments } from "../hooks/use-comments";
import Comment from "./Comment";

const getNew3 = (arr) => {
  if (arr?.length < 4) return arr;
  return arr?.slice(arr.length - 3, arr.length);
}

export const Comments = ({ postId, commentCount }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComment = () => setShowComments(!showComments);
  const comments = useComments(postId, showComments);
  return (
    <div>
      <Stack spacing={1} sx={{ mt: 3 }}>
        {showComments && (
          comments.data?.sort((a, b) => b.id - a.id).map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              postId={postId}
              text={comment.text}
              createdAt={comment.createdAt}
              content={comment.content}
              replies={comment.replies}
              level={1}
              media={JSON.parse(comment.media)}
            />
          ))
        )}
        {!showComments && (
          getNew3(comments.data)?.sort((a, b) => b.id - a.id).map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              postId={postId}
              text={comment.text}
              createdAt={comment.createdAt}
              content={comment.content}
              replies={null}
              level={1}
              media={JSON.parse(comment.media)}
            />
          ))
        )}
      </Stack>
      <Button
        variant="text"
        color="primary"
        onClick={toggleComment}
        endIcon={ showComments ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        View more comments
      </Button>
    </div>
  );
};
export default Comments;
