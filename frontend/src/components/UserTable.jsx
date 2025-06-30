import React from "react";

const UserTable = ({ users, onDelete, onEdit, onToggleRole, onView }) => {
  const currentUserId = localStorage.getItem("userId");

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-[700px] w-full text-left text-sm">
        <thead className="bg-blue-100 text-blue-700 uppercase text-xs sm:text-sm">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">User Type</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 text-xs sm:text-sm">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3 capitalize">{user.userType}</td>
                <td className="px-4 py-3 text-center flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onView(user._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  {String(user._id) !== String(currentUserId) && (
                    <button
                      onClick={() => onToggleRole(user._id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
                    >
                      {user.userType === "admin" ? "Make User" : "Make Admin"}
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
