import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const LiveStream = dynamic(() => import('feature/live-stream'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const LiveStreamPage = () => {
  return <LiveStream />;
};

export default LiveStreamPage;

LiveStreamPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Notification">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;
