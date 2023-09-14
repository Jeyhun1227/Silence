import { styled } from "@mui/material";

export const Content = styled("div")`
  padding: ${(props) => props.theme.spacing(3, 2, 6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UploadContainer = styled("div")(({theme}) => ({
  height: "120px",
  width: "120px",
  borderRadius: "60px",
  cursor: "pointer",
  padding: "5px",
  transition: 'opacity 0.3s ease',
  '&:hover': {opacity:0.5},
  border: `dashed 1px ${theme.palette.divider}`,
}));