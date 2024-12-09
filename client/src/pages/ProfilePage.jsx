import { profileElectricity, profileCommunication } from "../common/profileData.jsx";

function ProfilePage() {
  return (
    <div className="page-container">
      <h1>פרופיל</h1>
      <p>
        <strong>קשר אור</strong> (להלן: "החברה") הוקמה בשנת 1987 ופעילה מאז בתחום החשמל והתקשורת במגזר העסקי ובמגזר
        הפרטי.
        <br />
        החברה מעסיקה את מיטב בעלי המקצוע בפעילויותיה השונות ונעזרת בציוד החדיש ביותר בענף.
        <br />
        החברה מנוהלת ע"י ראובן אזאצ'י ממשרדיה שברמת השרון. החברה פעילה בעיקר באזור השרון ובמרכז.
        <br />
        בשנת 1999 החברה החלה לעסוק גם בתחום השיפוצים במגזר הפרטי והעסקי.
        <br />
        כמו כן בבעלות החברה חנות חשמל ותקשורת ברח' אוסישקין 9 ברמת השרון.
      </p>
      <h3>תחומי פעילות החברה:</h3>
      <h3>חשמל:</h3>
      <ul className="list-disc list-inside leading-relaxed">
        {profileElectricity.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <h3>תקשורת:</h3>
      <ul className="list-disc list-inside leading-relaxed">
        {profileCommunication.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <h3>מלקוחותינו:</h3>
      <p>
        קופת חולים מכבי, בזק, עיתון הארץ, iol ,The Marker, משרדי הייטק רבים, משרדי פרסום, אולמות חתונה, ומאות לקוחות
        פרטיים.
      </p>
      <h3>ייחודיות החברה:</h3>
      <p>
        הדגש העיקרי של החברה הנו שביעות רצון הלקוח, מחירים הוגנים, ניקיון לאחר מתן השירות, והכי חשוב מיומנות בתחומי
        העבודה השונים.
      </p>
    </div>
  );
}

export default ProfilePage;
