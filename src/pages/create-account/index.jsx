import React from "react";
import { Container } from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";

const CreateAccount = dynamic(() => import('feature/user/create-account'));

const CreateAccountPage = () => {
  return (
    <Container sx={{ minHeight: "100vh", py: 10 }} maxWidth="lg">
      <CreateAccount />
    </Container>
  );
};

export default CreateAccountPage;

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase.rpc("get_session");

  if (data) {
    if (data && !data?.isAccountComplete) {
      return {
        props: {
          initialSession: data,
        },
      };
    } else if (data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
