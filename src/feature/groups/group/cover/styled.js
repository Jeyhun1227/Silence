import { Button, ButtonBase, Card, IconButton, styled } from "@mui/material";

export const CoverContainer = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;
export const CoverPhotoContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[300]};
  min-height: 250px;
  position: relative;
`;
export const AvatarContainer = styled("div")`
  position: absolute;
  left: ${(props) => props.theme.spacing(5)};
  bottom: ${(props) => props.theme.spacing(8)};
  display: flex;
  align-items: flex-end;
  z-index: 1;
`;
export const NameContainer = styled("div")`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

export const EditAvatarButton = styled(Button)`
  background-color: #ffffff;
  align-items: center;
  display: flex;
  position: absolute;
  bottom: ${(props) => props.theme.spacing(2)};
  right: ${(props) => props.theme.spacing(2)};
  z-index: 1;
`;