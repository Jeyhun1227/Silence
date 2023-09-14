import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const Notification = dynamic(() => import('feature/notification'));
import { dashboardGetServerSideProps } from 'utils/getServerSideProps';

const NotificationPage = () => {
  return <Notification />;
};

export default NotificationPage;

NotificationPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="sm" title="Notification">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;
