import { Stack, styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const Container = styled(Stack)`
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: 1px solid;
  margin-top: ${(props) => props.theme.spacing(2)};
  border-color: ${(props) => `${props.theme.palette.divider}`};
  padding: ${(props) => props.theme.spacing(2)};
`;

export const UploadContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  cursor: pointer;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  &:hover {
    background-color: ${(props) => props.theme.palette.grey[300]};
  }
`;

export const ImageContainer = styled("div")`
  position: relative;
  display: flex;
  height: 300px;
  width: 100%;
  overflow: hidden;
  object-fit: contain;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: 1px solid;
  border-color: ${(props) => `${props.theme.palette.divider}`};
`;

export const StyledContentEditable = styled(ContentEditable)`
  padding: ${(props) => props.theme.spacing(2, 2, 2, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: ${(props) => `solid 1px ${props.theme.palette.grey[300]}`};
  outline: none;
  flex-grow: 1;
  border: none;
  background-color: ${(props) => props.theme.palette.grey[200]};
  min-height: 150px;
  p {
    margin: 0;
  }
`;

export const InputContainer = styled("div")`
  position: relative;
  display: flex;
  width: 100%;
`;

export const Placeholder = styled("div")`
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  display: flex;
  padding: ${(props) => props.theme.spacing(2, 2, 2, 2)};
`;
