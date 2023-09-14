import React from "react";
import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import('components/AuthLayout'), {ssr: false});
const SignUp = dynamic(() => import('feature/auth/signup'));
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data } = await supabase.rpc("get_session");

  if (Object.keys(ctx.query).length === 0) return {
    redirect: {
      destination: "/",
      permanent: false
    }
  }

  const token = ctx.query.token;

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
      props: {token},
    };
  }

  return {
    props: {token},
  };
};
