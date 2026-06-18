import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  deleteUser,
} from "../../api/userApi";

function Users() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res =
      await getUsers();

    setUsers(res.users);
  };

  const handleDelete =
    async (id) => {
      if (
        window.confirm(
          "Delete User?"
        )
      ) {
        await deleteUser(id);

        loadUsers();
      }
    };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">
          Users Management
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Mobile
              </th>

              <th className="p-4">
                Blood Group
              </th>

              <th className="p-4">
                City
              </th>

              <th className="p-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.mobile}
                </td>

                <td className="p-4">
                  {user.bloodGroup}
                </td>

                <td className="p-4">
                  {user.city}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDelete(
                        user._id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Users;