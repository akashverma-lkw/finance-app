import React from "react";

const UserTable = ({ users, onDelete, onEdit, onToggleRole, onView }) => {
  const currentUserId = localStorage.getItem("userId");

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
      <table className="min-w-[700px] w-full text-sm text-left">
        <thead className="bg-blue-100 text-blue-700 uppercase text-xs sm:text-sm">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap">Name</th>
            <th className="px-4 py-3 whitespace-nowrap">Email</th>
            <th className="px-4 py-3 whitespace-nowrap">Phone</th>
            <th className="px-4 py-3 whitespace-nowrap">User Type</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">Actions</th>
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
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 text-xs sm:text-sm"
              >
                <td className="px-4 py-3 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.phone}</td>
                <td className="px-4 py-3 capitalize whitespace-nowrap">
                  {user.userType}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <button
                      onClick={() => onView(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>

                    {String(user._id) !== String(currentUserId) && (
                      <button
                        onClick={() => onToggleRole(user._id)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs"
                      >
                        {user.userType === "admin" ? "Make User" : "Make Admin"}
                      </button>
                    )}

                    <button
                      onClick={() => onDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
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
