import Image from "next/image";
import LessonContent from "../note/[slug]/lessonContent/lessonContent";

// import data from "../../content/CVS_mbbs_2nd_year_TU/Anatomy/257_Axiallary Artery.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/12_Congestive Heart Failure.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/13_Therapy of Hypertension.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/11_Therapy of Arrhythmiasis.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/323_Hypolipidemic Drugs and Plasma Expanders.json";
// import data from "../../content/Renal Super Fast Track TU MBBS 2nd year/Pharmacology/387_Diuretics.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Anatomy/7_The Heart Development.json";
import data from "../../content/MBBS preparation/MBBS 2nd year TU/CVS_mbbs_2nd_year_TU/Anatomy/6_Mediastinum/6_Mediastinum.json";

export default function Home() {
  return (
    <div>
      <div className="bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif uppercase">
        Palmar arches
      </div>

      <LessonContent lessonContent={data} />
    </div>
  );
}
