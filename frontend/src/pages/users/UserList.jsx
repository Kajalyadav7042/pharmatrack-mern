import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getUsers } from "../../api/userApi";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
     const response = await getUsers();

setUsers(response);
    } catch (error) {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Delete this vendor?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteVendor(id);

//       toast.success("Vendor Deleted");

//       fetchVendors();
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Delete Failed"
//       );
//     }
//   };

  if (loading) {
    return (
      <h2 className="text-center text-2xl">
        Loading...
      </h2>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <Link
          to="/users/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
            + Add User
        </Link>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

               

                <td className="p-4">
                  <span
className={`px-3 py-1 rounded-full text-white
${
user.status==="active"
?
"bg-green-600"
:
"bg-red-600"
}`}
>

{user.status}

</span>
                </td>

                <td className="p-4 text-center">

                  <Link
                    to={`/users/edit/${user._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserList;