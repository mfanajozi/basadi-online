import { PageContainer } from "@/components/layout/PageContainer";
import UserProfile from "@/components/profile/UserProfile";
import OrderHistory from "@/components/profile/OrderHistory";

const ProfilePage = () => {
  return (
    <PageContainer title="Profile" showBackButton>
      <div>
        <UserProfile />
        <OrderHistory />
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
