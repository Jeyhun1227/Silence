import { Stack, Paper, Box } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Button from "components/Button";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import * as authApi from "@api/auth";

import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Image from "next/image";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const login = handleSubmit(async (values) => {
    setLoading(true);
    const { data, error } = await authApi.login(values.email, values.password);
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } else {
      const sessionResponse = await authApi.getSession();
      if (!sessionResponse.data?.isAccountComplete) router.push("/create-account");
      else router.push("/");
    }

    setLoading(false);
  });

  return (
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={3}>
          <StyledGridItem item xs={12} md={7}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Sign in to your account</Title>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <RHFTextField name="email" control={control} label="Email" />
              <RHFTextField name="password" control={control} label="Password" type="password" sx={{ mb: 2 }} />
              <Button size="large" onClick={login} loading={loading}>
                Login
              </Button>
            </Stack>
            <Links>
              <StyledLink fontWeight={500} onClick={() => router.push("/reset-password")}>
                Reset password
              </StyledLink>
              <StyledLink fontWeight={500} onClick={() => router.push('https://www.silencetinnitusnow.com/tinnitus-pal')}>
                Don't have account? Create account
              </StyledLink>
            </Links>
          </StyledGridItem>
          <StyledGridItem item xs={12} md={5}>
            <Box sx={{ position: "relative", width: "100%", height: 300 }}>
              <Image src="/assets/auth-background.png" alt="Logo" fill style={{ objectFit: "contain" }} />
            </Box>
          </StyledGridItem>
        </StyledGrid>
      </Content>
    </Paper>
  );
};

export default Login;
