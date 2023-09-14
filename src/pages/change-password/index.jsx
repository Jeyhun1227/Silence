import React from "react";
import dynamic from "next/dynamic";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const AuthLayout = dynamic(() => import('components/AuthLayout'), {ssr: false});
const ChangePassword = dynamic(() => import('feature/auth/change-password'));
import * as userApi from "@api/user";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ChangePassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;


export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await userApi.getUserById(session.user.id);

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