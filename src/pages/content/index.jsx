import React from "react";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const Content = dynamic(() => import('feature/content'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ContentPage = () => {
  return <Content />;
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="md">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;
