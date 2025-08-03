// components/ReportCardPDF.jsx
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Style definitions
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#e0e7ff",
    color: "#1e40af",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  studentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoLeft: {
    width: "50%",
  },
  infoRight: {
    width: "50%",
    textAlign: "right",
  },
  label: {
    fontWeight: "bold",
  },
  table: {
    borderWidth: 1,
    borderColor: "#1e3a8a",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: 6,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  colSubject: { width: "40%" },
  colMarks: { width: "20%", textAlign: "center" },
  colGrade: { width: "20%", textAlign: "center" },
  colFeedback: { width: "20%" },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  scaleBox: {
    width: "48%",
    fontSize: 10,
    lineHeight: 1.5,
  },
  attendanceBox: {
    width: "48%",
    fontSize: 10,
    lineHeight: 1.5,
  },
});

const getGrade = (mark) => {
  if (mark >= 80) return "A+";
  if (mark >= 70) return "A";
  if (mark >= 60) return "A-";
  if (mark >= 50) return "B";
  if (mark >= 40) return "C";
  if (mark >= 33) return "D";
  return "F";
};

const ReportCardPDF = ({ studentInfo, subjects, percentage }) => {
  // const totalMarks = subjects.reduce((sum, sub) => sum + sub.marksObtained, 0);
  // const maxMarks = subjects.reduce((sum, sub) => sum + sub.totalMarks, 0);
  // const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);
  // const overallGrade = getGrade(percentage);
  // const resultStatus = overallGrade === "F" ? "FAIL" : "PASS";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>REPORT CARD - 2025</Text>
          <Text style={styles.subtitle}>Your School Name</Text>
          <Text style={styles.badge}>{percentage >= 40 ? "PASS" : "FAIL"}</Text>
        </View>

        {/* Student Info */}
        <View style={styles.studentInfo}>
          <View style={styles.infoLeft}>
            <Text>
              <Text style={styles.label}>Name:</Text> {studentInfo.studentName}
            </Text>
            <Text>
              <Text style={styles.label}>Class:</Text> {studentInfo.className}
            </Text>
          </View>
          <View style={styles.infoRight}>
            <Text>
              <Text style={styles.label}>Roll Number:</Text>{" "}
              {studentInfo.rollNumber}
            </Text>
            <Text>
              <Text style={styles.label}>Exam:</Text> {studentInfo.examName}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSubject}>Subject</Text>
            <Text style={styles.colMarks}>Mark</Text>
            <Text style={styles.colGrade}>Grade</Text>
            <Text style={styles.colFeedback}>Feedback</Text>
          </View>

          {subjects.map((sub, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colSubject}>{sub.name}</Text>
              <Text style={styles.colMarks}>{sub.marksObtained}</Text>
              <Text style={styles.colGrade}>{getGrade(sub.marksObtained)}</Text>
              <Text style={styles.colFeedback}>
                {sub.marksObtained >= 90
                  ? "Excellent"
                  : sub.marksObtained >= 70
                  ? "Good"
                  : sub.marksObtained >= 50
                  ? "Average"
                  : "Needs Improvement"}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.scaleBox}>
            <Text>Grading Scale:</Text>
            <Text>A+ = 80-100</Text>
            <Text>A = 70-79</Text>
            <Text>A- = 60-69</Text>
            <Text>B = 50-59</Text>
            <Text>C = 40-49</Text>
            <Text>D = 33-39</Text>
            <Text>Fail = Below 33</Text>
          </View>
          <View style={styles.attendanceBox}>
            <Text>Total Days of School:</Text>
            <Text>Days Attended: {studentInfo.present}</Text>
            <Text>Days Absent: {studentInfo.absent}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportCardPDF;
