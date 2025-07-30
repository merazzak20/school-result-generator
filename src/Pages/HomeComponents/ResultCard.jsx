import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import Container from "../../Components/Shared/Container";

const ResultCard = () => {
  const { state } = useLocation(); // Get data passed from the generator
  const navigate = useNavigate();

  const { studentName, rollNumber, className, examName } = state.studentInfo;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add report card content to PDF (customize as needed)
    doc.text(`Name: ${studentName}`, 20, 20);
    doc.text(`Class: ${className}`, 20, 30);
    // ... Add more fields and styling

    doc.save("report-card.pdf");
  };

  return (
    <Container>
      {/* Display the report card (similar to your image) */}

      {/* card toper */}
      <div className=" mb-4 bg-blue-600 text-white rounded-t-xl px-6 py-4">
        <h1 className="text-4xl font-bold">School Name</h1>
        <h2 className="text-2xl font-semibold">Student Report</h2>
        <h2 className="text-xl font-semibold">{examName} Exam</h2>
      </div>

      {/* Student Info */}
      <div>
        <h2 className="text-blue-600 text-2xl font-semibold">
          Student Information
        </h2>
      </div>
      <p>
        Name: <strong>{studentName}</strong>
      </p>
      <p>
        Roll Number: <strong>{rollNumber}</strong>
      </p>
      {/* ... Render other fields */}

      {/* Subject-wise performance table */}
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks Obtained</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {state.subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.marksObtained}</td>
              <td>{subject.totalMarks}</td>
              <td>{/* Calculate percentage */}</td>
              <td>{/* Calculate grade */}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download button */}
      <button onClick={handleDownloadPDF} className="btn-primary">
        Download PDF
      </button>

      {/* Back button */}
      <button onClick={() => navigate("/")} className="btn-secondary">
        Back to Generator
      </button>
    </Container>
  );
};

export default ResultCard;
