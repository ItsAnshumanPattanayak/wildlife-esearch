import { jsPDF } from 'jspdf';
import { FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DownloadButton = ({ animalData }) => {
  const downloadPDF = () => {
    try {
      toast.loading('Generating PDF...');
      
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(animalData.animal, 20, 20);
      
      doc.setFontSize(12);
      doc.text(animalData.details?.scientific_name || '', 20, 30);
      
      doc.setFontSize(10);
      const description = animalData.details?.description || '';
      const splitText = doc.splitTextToSize(description.substring(0, 500), 170);
      doc.text(splitText, 20, 40);
      
      doc.save(`${animalData.animal}_info.pdf`);
      
      toast.dismiss();
      toast.success('PDF downloaded!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <button onClick={downloadPDF} className="btn-secondary">
      <FaDownload /> Download PDF
    </button>
  );
};

export default DownloadButton;