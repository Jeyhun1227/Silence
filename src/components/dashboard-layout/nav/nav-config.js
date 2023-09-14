import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Groups2Icon from "@mui/icons-material/Groups2";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SourceIcon from "@mui/icons-material/Source";
import SlideshowIcon from "@mui/icons-material/Slideshow";

const navConfig = [
  {
    items: [
      { title: "Home", path: "/", icon: <HomeIcon /> },
      { title: "Content", path: "/content", icon: <SourceIcon /> },
      { title: "Live Streams", path: "/live-stream", icon: <SlideshowIcon /> },
      { title: "Meeting Rooms", path: "/groups", icon: <Groups2Icon /> },
      { title: "Chat", path: "/chat", icon: <ChatBubbleIcon /> },

      {
        title: "User",
        path: "/user",
        icon: <AccountCircleIcon />,
        children: [
          { title: "Profile", path: "/user/profile" },
          { title: "Symptoms", path: "/user/symptoms" },
        ],
      },
    ],
  },
];

export default navConfig;
