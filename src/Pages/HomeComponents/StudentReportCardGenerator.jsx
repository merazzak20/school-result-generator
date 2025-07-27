import { useState } from "react";

const StudentReportCardGenerator = () => {
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    rollNumber: "",
    className: "",
    examName: "",
  });

  const [subjects, setSubjects] = useState([
    { name: "Mathematics", marksObtained: 0, totalMarks: 100 },
    { name: "Science", marksObtained: 0, totalMarks: 100 },
    { name: "English", marksObtained: 0, totalMarks: 100 },
    { name: "Social Studies", marksObtained: 0, totalMarks: 100 },
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
    alert("Report card data logged to console!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
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
          <label className="label text-gray-600"> Student Class *</label>
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
      </div>

      {/* Subject Marks */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-primary">Subject Marks</h3>
          <button onClick={handleAddSubject} type="button" className="btn">
            + Add Subject
          </button>
        </div>

        {subjects.map((subject, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 items-center mb-2 bg-gray-50 p-4 rounded"
          >
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="0"
              value={subject.marksObtained}
              onChange={(e) =>
                handleSubjectChange(index, "marksObtained", e.target.value)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="100"
              readOnly
              value={subject.totalMarks}
              // onChange={(e) =>
              //   handleSubjectChange(index, "totalMarks", e.target.value)
              // }
              className="input"
            />
            <button
              onClick={() => handleRemoveSubject(index)}
              className="text-red-500 hover:underline"
            >
              — Remove
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleGenerate} className="btn-primary btn">
        Generate Report Card
      </button>
    </div>
  );
};

export default StudentReportCardGenerator;
