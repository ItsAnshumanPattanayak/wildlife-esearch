import { FaFacebook, FaTwitter, FaWhatsapp, FaShare } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ShareButtons = ({ animalName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const shareUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied!');
    setShowMenu(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setShowMenu(!showMenu)} className="btn-secondary">
        <FaShare /> Share
      </button>

      {showMenu && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl p-4 z-50 min-w-[200px]">
          <button onClick={copyLink} className="w-full text-left p-2 hover:bg-gray-100 rounded">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;