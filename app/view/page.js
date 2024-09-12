import Image from "next/image";
import LessonContent from "../note/[slug]/lessonContent/lessonContent";

import data from "../../content/CVS_mbbs_2nd_year_TU/Anatomy/7_The Heart Development.json";

export default function Home() {
  return (
    <div>
      <div className="bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif uppercase">
        Coelenterata
      </div>

      <LessonContent lessonContent={data} />
    </div>
  );
}
