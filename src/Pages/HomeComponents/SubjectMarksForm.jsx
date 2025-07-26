import { useState } from "react";

const SubjectMarksForm = ({ onSubmit }) => {
  const [subjects, setSubjects] = useState([{ subject: "", mark: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", mark: "" }]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(subjects);
      }}
    >
      {subjects.map((subj, index) => (
        <div key={index}>
          <input
            placeholder="Subject"
            value={subj.subject}
            onChange={(e) => handleChange(index, "subject", e.target.value)}
          />
          <input
            type="number"
            placeholder="Mark"
            value={subj.mark}
            onChange={(e) => handleChange(index, "mark", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addSubject}>
        Add More
      </button>
      <button type="submit">Generate Result</button>
    </form>
  );
};

export default SubjectMarksForm;
