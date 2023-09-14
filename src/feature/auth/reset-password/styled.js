import { Grid, styled, Typography, Link, Paper } from "@mui/material";

export const Content = styled(Paper)`
  padding: ${(props) => props.theme.spacing(8, 2)};
  ${(props) => props.theme.breakpoints.up("lg")} {
    padding: ${(props) => props.theme.spacing(8, 4)};
  }
`;

export const StyledGrid = styled(Grid)`
  height: 100%;
`;
export const StyledGridItem = styled(Grid)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px !important;
  margin: auto;
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

export const Links = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(4)};
  width: 100%;
`;
export const StyledLink = styled(Link)`
  cursor: pointer;
  color: #222222;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;
