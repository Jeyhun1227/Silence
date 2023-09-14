import React from "react";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const GroupList = dynamic(() => import('feature/groups/group-list'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const GroupsPage = () => {
  return <GroupList />;
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
