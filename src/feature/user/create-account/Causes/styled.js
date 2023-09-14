import { styled } from "@mui/material";
import { lime } from "@mui/material/colors";
export const Info = styled("div")`
  background-color: ${lime[50]};
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
`;
