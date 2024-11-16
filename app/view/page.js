import Image from "next/image";
import LessonContent from "../note/[slug]/[slug1]/lessonContent/lessonContent";

// import data from "../../content/CVS_mbbs_2nd_year_TU/Anatomy/257_Axiallary Artery.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/12_Congestive Heart Failure.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/13_Therapy of Hypertension.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/11_Therapy of Arrhythmiasis.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Pharmacology/323_Hypolipidemic Drugs and Plasma Expanders.json";
// import data from "../../content/Renal Super Fast Track TU MBBS 2nd year/Pharmacology/387_Diuretics.json";
// import data from "../../content/CVS_mbbs_2nd_year_TU/Anatomy/7_The Heart Development.json";
// import data from "../../content/MBBS preparation/MBBS 2nd year TU/CVS_mbbs_2nd_year_TU/Anatomy/6_Mediastinum/6_Mediastinum.json";
// import data from "../../content/MBBS preparation/MBBS 1st year TU/General_Science_MBBS_1sy_year/Microbiology/586_Bacteriology/586_Bacteriology.json";
import data from "../../content/MBBS preparation/MBBS 2nd year TU/gasto_mbbs_2nd_tu/Microbiology/60_Entamoeba histolytica/60_Entamoeba histolytica.json";
// import data from "../../content/MBBS preparation/MBBS 2nd year TU/gasto_mbbs_2nd_tu/Microbiology/49_Salmonella/49_Salmonella.json";

export default function Home() {
  return (
    <div className="">
      <div className="bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif uppercase">
        Palmar arches
      </div>

      <LessonContent lessonContent={data} />
    </div>
  );
}
