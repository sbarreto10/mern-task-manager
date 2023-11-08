import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = user.username+" profile";
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>
      <div className="profile-container mt-5 text-light d-flex flex-column align-items-center">
        <h1>{user.username}</h1>
        <div>email: {user.email}</div>
      </div>
    </div>
  );
}

export default ProfilePage;
