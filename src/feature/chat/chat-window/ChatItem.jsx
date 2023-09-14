import { Box, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { ChatItemContent, ChatItemText, ChatItemContainer, ChatImageContainer } from "./styled";
import config from "@config/index";
import Image from "next/image";

const ChatItem = ({ content, time, avatar, name, guest, media }) => {
  return (
    <ChatItemContainer guest={guest}>
      {guest && (
        <CustomAvatar
          size="sm"
          name={name}
          alt={name}
          src={avatar && `${config.avatarBaseUrl}${avatar}`}
          sx={{ width: 30, height: 30, mr: 2, fontSize: 16 }}
        />
      )}
      <ChatItemContent guest={guest}>
        {/* <Typography variant="caption" mb={1} color="text.secondary">
          {time}
        </Typography> */}
        <ChatItemText guest={guest}>
          {media ? (
            <Box>
              <ChatImageContainer>
                <Image loader={() => `${config.supabaseStorageUrl}/public/users/${media}`} alt="Chat Image" src={`${config.supabaseStorageUrl}/public/users/${media}`} fill style={{ objectFit: "cover" }} />
              </ChatImageContainer>
              {content && (
                <Typography variant="body2" mt={1}>
                  {content}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body2">{content}</Typography>
          )}
        </ChatItemText>
      </ChatItemContent>
    </ChatItemContainer>
  );
};

export default ChatItem;
