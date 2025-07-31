import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import Container from "../../Components/Shared/Container";
import { useRef } from "react";
import html2canvas from "html2canvas";

const getGrade = (mark) => {
  if (mark >= 80) return "A+";
  else if (mark >= 70 && mark <= 79) return "A";
  else if (mark >= 60 && mark <= 69) return "A-";
  else if (mark >= 50 && mark <= 59) return "B";
  else if (mark >= 40 && mark <= 49) return "C";
  else if (mark >= 33 && mark <= 39) return "D";
  return "F";
};

const ResultCard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef();

  const { studentName, rollNumber, className, examName, present, absent } =
    state.studentInfo;
  const subjects = state.subjects || [];

  const handleDownloadPDF = async () => {
    const card = cardRef.current;

    // 1. Apply overrides to the ENTIRE document
    document.documentElement.classList.add("pdf-export"); // <html> element

    // 2. Add a small delay to ensure styles apply
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 3. Generate PDF
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: true, // Check console for warnings
    });

    // 4. Clean up
    document.documentElement.classList.remove("pdf-export");

    // 5. Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${studentName}-${rollNumber}.pdf`);
  };

  // Calculate total marks and percentage
  const totalMarks = subjects.reduce((sum, sub) => sum + sub.marksObtained, 0);
  const maxMarks = subjects.reduce((sum, sub) => sum + sub.totalMarks, 0);
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);

  return (
    <Container>
      <div
        ref={cardRef}
        className="bg-white p-10 max-w-4xl mx-auto shadow-lg rounded-lg border-t-8 border-blue-800"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">
            REPORT CARD - {new Date().getFullYear()}
          </h1>

          <p className="text-lg text-gray-700">{"Your School Name"}</p>
          <div className="mt-4">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {percentage >= 40 ? "PASS" : "FAIL"}
            </span>
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 justify-between gap-4 mb-8 text-gray-800">
          <p>
            <strong>Name:</strong> {studentName}
          </p>
          <p>
            <strong>Class:</strong> {className}
          </p>

          <p>
            <strong>Roll Number:</strong> {rollNumber}
          </p>
          <p>
            <strong>Exam:</strong> {examName}
          </p>
        </div>

        {/* Subject Table */}
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Mark</th>
              <th className="py-2 px-4 text-left">Grade</th>
              <th className="py-2 px-4 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 text-gray-800 bg-gray-50 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{subject.name}</td>
                <td className="py-2 px-4">{subject.marksObtained}</td>
                <td className="py-2 px-4">{getGrade(subject.marksObtained)}</td>
                <td className="py-2 px-4">
                  {subject.marksObtained >= 90
                    ? "Excellent"
                    : subject.marksObtained >= 70
                    ? "Good"
                    : subject.marksObtained >= 50
                    ? "Average"
                    : "Needs Improvement"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Grading Scale & Attendance */}
        <div className="grid grid-cols-2 gap-8 mt-10 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Grading Scale:</h3>
            <ul>
              <li>A+ = 80-100</li>
              <li>A = 70-79</li>
              <li>A- = 60-69</li>
              <li>B = 50-59</li>
              <li>C = 40-49</li>
              <li>D = 33-39</li>
              <li>Fail = Below 33</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Total Days of School:</h3>
            <p>Days Attended: {present}</p>
            <p>Days Absent: {absent}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Back to Generator
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ResultCard;
