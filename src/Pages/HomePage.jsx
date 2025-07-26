import React from "react";
import StudentReportCardGenerator from "./HomeComponents/StudentReportCardGenerator";
import SubjectMarksForm from "./HomeComponents/SubjectMarksForm";
import ResultCard from "./HomeComponents/ResultCard";
import TopHeader from "./HomeComponents/TopHeader";

const HomePage = () => {
  return (
    <div>
      <TopHeader></TopHeader>
      <StudentReportCardGenerator></StudentReportCardGenerator>
    </div>
  );
};

export default HomePage;
