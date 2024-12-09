import { useEffect, useState } from "react";
import axios from "../services/apiClient";
import { useNotification } from "../context/NotificationContext";

function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // For showing contact details
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        setContacts(response.data.contacts);
      } catch (error) {
        showNotification("שגיאה בטעינת פניות", "error");
      }
    };

    fetchContacts();
  }, []);

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      showNotification("הפניה נמחקה בהצלחה", "success");
    } catch (error) {
      showNotification("שגיאה במחיקת הפניה", "error");
    }
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  return (
    <div className="shadow-md rounded overflow-hidden">
      <h2 className="text-center bg-[#8B0000] py-3 text-white">ניהול פניות</h2>
      <div className="p-4 bg-gray-50">
        <p className="text-sm text-gray-500">כאן תוכלו לצפות ולנהל את כל הפניות שהתקבלו.</p>
        <ul className="mt-4 space-y-2">
          {contacts.map((contact) => (
            <li key={contact._id} className="flex justify-between items-center border-b pb-2">
              <span>
                <strong>{contact.fullName}</strong> - {contact.email}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleViewDetails(contact)}
                >
                  צפה בפרטים
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  מחק
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Contact Details */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          onClick={handleCloseModal}
        >
          <div className="bg-white w-full max-w-md rounded shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#8B0000]">פרטי פניה</h2>
              <button className="text-gray-600" onClick={handleCloseModal}>
                ✖
              </button>
            </div>
            <div className="mt-4">
              <p>
                <strong>שם מלא:</strong> {selectedContact.fullName}
              </p>
              <p>
                <strong>אימייל:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>הודעה:</strong>
              </p>
              <p className="bg-gray-100 p-2 rounded">{selectedContact.message}</p>
            </div>
            <div className="mt-4 text-right">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCloseModal}>
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactManagement;
