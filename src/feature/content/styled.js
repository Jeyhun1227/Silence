import { styled } from "@mui/material";

export const PlayerWrapper = styled("div")`
  position: relative;
  padding-top: 56.25%;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing(5)};
`;
