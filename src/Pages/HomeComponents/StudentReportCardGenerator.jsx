import { useState } from "react";
import { useNavigate } from "react-router";
import Container from "../../Components/Shared/Container";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportCardPDF from "../ReportCardPDF";

const StudentReportCardGenerator = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    rollNumber: "",
    className: "",
    examName: "",
    present: "",
    absent: "",
  });

  const [subjects, setSubjects] = useState([
    { name: "Bangla", marksObtained: 0, totalMarks: 100 },
    { name: "English", marksObtained: 0, totalMarks: 100 },
    { name: "Mathematics", marksObtained: 0, totalMarks: 100 },
    { name: "Science", marksObtained: 0, totalMarks: 100 },
  ]);

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleSubjectChange = (index, key, value) => {
    const updated = [...subjects];
    updated[index][key] = key.includes("marks") ? Number(value) : value;
    setSubjects(updated);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", marksObtained: 0, totalMarks: 100 }]);
  };

  const handleRemoveSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleGenerate = () => {
    console.log("Student Info:", studentInfo);
    console.log("Subjects:", subjects);
    navigate(`/result-card?name=${studentInfo.studentName}`, {
      state: { studentInfo, subjects },
    });
    // alert("Report card data logged to console!");
  };

  return (
    <Container>
      <div className="bg-white py-14">
        <h1 className="text-2xl font-bold mb-4 bg-blue-600 text-white rounded-t-xl px-6 py-4">
          🎓 Student Report Card Generator
        </h1>

        {/* Student Information */}
        <h2 className="text-lg font-semibold text-primary mb-2">
          Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mb-6">
          <div>
            <label className="label text-gray-600"> Student Name *</label>
            <input
              name="studentName"
              value={studentInfo.studentName}
              onChange={handleStudentChange}
              placeholder="Enter student's full name"
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label text-gray-600"> Student Roll *</label>
            <br />
            <input
              name="rollNumber"
              value={studentInfo.rollNumber}
              onChange={handleStudentChange}
              placeholder="Enter roll number"
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label text-gray-600"> Class *</label>
            <input
              name="className"
              value={studentInfo.className}
              onChange={handleStudentChange}
              placeholder="e.g., Class 10-A"
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label text-gray-600"> Exam Name *</label>
            <br />
            <input
              name="examName"
              value={studentInfo.examName}
              onChange={handleStudentChange}
              placeholder="e.g., Final Examination 2024"
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label text-gray-600"> Present *</label>
            <br />
            <input
              name="present"
              value={studentInfo.present}
              onChange={handleStudentChange}
              placeholder="70"
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="label text-gray-600"> Absent *</label>
            <br />
            <input
              name="absent"
              value={studentInfo.absent}
              onChange={handleStudentChange}
              placeholder="15"
              className="input w-full"
              required
            />
          </div>
        </div>

        {/* Subject Marks */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-primary">
              Subject Marks
            </h3>
            <button
              onClick={handleAddSubject}
              type="button"
              className="btn btn-success outline-none border-none shadow-none"
            >
              + Add Subject
            </button>
          </div>

          {subjects.map((subject, index) => (
            <div
              key={index}
              className="flex justify-evenly gap-4 items-center mb-2 bg-gray-50 py-4 rounded"
            >
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) =>
                  handleSubjectChange(index, "name", e.target.value)
                }
                className="input w-full"
              />
              <input
                type="number"
                placeholder="0"
                value={subject.marksObtained}
                onChange={(e) =>
                  handleSubjectChange(index, "marksObtained", e.target.value)
                }
                className="input w-full"
              />
              <input
                type="number"
                placeholder="100"
                readOnly
                value={subject.totalMarks}
                // onChange={(e) =>
                //   handleSubjectChange(index, "totalMarks", e.target.value)
                // }
                className="input w-full"
              />
              <button
                onClick={() => handleRemoveSubject(index)}
                className="btn btn-error text-white shadow-none"
              >
                — Remove
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleGenerate} className="btn-primary btn">
          Generate Report Card
        </button>

        {/* PDF Download Button */}
        <PDFDownloadLink
          document={
            <ReportCardPDF studentInfo={studentInfo} subjects={subjects} />
          }
          fileName={`${studentInfo.studentName}-report-card.pdf`}
          className="btn btn-primary"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </Container>
    // <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-10">

    // </div>
  );
};

export default StudentReportCardGenerator;
