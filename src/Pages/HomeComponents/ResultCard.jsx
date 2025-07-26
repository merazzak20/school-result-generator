const getGrade = (mark) => {
  if (mark >= 80) return "A+";
  if (mark >= 70) return "A";
  if (mark >= 60) return "A-";
  if (mark >= 50) return "B";
  if (mark >= 40) return "C";
  if (mark >= 33) return "D";
  return "F";
};

const ResultCard = ({ student, subjects }) => {
  const total = subjects.reduce(
    (acc, subj) => acc + parseInt(subj.mark || 0),
    0
  );
  const isFailed = subjects.some((s) => parseInt(s.mark) < 33);
  const average = total / subjects.length;
  const finalGrade = isFailed ? "F" : getGrade(average);

  return (
    <div>
      <h2>Result Card</h2>
      <p>Name: {student.name}</p>
      <p>Roll: {student.roll}</p>
      <p>Class: {student.class}</p>
      <p>Section: {student.section}</p>

      <h3>Subject Marks:</h3>
      <ul>
        {subjects.map((s, i) => (
          <li key={i}>
            {s.subject}: {s.mark} ({getGrade(s.mark)})
          </li>
        ))}
      </ul>

      <h3>Total: {total}</h3>
      <h3>Average: {average.toFixed(2)}</h3>
      <h3>Final Grade: {finalGrade}</h3>
      <h3>Status: {isFailed ? "Fail" : "Pass"}</h3>
    </div>
  );
};

export default ResultCard;
