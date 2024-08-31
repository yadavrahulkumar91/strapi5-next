
import Image from "next/image";
import LessonContent from "../note/[slug]/lessonContent/lessonContent";

import data from "../../content/Zoology for CEE/Phylum/80_Coelenterata";

export default function Home() {
  return (
    <div>
      <div className="bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif">
        Coelenterata
      </div>

      <LessonContent lessonContent={data} />
    </div>
  );
}
