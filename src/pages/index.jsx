import dynamic from 'next/dynamic';
import React from 'react';
const DashboardLayout = dynamic(() => import('components/dashboard-layout'));
const Home = dynamic(() => import ('feature/home'));
import { dashboardGetServerSideProps } from 'utils/getServerSideProps';

const Index = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="md">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;
