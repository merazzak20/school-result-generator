// components/ReportCardPDF.jsx
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed (optional)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
//     }, // Regular
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
//       fontWeight: 700,
//     }, // Bold
//   ],
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  studentInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoItem: {
    width: "50%",
    marginBottom: 10,
  },
  table: {
    width: "100%",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 8,
  },
  colSubject: {
    width: "40%",
  },
  colMarks: {
    width: "20%",
    textAlign: "right",
  },
  colGrade: {
    width: "20%",
    textAlign: "center",
  },
  colFeedback: {
    width: "20%",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  summaryItem: {
    width: "30%",
    textAlign: "center",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

const getGrade = (mark) => {
  if (mark >= 80) return "A+";
  else if (mark >= 70 && mark <= 79) return "A";
  else if (mark >= 60 && mark <= 69) return "A-";
  else if (mark >= 50 && mark <= 59) return "B";
  else if (mark >= 40 && mark <= 49) return "C";
  else if (mark >= 33 && mark <= 39) return "D";
  return "F";
};

const ReportCardPDF = ({ studentInfo, subjects }) => {
  const totalMarks = subjects.reduce((sum, sub) => sum + sub.marksObtained, 0);
  const maxMarks = subjects.reduce((sum, sub) => sum + sub.totalMarks, 0);
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);
  const overallGrade = getGrade(percentage);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>REPORT CARD</Text>
          <Text style={styles.subtitle}>Your School Name</Text>
        </View>

        <View style={styles.studentInfo}>
          <View style={styles.infoItem}>
            <Text>Name: {studentInfo.studentName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text>Roll No: {studentInfo.rollNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text>Class: {studentInfo.className}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text>Exam: {studentInfo.examName}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSubject}>Subject</Text>
            <Text style={styles.colMarks}>Marks</Text>
            <Text style={styles.colGrade}>Grade</Text>
            <Text style={styles.colFeedback}>Feedback</Text>
          </View>

          {subjects.map((subject, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colSubject}>{subject.name}</Text>
              <Text style={styles.colMarks}>
                {subject.marksObtained}/{subject.totalMarks}
              </Text>
              <Text style={styles.colGrade}>
                {getGrade(subject.marksObtained)}
              </Text>
              <Text style={styles.colFeedback}>
                {subject.marksObtained >= 90
                  ? "Excellent"
                  : subject.marksObtained >= 70
                  ? "Good"
                  : subject.marksObtained >= 50
                  ? "Average"
                  : "Needs Improvement"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text>Total Marks</Text>
            <Text style={styles.summaryValue}>
              {totalMarks}/{maxMarks}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Percentage</Text>
            <Text style={styles.summaryValue}>{percentage}%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Overall Grade</Text>
            <Text style={styles.summaryValue}>{overallGrade}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportCardPDF;
