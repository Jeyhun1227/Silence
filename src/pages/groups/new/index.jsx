import React from "react";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const NewGroup = dynamic(() => import('feature/groups/new-group'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const NewGroupPage = () => {
  return <NewGroup />;
};

export default NewGroupPage;

NewGroupPage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="xl">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;
