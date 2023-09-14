import { IconButton, styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const StyledContentEditable = styled(ContentEditable)`
  padding: ${(props) => props.theme.spacing(2, 6, 2, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: ${(props) => `solid 1px ${props.theme.palette.grey[300]}`};
  outline: none;
  flex-grow: 1;
  border: none;
  background-color: ${(props) => props.theme.palette.grey[200]};

  p {
    margin: 0;
  }
`;

export const InputContainer = styled("div")`
  position: relative;
  display: flex;
  width: 100%;
`;

export const Send = styled(IconButton)`
  position: absolute;
  right: ${(props) => props.theme.spacing(2)};
  top: 50%;
  transform: translateY(-50%);
`;

export const Placeholder = styled("div")`
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  display: flex;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.theme.spacing(2)};
`;
