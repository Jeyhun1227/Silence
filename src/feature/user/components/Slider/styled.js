import { styled } from "@mui/material";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  border: ${(props) => `1px solid ${props.theme.palette.divider}`};
  padding: ${(props) => props.theme.spacing(1, 2, 1, 2)};
  margin-top: ${(props) => props.theme.spacing(0.5)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  div:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(2)};
  }
`;

export const SliderContainer = styled("div")`
  display: flex;
  width: 100%;
  align-items: center;
`;
