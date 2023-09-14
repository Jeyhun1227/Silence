import { Paper, styled, Typography, Link } from "@mui/material";

export const Content = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)};
  ${(props) => props.theme.breakpoints.up("lg")} {
    padding: ${(props) => props.theme.spacing(4)};
  }
`;
export const Title = styled(Typography)`
  font-weight: 800;
  text-align: start;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(5)};
`;
export const Company = styled(Typography)`
  text-align: start;
  font-weight: 500;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.palette.grey[600]};
`;
export const Footer = styled("div")`
  display: flex;
  margin-top: ${(props) => props.theme.spacing(2)};
  justify-content: flex-end;
`;
export const StyledLink = styled(Link)`
  cursor: pointer;
  color: #222222;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;
