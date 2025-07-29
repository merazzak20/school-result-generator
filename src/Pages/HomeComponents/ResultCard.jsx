import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";

const ResultCard = () => {
  const { state } = useLocation(); // Get data passed from the generator
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add report card content to PDF (customize as needed)
    doc.text(`Name: ${state.studentInfo.studentName}`, 20, 20);
    doc.text(`Class: ${state.studentInfo.className}`, 20, 30);
    // ... Add more fields and styling

    doc.save("report-card.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Display the report card (similar to your image) */}
      <h1>Student Report Card</h1>
      <h2>Student Information</h2>
      <p>
        Name: <strong>{state.studentInfo.studentName}</strong>
      </p>
      <p>
        Roll Number: <strong>{state.studentInfo.rollNumber}</strong>
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
    </div>
  );
};

export default ResultCard;
