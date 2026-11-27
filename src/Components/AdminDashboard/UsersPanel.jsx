import { useEffect, useState } from "react";
import { userController } from "../../controllers/userController";

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    userController
      .list()
      .then((data) => {
        if (!cancelled) setUsers(data);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <div className="px-4 pt-4">
        <h2 className="text-xl font-semibold text-gray-900">Registered users</h2>
        <p className="mt-1 text-sm text-gray-500">Account details from MongoDB</p>
      </div>
      {loading ? (
        <p className="px-4 py-6 text-sm text-gray-600">Loading users...</p>
      ) : error ? (
        <p role="alert" className="px-4 py-6 text-sm text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p className="px-4 py-6 text-sm text-gray-600">No users found.</p>
      ) : (
        <table className="mt-4 w-full text-left text-sm">
          <thead className="bg-orange-50 text-gray-700">
            <tr>
              {["Name", "Email", "Role", "Joined"].map((column) => (
                <th key={column} className="whitespace-nowrap px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="text-gray-700">
                <td className="whitespace-nowrap px-4 py-3">{user.name}</td>
                <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                <td className="whitespace-nowrap px-4 py-3 capitalize">{user.role}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default UsersPanel;
