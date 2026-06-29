import { jsPDF } from 'jspdf';
import { FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DownloadButton = ({ animalData }) => {
  const downloadPDF = () => {
    try {
      toast.loading('Generating PDF...');
      
      const doc = new jsPDF();
      let yPos = 20;
      
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(animalData.animal, 20, yPos);
      yPos += 10;
      
      if (animalData.details?.scientific_name) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text(animalData.details.scientific_name, 20, yPos);
        yPos += 15;
      }
      
      if (animalData.details?.description) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const desc = animalData.details.description.substring(0, 500);
        const splitText = doc.splitTextToSize(desc, 170);
        doc.text(splitText, 20, yPos);
      }
      
      doc.save(`${animalData.animal}_info.pdf`);
      
      toast.dismiss();
      toast.success('PDF downloaded!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate PDF');
      console.error('PDF error:', error);
    }
  };

  return (
    <button onClick={downloadPDF} className="btn-secondary inline-flex items-center gap-2">
      <FaDownload /> Download PDF
    </button>
  );
};

export default DownloadButton;