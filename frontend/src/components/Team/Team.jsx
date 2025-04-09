import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div className="px-4 md:px-16 py-10 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">👥 Team Members</h1>

      {/* Desktop View */}
      <div className="hidden md:block bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Avatar</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Projects</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subtasks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-blue-50 transition duration-150">
                  <td className="px-6 py-4">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border-2 border-blue-200 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 capitalize text-gray-600">{user.gender}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{user.role}</td>
                  <td className="px-6 py-4 text-center">{user.projects?.length || 0}</td>
                  <td className="px-6 py-4 text-center">{user.subtasks?.length || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500 font-medium">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-blue-300"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Gender:</span> {user.gender}</p>
                <p><span className="font-medium">Role:</span> {user.role}</p>
                <p><span className="font-medium">Projects:</span> {user.projects?.length || 0}</p>
                <p><span className="font-medium">Subtasks:</span> {user.subtasks?.length || 0}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
