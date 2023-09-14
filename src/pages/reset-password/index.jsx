import React from "react";
import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import('components/AuthLayout'), {ssr: false});
const ResetPassword = dynamic(() => import('feature/auth/reset-password'));
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data } = await supabase.rpc("get_session");

  if (data) {
    if (data && !data?.isAccountComplete) {
      return {
        redirect: {
          destination: "/create-account",
          permanent: false,
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
      props: {},
    };
  }

  return {
    props: {},
  };
};
