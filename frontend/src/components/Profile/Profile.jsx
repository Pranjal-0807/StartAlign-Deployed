import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // const userId = useSelector((state) => state.auth.user?.id);
  const user = useSelector((state) => state.auth.user);
  // console.log(userId, user);

  // const user = useSelector((state) =>
  //   state.users.users.find((user) => user?._id === userId)
  // );

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">User not found.</div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/account");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-4 mb-4">
          <img
            src={user?.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Gender:</h3>
            <p>{user?.gender || "Not specified"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Role:</h3>
            <p className="capitalize">{user?.role}</p>
          </div>
          <div>
            <h3 className="font-semibold">Projects:</h3>
            <p>{user?.projects?.length || 0}</p>
          </div>
          <div>
            <h3 className="font-semibold">Subtasks:</h3>
            <p>{user?.subtasks?.length || 0}</p>
          </div>
          <div>
            <h3 className="font-semibold">Completed Tasks:</h3>
            <p>{user?.completedTasks?.length || 0}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
