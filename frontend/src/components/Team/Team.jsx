import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div className="m-16">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Projects</th>
              <th className="p-2 border">Subtasks</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.gender}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">{user.projects?.length || 0}</td>
                  <td className="p-2 border">{user.subtasks?.length || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
