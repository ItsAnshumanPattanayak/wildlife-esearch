import { FaGithub, FaEnvelope, FaUniversity, FaBrain } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Wildlife eSearch</h3>
            <p className="text-gray-200">
              AI-powered wildlife identification and information system. 
              Identify animals instantly and learn everything about them.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-200 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/camera" className="text-gray-200 hover:text-white transition">
                  Camera Search
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-200 hover:text-white transition">
                  Text Search
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Developer</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaBrain className="text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Anshuman Pattanayak</p>
                  <p className="text-sm text-gray-200">AI & ML Expert</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaUniversity className="text-lg flex-shrink-0" />
                <div>
                  <p className="text-sm">Centurion University BBSR</p>
                  <p className="text-xs text-gray-200">B.Tech 4th Year</p>
                </div>
              </div>

              <a 
                href="mailto:anshumanpattanayak931@gmail.com"
                className="flex items-center gap-3 text-gray-200 hover:text-white transition"
              >
                <FaEnvelope className="text-lg" />
                <span className="text-sm">anshumanpattanayak931@gmail.com</span>
              </a>

              <a 
                href="https://github.com/ItsAnshumanPattanayak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-200 hover:text-white transition"
              >
                <FaGithub className="text-lg" />
                <span className="text-sm">ItsAnshumanPattanayak</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-gray-200 mb-2">
            Created by <span className="font-bold text-white">Anshuman Pattanayak</span>
          </p>
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Wildlife eSearch. All rights reserved.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Have questions or feedback? Feel free to reach out!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;