import { IconButton, styled } from "@mui/material";

export const UserContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[100]};
  padding: ${(props) => props.theme.spacing(2, 2, 2, 0)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  max-height: 400px;
  overflow-y: auto;
`;
export const RemoveButton = styled(IconButton)`
  position: absolute;
  background-color: ${(props) => props.theme.palette.error.main};
  top: -5px;
  right: -5px;
  height: 10px;
  width: 10px;
  z-index: 10;
  :hover {
    background-color: ${(props) => props.theme.palette.error.main};
  }

  svg {
    height: 15px;
    width: 15px;
    color:#ffffff
  }

  padding: 10px;
`;
