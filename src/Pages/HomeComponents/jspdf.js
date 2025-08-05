import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
