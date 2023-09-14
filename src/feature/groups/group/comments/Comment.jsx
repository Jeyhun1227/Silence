import { useState } from "react";
import { Box, IconButton, Link, MenuItem, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import MenuPopover from "components/menu-popover";
import ConfirmDialog from "components/confirm-dialog";
import Button from "components/Button";
import { CommentInfo, Content, StyledContentEditable } from "./styled";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkNode } from "@lexical/link";

import useToggle from "hooks/useToggle";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";
import { useDeleteComment } from "../hooks/use-group-action";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import NewComment from "../new-comment";
import { formatToNow } from "utils/date-formatter";
import config from "@config/index";
import UserInfo from "components/user-info";
import { formatName } from "utils/user";

export const Comment = ({ id, user, postId, text, content, createdAt, replies, level, media }) => {
  const [openPopover, setOpenPopover] = useState(null);
  const [showConfirmDelete, toggleConfirmDelete] = useToggle(false);
  const [showReply, toggleShowReply] = useToggle(false);
  const [showUserinfo, setShowUserinfo] = useState(null);

  const currentUser = useUser();

  const canDelete = currentUser.role === roles.ADMIN || currentUser.id === user.id;

  const handleClosePopover = () => setOpenPopover(null);
  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);
  const handleOpenUserInfo = (event) => setShowUserinfo(event.currentTarget);
  const handleCloseUserInfo = () => setShowUserinfo(null);

  const deleteMutation = useDeleteComment(id, media);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(null, { onSuccess: () => toggleConfirmDelete() });
  };
  return (
    <Stack direction="row" spacing={1}>
      <UserInfo open={showUserinfo} onClose={handleCloseUserInfo} userId={user?.id} />
      <CustomAvatar
        onClick={handleOpenUserInfo}
        role="button"
        sx={{ height: 32, width: 32, cursor: "pointer" }}
        name={formatName(user)}
        src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
        alt="avatar"
      />
      <Box width="100%">
        <Box display="flex" alignItems="center">
          <Content>
            <Typography variant="subtitle2" fontSize={13}>
              {formatName(user)}
            </Typography>
            {content ? (
              <LexicalComposer
                initialConfig={{ editorState: content, nodes: [MentionNode, AutoLinkNode], editable: false }}
              >
                <Box sx={{ width: "100%" }}>
                  <PlainTextPlugin contentEditable={<StyledContentEditable />} />
                </Box>
              </LexicalComposer>
            ) : (
              <Typography>{text}</Typography>
            )}
          </Content>

          {canDelete && (
            <IconButton onClick={handleOpenPopover} edge="end">
              <MoreVert fontSize="small" />
            </IconButton>
          )}
        </Box>
        {media?.length > 0 && (
          <Image
            loader={() => `${config.supabaseStorageUrl}/public/users/${media[0]}`}
            src={`${config.supabaseStorageUrl}/public/users/${media[0]}`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "300px", height: "auto" }}
            alt="post-image"
          />
        )}
        <CommentInfo direction="row" spacing={1}>
          {level < 3 && (
            <Link variant="caption" sx={{ cursor: "pointer" }} onClick={toggleShowReply}>
              Reply
            </Link>
          )}
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {formatToNow(createdAt)}
          </Typography>
        </CommentInfo>

        <Stack spacing={0}>
          {replies?.map((reply) => (
            <Comment
              key={reply.id}
              id={reply.id}
              user={reply.user}
              postId={postId}
              text={reply.text}
              createdAt={reply.createdAt}
              content={reply.content}
              replies={reply?.replies}
              media={JSON.parse(reply?.media)}
              level={level + 1}
            />
          ))}
        </Stack>
        {showReply && (
          <NewComment postId={postId} parentCommentId={id} placeholder={`Reply to ${formatName(user)}`} sx={{ mb: 2 }} />
        )}
      </Box>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="top-center" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            handleClosePopover();
            toggleConfirmDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={showConfirmDelete}
        title="Delete comment"
        content="Are you sure want to delete this comment?"
        action={
          <Button variant="contained" onClick={handleConfirmDelete} loading={deleteMutation.isLoading}>
            Confirm
          </Button>
        }
        onClose={toggleConfirmDelete}
      />
    </Stack>
  );
};
export default Comment;
