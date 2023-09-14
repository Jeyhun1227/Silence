import { styled } from "@mui/material/styles";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const TextContent = styled("div")`

`;

export const StyledContentEditable = styled(ContentEditable)`
  padding-top: ${(props) => props.theme.spacing(0.5)};
  p {
    margin: 0;
  }
`;