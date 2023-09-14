import { Stack, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "components/Button";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@api/auth";
import { useSnackbar } from "notistack";

const ResetPassword = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const resetPassword = useMutation({
    mutationFn: authApi.resetPassword,
    onError: (e) => enqueueSnackbar(e.message, { variant: "error" }),
    onSuccess: () => {
      enqueueSnackbar("Password reset email sent", { variant: "success" });
    },
  });

  const submit = handleSubmit(async (values) => resetPassword.mutate(values.email));

  return (
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={2}>
          <StyledGridItem item xs={12} md={6}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Reset your password</Title>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <RHFTextField name="email" control={control} label="Email" />
              <Button size="large" onClick={submit} loading={resetPassword.isLoading}>
                Send
              </Button>
            </Stack>
            <Links onClick={() => router.push("/login")}>
              <StyledLink fontWeight={500}>Back to Login</StyledLink>
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

export default ResetPassword;
