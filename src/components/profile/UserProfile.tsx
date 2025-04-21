import useNhostAuth from "@/hooks/useNhostAuth";

const UserProfile = () => {
  const { user, isLoading, isAuthenticated } = useNhostAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated || !user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      {/* Add more user profile information here */}
    </div>
  );
};

export default UserProfile;
