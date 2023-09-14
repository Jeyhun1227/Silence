import React from "react";
import dynamic from "next/dynamic";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ChatProvider = dynamic(() => import('feature/chat/context'));
const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const Chat = dynamic(() => import('feature/chat'));

const ChatPage = () => {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
};

export default ChatPage;

ChatPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="xl" title="Chat">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;
