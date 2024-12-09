import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
function UsersManagement() {
  const { showNotification } = useNotification();
  const { fetchUsers, users, setAdmin, deleteUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSetAdmin = async (id) => {
    try {
      const message = await setAdmin(id);
      showNotification(message, "success");
    } catch (error) {
      showNotification(error.message || "שגיאה בהרשמה, נסה שוב", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const message = await deleteUser(id);
      showNotification(message, "success");
    } catch (error) {
      showNotification(error.message || "שגיאה בהרשמה, נסה שוב", "error");
    }
  };

  return (
    <div className="shadow-md rounded overflow-hidden">
      <h2 className="text-center bg-[#8B0000] py-3 text-white">ניהול משתמשים</h2>
      <div className="p-4 bg-gray-50">
        <p className="text-sm text-gray-500">כאן תוכלו לנהל משתמשים במערכת.</p>
        <ul className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center border-b pb-2">
              <span>
                משתמש: {user.name}{" "}
                <span className="text-gray-500 text-sm">({user.role === "admin" ? "מנהל" : "משתמש רגיל"})</span>
              </span>
              <div className="flex gap-2 px-2">
                {user.role !== "admin" && (
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleSetAdmin(user._id)}
                  >
                    הגדר כמנהל
                  </button>
                )}
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  מחק
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UsersManagement;
