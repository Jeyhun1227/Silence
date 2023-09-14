import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { CommentInfo, Content, StyledContentEditable } from "./styled";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkNode } from "@lexical/link";

import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { formatToNow } from "utils/date-formatter";
import config from "@config/index";
import UserInfo from "components/user-info";
import { formatName } from "utils/user";

export const Comment = ({ user, content, createdAt }) => {
  const [showUserinfo, setShowUserinfo] = useState(null);

  const handleOpenUserInfo = (event) => setShowUserinfo(event.currentTarget);
  const handleCloseUserInfo = () => setShowUserinfo(null);

  return (
    <Stack direction="row" spacing={1}>
      <UserInfo open={showUserinfo} onClose={handleCloseUserInfo} userId={user.id} />
      <CustomAvatar
        onClick={handleOpenUserInfo}
        role="button"
        sx={{ height: 32, width: 32, cursor: "pointer" }}
        name={formatName(user)}
        src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
      />
      <Box width="100%">
        <Box display="flex" alignItems="center">
          <Content>
            <Typography variant="subtitle2" fontSize={13}>
              {formatName(user)}
            </Typography>

            <LexicalComposer
              initialConfig={{ editorState: content, nodes: [MentionNode, AutoLinkNode], editable: false }}
            >
              <Box sx={{ width: "100%" }}>
                <PlainTextPlugin contentEditable={<StyledContentEditable />} />
              </Box>
            </LexicalComposer>
          </Content>
        </Box>
        <CommentInfo direction="row" spacing={1}>
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {formatToNow(createdAt)}
          </Typography>
        </CommentInfo>
      </Box>
    </Stack>
  );
};
export default Comment;
