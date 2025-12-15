import { useState } from "react";
import "./App.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdHourglassDisabled } from "react-icons/md";
import { BsDoorOpenFill } from "react-icons/bs";

type WebPhase = "about" | "students" | "contact";
interface WebPhases {
  label: string;
  value: WebPhase;
}

function App() {
  const [webPhase, setWebPhase] = useState<WebPhase | "none">("none");
  const webPhases: WebPhases[] = [
    { label: "צרו קשר", value: "contact" },
    { label: "תלמידים ממליצים", value: "students" },
    { label: "אודות", value: "about" },
  ];

  return (
    <>
      <div className="fixed top-0 bg-white z-[999] right-0 left-0">
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
                webPhase === phase.value ? "font-bold underline" : ""
              }`}
              onClick={() => setWebPhase(phase.value)}
            >
              {phase.label}
            </button>
          ))}
        </nav>
      </div>

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
        <div className="bg-[#fcd308] flex justify-between p-4 text-3xl">
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
    </>
  );
}

export default App;
