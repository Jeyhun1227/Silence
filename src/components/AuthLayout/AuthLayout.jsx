import { Container } from "@mui/material";
import { Wrapper } from "./styled";

const AuthLayout = ({ children }) => {
  return (
    <Wrapper component="main">
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default AuthLayout;
