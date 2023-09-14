import { Stack, styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const Content = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.spacing(1, 1)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  align-items: flex-start;
`;

export const Toggle = styled("div")``;

export const StyledContentEditable = styled(ContentEditable)`
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.secondary};
  padding-top: ${(props) => props.theme.spacing(0.5)};
  p {
    margin: 0;
  }
`;

export const CommentInfo = styled(Stack)`
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5, 0, 0, 1)};
`;
