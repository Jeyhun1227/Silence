import { alpha, styled, IconButton } from "@mui/material";

export const Header = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => props.theme.palette.grey[200]};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ChatContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export const ChatItemContainer = styled("div")`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  justify-content: ${(props) => !props.guest && "flex-end"};
`;

export const UserChatContainer = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const ChatItemContent = styled("div")`
  display: inline-flex;
  flex-direction: column;
  align-items: ${(props) => !props.guest && "flex-end"};
  max-width: 70%;
`;

export const ChatItemText = styled("div")`
  background-color: ${(props) =>
    props.guest ? props.theme.palette.grey[200] : alpha(props.theme.palette.secondary.main, 0.3)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  padding: ${(props) => props.theme.spacing(1.2, 1)};
  display: inline-block;
`;

export const InputContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  align-items: center;
`;

export const EmptyContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ImageContainer = styled("div")`
  position: relative;
  min-height: 300px;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: ${(props) => props.theme.spacing(2)};
  right: ${(props) => props.theme.spacing(2)};
  z-index: 1;
`;

export const ChatImageContainer = styled("div")`
  position: relative;
  height: 200px;
  width: 400px;
  max-width: 80vw;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  overflow: hidden;
`;
