import Light from "../assets/light.png";
import Helmet from "../assets/helmet.png";
import { homeServices, homeAdditionalServices } from "../common/homeData";
function IndexPage() {
  return (
    <div className="page-container">
      <h1>קשר אור</h1>
      <p>
        תכנון יעוץ וביצוע של כל סוגי עבודות החשמל עבור: <strong>בתים פרטיים, דירות, משרדים ומבני תעשיה.</strong>
        <br />
        התקנת מערכות תקשורת אינטרקום, מערכות אזעקה, מערכות לגילוי אש, התקנת קווי רשת למחשבים ביתיים ולמשרדים,
        <br />
        שיפוצים בגבס, קרניזים ועבודות מיוחדות, ריצוף, צבע ואינסטלציה.
      </p>
      <p>
        <strong>והכל במחירים הוגנים ולשביעות רצון הלקוח.</strong>
      </p>
      <div className="w-full h-[2px] bg-[#8B0000]"></div>
      <h1>ברוכים הבאים</h1>
      <p>קשר אור הינה חברה אשר פעילה בתחום החשמל והתקשורת במגזר העסקי ובמגזר הפרטי.</p>
      <ul className="list-disc list-inside leading-relaxed">
        {homeServices.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <ul className="list-disc list-inside leading-relaxed">
        {homeAdditionalServices.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <p>
        <strong>חדש - מבצעים את כל סוגי עבודות השיפוץ:</strong> בניית קירות, עבודות גבס, ריצוף ואינסטלציה.
      </p>
      <div className="image flex flex-wrap justify-center gap-8 mt-4">
        <img src={Helmet} alt="helmet" />
        <img src={Light} alt="light" />
      </div>
    </div>
  );
}

export default IndexPage;
