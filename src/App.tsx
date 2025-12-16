import { useState, useRef, useEffect } from "react";
import "./App.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdHourglassDisabled } from "react-icons/md";
import { BsDoorOpenFill } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type WebPhase = "about" | "students" | "contact";
interface WebPhases {
  label: string;
  id: WebPhase;
}

function App() {
  const [webPhase, setWebPhase] = useState<WebPhase | "none">("none");
  const [formSent, setFormSent] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const webPhases: WebPhases[] = [
    { label: "צרו קשר", id: "contact" },
    { label: "תלמידים ממליצים", id: "students" },
    { label: "אודות", id: "about" },
  ];
  const students = [
    "סוף-סוף אני מבינה את החומר שאף אחד לא הצליח ללמד אותי.",
    "יש לך שיטות מצויינות להסביר את החומרף אני ממש מרוצה!",
    "פעם ראשונה שאני מקבלת ציון כזה במתמטיקה.",
    "במשך שנים לא הצלחתי להבין ואתה הצלחת להסביר לי בכמה דקות והבנתי.",
    "אתה המורה הכי טוב בעולם. לא יכולנו לבקש מורה יותר מושלם ממך! כשהגעת השנה סוף-סוף הבנו מה זה מתמטיקה.",
  ];

  function handleScrolling(
    e: React.MouseEvent<HTMLButtonElement>,
    id: WebPhase
  ) {
    e.preventDefault();
    const navHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
    };
    setFormSent(true);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWebPhase(entry.target.id as WebPhase);
          }
        });
      },
      {
        threshold: 0.8,
      }
    );
    webPhases.forEach((phase) => {
      const element = document.getElementById(phase.id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [webPhases]);

  return (
    <>
      {/* navbar */}
      <div
        ref={navbarRef}
        className="fixed top-0 bg-white z-[999] right-0 left-0"
      >
        <header className="flex justify-between items-center p-2">
          <div className="flex flex-1 items-center gap-2">
            <a href="" className={`border rounded-full p-2 hover:bg-[#25D366]`}>
              <FaPhoneAlt size={20} />
            </a>
            <a href="" className="border rounded-full p-2 hover:bg-[#25D366]">
              <FaWhatsapp size={20} />
            </a>
            <b>054-777-9075</b>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>מורה פרטי למתמטיקה</p>
            <p className="font-bold text-2xl">אלדד בר-ניר</p>
          </div>
        </header>
        <nav className="flex justify-center gap-16 p-4 border-b">
          {webPhases.map((phase) => (
            <button
              className={`p-2 ${
                webPhase === phase.id ? "font-bold underline" : ""
              }`}
              onClick={(e) => {
                setWebPhase(phase.id);
                handleScrolling(e, phase.id);
              }}
            >
              {phase.label}
            </button>
          ))}
        </nav>
      </div>

      {/* image */}
      <div>
        <div className="h-auto w-full bg-transparent relative">
          <img src="../public/image.png" alt="students laughing :)" />
          <div className="absolute bottom-8 left-8">
            <div className="flex flex-col text-white items-end w-fit text-6xl gap-2">
              <p className="bg-black w-fit">אלדד בר-ניר</p>
              <p className="bg-black w-fit">מורה פרטי למתמטיקה</p>
            </div>
            <div className="flex gap-2 items-center w-fit ">
              <p
                dir="rtl"
                className={`text-white bg-[#fcd308] w-fit p-2 text-3xl`}
              >
                מורה שקולט את הראש שלך!
              </p>
              <FaPlus size={64} color="fcd308" />
            </div>
          </div>
        </div>

        <div className="bg-[#fcd308] flex flex-1 justify-between p-4 text-3xl">
          <div className="flex flex-col items-center">
            <div className="bg-white w-fit p-6 rounded-full border">
              <MdHourglassDisabled size={64} />
            </div>
            <p>סבלנות רבה</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white w-fit p-6 rounded-full border">
              <FaPencil size={64} />
            </div>
            <p>ניסיון ותעסוקה</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white w-fit p-6 rounded-full border">
              <BsDoorOpenFill size={64} />
            </div>
            <p>זמינות גם לאחר השיעור</p>
          </div>
        </div>
      </div>

      {/* about */}
      <section id="about" className="flex flex-col items-end p-4">
        <div className="flex gap-8 items-center">
          <p>אודותיי</p>
          <FaPlus size={32} />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-4" dir="rtl">
            <div>
              <p>שמי אלדד,</p>
            </div>
            <div>
              <p>מורה מוסמך המלמד בפועל בתיכון.</p>
              <p>
                בעל רישיון הוראה, תעודת הוראה, תואר שני M.A בחינוך מתמטי מסמינר
                הקיבוצים ותואר מהנדס B.Sc מאוניברסיטת תל־אביב.
              </p>
              <p>מגיש לבגרות ובודק בגרויות מטעם משרד החינוך.</p>
            </div>
            <div>
              <p>
                יש לי ניסיון רב בלימוד תלמידים, בעיקר בקבוצות קטנות ובאופן אישי.
              </p>
              <p>יודע לעבוד עם תלמידים מתקשים בשיטות של הוראה מתקנת.</p>
              <p>
                השיעור מתנהל באווירה נעימה ובסבלנות רבה, תוך גישה אישית ומתן דגש
                לקשים הספציפיים של התלמיד.
              </p>
              <p>כל תלמיד ילמד בהתאמה אישית, לפי יכולתו והקצב שלו.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <IoTimer size={32} className="shrink-0" />
                <p>משך השיעור: שעה וחצי / שעה שלמה.</p>
              </div>
              <div className="flex gap-4 items-center">
                <MdLocationPin size={32} className="shrink-0" />
                <p>מיקום השיעור: בית התלמיד/ה, בית המורה או אינטרנטי.</p>
              </div>
              <div className="flex gap-4 items-center">
                <FaMapMarkedAlt size={32} className="shrink-0" />
                <p>
                  ערי לימוד: פתח תקווה, גבעת שמואל, הוד השרון, קרית אונו, גני
                  תקווה, סביון, הרצליה, רמת השרון, רעננה וכפר שמריהו.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <img
              src="../public/Eldad.png"
              alt="Eldad Bar-Nir"
              className="rounded-4xl"
            />
            <p className="font-bold">אלדד בר-ניר</p>
            <p>מורה פרטי למתמטיקה</p>
          </div>
        </div>
      </section>

      {/* students */}
      <section
        id="students"
        className="flex flex-col bg-[#d9d9d9] gap-4 items-end p-4"
      >
        <p className="font-bold text-4xl">תלמידים מספרים</p>
        <p>״אין חכם כבעל ניסיון״</p>
        {students.map((student: string, index: number) => {
          return (
            <div key={index} className="flex items-center gap-4" dir="rtl">
              <FaQuoteRight size={64} className="shrink-0" />
              <p className="text-xl font-bold" dir="rlt">
                {student}
              </p>
            </div>
          );
        })}
      </section>

      {/* contact */}
      <section
        id="contact"
        className="flex flex-col p-4 bg-[#212121] text-white"
        dir="rtl"
      >
        <div className="flex gap-4 items-center text-4xl">
          <FaPlus size={32} color="white" />
          <p>דברו איתי!</p>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center border-b border-b-[4px] pb-4">
            <div className="flex gap-4 items-center">
              <p>eldad.math@gmail.com</p>
              <MdEmail size={32} />
            </div>

            <div className="flex gap-4 items-center">
              <p>054-777-9075</p>
              <FaWhatsapp size={32} />
              <FaPhoneAlt size={32} />
            </div>

            <div className="flex gap-4 items-center ">
              <p>רחוב וינקלר 12, פתח תקווה</p>
              <MdLocationPin size={32} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p>
              לקביעת שיעורים או לשאלות נוספות, השאירו פרטים ואני אחזור אליכם
            </p>
          </div>

          <div className="flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "וינקלר 12, פתח תקווה"
              )}&output=embed`}
            ></iframe>{" "}
          </div>

          <div className="flex items-center justify-center">
            {!formSent ? (
              <form
                onSubmit={(e) => handleFormSubmit(e)}
                className="flex flex-col gap-2"
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-white text-black p-2 rounded-xl"
                  placeholder="שם *"
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="bg-white text-black p-2 rounded-xl"
                  dir="rtl"
                  placeholder="טלפון *"
                  pattern="[0-9]{3}-?[0-9]{7}"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-white text-black p-2 rounded-xl"
                  dir="rtl"
                  placeholder="דואר אלקטרוני"
                />
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="bg-white text-black p-2 rounded-xl"
                  dir="rtl"
                  placeholder="הודעה"
                />
                <button className="bg-[#fcd308] w-fit self-end mx-6 mt-[-16px] px-4 rounded-full text-xl font-bold py-2">
                  שלח!
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center">
                <p>הפרטים נשלחו אליי בהצלחה! אני אחזור אליכם בהקדם האפשרי!</p>
                <button
                  onClick={() => setFormSent(false)}
                  className="bg-[#fcd308] w-fit px-4 rounded-full text-lg font-bold py-2 w-full self-center"
                >
                  לחץ כאן בשביל לשלוח פרטים נוספים
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="flex justify-between">
        <div>
          <p>אלדד בר-ניר</p>
          <p>מורה פרטי למתמטיקה</p>
          <p>2008-{}</p>
        </div>
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          חזור לתחילת העמוד
        </button>
        <div>
          <p>העמוד נבנה על ידי לירז בר-ניר</p>
          <p>lirazbarnir15@gmail.com</p>
        </div>
      </footer>
    </>
  );
}

export default App;
