import { Stack, Paper, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Button from "components/Button";
import Image from "next/image";
import * as authApi from "@api/auth";

import { Company, Content, Links, StyledGrid, StyledGridItem, StyledLink, Title } from "./styled";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const changePassword = useMutation({
    mutationFn: authApi.changePassword,
    onError: (e) => enqueueSnackbar(e.message, { variant: "error" }),
    onSuccess: () => {
      enqueueSnackbar("Password updated", { variant: "success" });
      router.push("/");
    },
  });

  const submit = handleSubmit((data) => changePassword.mutate(data.password));

  return (
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={2}>
          <StyledGridItem item xs={12} md={6}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Change your password</Title>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <RHFTextField name="password" control={control} label="Password" type="password" />
              <RHFTextField
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <Button size="large" loading={changePassword.isLoading} onClick={submit}>
                Update
              </Button>
            </Stack>
            <Links>
              <StyledLink fontWeight={500}>Forgot password</StyledLink>
              <StyledLink fontWeight={500}>Don't have account? Create account</StyledLink>
            </Links>
          </StyledGridItem>
          <StyledGridItem item xs={12} md={6}>
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
