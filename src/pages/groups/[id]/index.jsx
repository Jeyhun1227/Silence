import React from "react";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const Group = dynamic(() => import('feature/groups/group'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const GroupsPage = () => {
  return <Group />;
};

export default GroupsPage;

GroupsPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Groups">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;
