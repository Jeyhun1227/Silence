import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import('components/dashboard-layout'), {ssr: false});
const Profile = dynamic(() => import('feature/user/profile'));
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Profile">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;
