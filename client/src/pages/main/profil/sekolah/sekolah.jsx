import React, { useEffect } from "react";
import IntroSection from "./intro/intro";
import StatisticSection from "./statistic/statistic";
import LatarSection from "./latar/latar";
import PengelolaSection from "./pengelola/pengelola";
import dataSekolah from "../../../../data/datasekolah";
import NotFoundPage from "../../../notfound";
import { useParams } from "react-router-dom";

const SekolahPage = () => {
  const { singkatan } = useParams();
  const schoolData = dataSekolah.find(
    (school) => school.singkatan === singkatan.toUpperCase()
  );

  useEffect(() => {
    document.title = `Cita Sakinah | Profil - ${
      schoolData?.sekolah || "Not Found"
    }`;
  }, [schoolData]);

  if (!schoolData) {
    return <NotFoundPage />;
  }

  return (
    <>
      <IntroSection data={schoolData} />
      <StatisticSection />
      <LatarSection data={schoolData} />
      <PengelolaSection data={schoolData} />
    </>
  );
};

export default SekolahPage;
