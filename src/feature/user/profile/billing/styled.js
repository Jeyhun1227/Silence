import { styled } from "@mui/material";

export const Content = styled("div")`
  padding: ${(props) => props.theme.spacing(3, 2, 6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
