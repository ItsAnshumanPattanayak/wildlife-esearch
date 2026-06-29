import { useState } from 'react';
import { FaShare, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ShareButtons = ({ animalName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const shareUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
    setShowMenu(false);
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={() => setShowMenu(!showMenu)} 
        className="btn-secondary inline-flex items-center gap-2"
      >
        <FaShare /> Share
      </button>

      {showMenu && (
        <>
          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl p-4 z-50 min-w-[200px]">
            <p className="font-semibold mb-3 text-gray-700">Share {animalName}</p>
            
            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <FaLink className="text-2xl text-gray-600" />
              <span>Copy Link</span>
            </button>
            
            <button
              onClick={() => setShowMenu(false)}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default ShareButtons;