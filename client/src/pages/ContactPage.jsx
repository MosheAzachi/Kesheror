import axios from "../services/apiClient";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

function ContactPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = user?.name || e.target.fullName?.value;
    const email = user?.email || e.target.email?.value;
    const message = e.target.message.value;
    const formData = { fullName, email, message };

    try {
      const response = await axios.post("/api/contact", formData);
      showNotification(response.data.message, "success");
      e.target.reset();
    } catch (error) {
      showNotification(error.response?.data?.message || "שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.", "error");
    }
  };

  return (
    <div className="page-container">
      <h1>צור קשר</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <form className="flex flex-col w-full lg:w-1/2 bg-gray-100 px-6 py-4 rounded shadow" onSubmit={handleSubmit}>
          {!user && (
            <>
              <label htmlFor="fullName">שם מלא</label>
              <input type="text" id="fullName" name="fullName" placeholder="הכנס שם מלא" required />
              <label htmlFor="email">דואר אלקטרוני</label>
              <input type="email" id="email" name="email" placeholder="הכנס דואר אלקטרוני" required />
            </>
          )}
          {user && (
            <>
              <p>
                <strong>שם מלא:</strong> {user.name}
              </p>
              <p>
                <strong>דואר אלקטרוני:</strong> {user.email}
              </p>
            </>
          )}
          <label htmlFor="message">הודעה:</label>
          <textarea id="message" name="message" placeholder="כתוב את הודעתך כאן" rows="5" required></textarea>
          <button
            type="submit"
            className="w-full bg-[#8B0000] text-white py-3 rounded-lg hover:bg-[#A50000] transition"
          >
            שלח הודעה
          </button>
        </form>
        <div className="w-full lg:w-1/2 aspect-video rounded overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.4372568391673!2d34.84446992467259!3d32.13849677393702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d48364ad37615%3A0xef6c63e85b13afe7!2z16fXqdeoINeQ15XXqA!5e0!3m2!1siw!2sil!4v1689788420611!5m2!1siw!2sil"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
