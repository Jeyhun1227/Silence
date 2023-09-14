import { useState } from "react";
import { IconButton, InputBase, Stack } from "@mui/material";
import { InputContainer } from "./styled";
import SendIcon from "@mui/icons-material/Send";
import Upload from "./Upload";
import { useSendMessage } from "../hooks/use-message-actions";
const NewMessage = ({ userId, chatGroupId }) => {
  const [message, setMessage] = useState("");

  const sendMessageMutation = useSendMessage(userId, chatGroupId);

  const handleChange = (e) => setMessage(e.target.value);
  const handleSend = () => {
    sendMessageMutation.mutate({ message });
    setMessage("");
  };

  const isEmpty = !message?.trim();

  const handleEnter = (e) => {
    if (e.key === "Enter" && !isEmpty) handleSend();
  };

  return (
    <InputContainer>
      <InputBase fullWidth placeholder="Type message" value={message} onChange={handleChange} onKeyDown={handleEnter} />
      <Stack direction="row">
        {isEmpty && <Upload userId={userId} chatGroupId={chatGroupId} />}
        {!isEmpty && (
          <IconButton color="primary" disabled={isEmpty} onClick={handleSend}>
            <SendIcon />
          </IconButton>
        )}
      </Stack>
    </InputContainer>
  );
};

export default NewMessage;
