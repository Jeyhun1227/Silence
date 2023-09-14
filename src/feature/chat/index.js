import { Paper, Box, Card } from "@mui/material";
import React from "react";
import ChatWindow from "./chat-window";
import List from "./List";

const Chat = () => {
  return (
    <>
      <Card sx={{ flex: 1, maxHeight: "calc(100vh - 150px)" }}>
        <Box display="flex" sx={{ height: "100%" }}>
          <List />
          <ChatWindow />
        </Box>
      </Card>
    </>
  );
};

export default Chat;
