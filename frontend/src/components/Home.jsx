import { Link } from 'react-router-dom';
import { FaCamera, FaSearch, FaShieldAlt, FaMedkit, FaBook, FaGithub, FaEnvelope, FaUniversity, FaBrain } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🦁 Welcome to Wildlife eSearch
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Identify animals instantly using AI and learn everything about them
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/camera" className="btn-primary text-lg px-8 py-4">
            <FaCamera className="text-2xl" />
            Start Camera Search
          </Link>
          <Link to="/search" className="btn-secondary text-lg px-8 py-4">
            <FaSearch className="text-2xl" />
            Search by Name
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <FeatureCard 
          icon={<FaCamera className="text-5xl text-purple-600" />}
          title="Image Recognition"
          description="Upload or capture photos to identify any animal instantly using advanced AI"
        />
        <FeatureCard 
          icon={<FaBook className="text-5xl text-blue-600" />}
          title="Detailed Information"
          description="Get comprehensive details including habitat, diet, behavior, and more"
        />
        <FeatureCard 
          icon={<FaShieldAlt className="text-5xl text-green-600" />}
          title="Safety Guidelines"
          description="Learn how to protect yourself and stay safe around different animals"
        />
        <FeatureCard 
          icon={<FaMedkit className="text-5xl text-red-600" />}
          title="Medical Information"
          description="First aid steps and treatment information for bites and attacks"
        />
        <FeatureCard 
          icon={<FaSearch className="text-5xl text-indigo-600" />}
          title="Smart Search"
          description="Search by animal name and explore our extensive database"
        />
        <FeatureCard 
          icon={<span className="text-5xl">🌍</span>}
          title="Global Database"
          description="Access information about animals from all around the world"
        />
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step 
            number="1"
            title="Capture or Upload"
            description="Take a photo with your camera or upload an existing image"
          />
          <Step 
            number="2"
            title="AI Identification"
            description="Our AI analyzes the image and identifies the animal"
          />
          <Step 
            number="3"
            title="Learn & Explore"
            description="Get detailed information, safety tips, and medical guidance"
          />
        </div>
      </div>

      {/* Popular Animals */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Animals</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <AnimalCard emoji="🦁" name="Lion" />
          <AnimalCard emoji="🐅" name="Tiger" />
          <AnimalCard emoji="🐘" name="Elephant" />
          <AnimalCard emoji="🦅" name="Eagle" />
          <AnimalCard emoji="🦈" name="Shark" />
          <AnimalCard emoji="🐺" name="Wolf" />
          <AnimalCard emoji="🐻" name="Bear" />
          <AnimalCard emoji="🐬" name="Dolphin" />
          <AnimalCard emoji="🦒" name="Giraffe" />
          <AnimalCard emoji="🐧" name="Penguin" />
        </div>
      </div>

      {/* Developer Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <FaBrain className="text-6xl mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl font-bold mb-3">👨‍💻 Meet the Developer</h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-3xl font-bold mb-3">Anshuman Pattanayak</h3>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4 text-lg">
              <div className="flex items-center gap-2">
                <FaUniversity className="text-2xl" />
                <div className="text-left">
                  <p className="font-semibold">Centurion University BBSR</p>
                  <p className="text-sm text-gray-200">B.Tech 4th Year</p>
                </div>
              </div>
              
              <div className="hidden md:block text-3xl">•</div>
              
              <div className="flex items-center gap-2">
                <FaBrain className="text-2xl" />
                <div className="text-left">
                  <p className="font-semibold">AI & ML Expert</p>
                  <p className="text-sm text-gray-200">Artificial Intelligence Specialist</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
            Passionate about creating AI-powered solutions that make a difference in wildlife conservation 
            and education. This project combines <span className="font-bold">Computer Vision</span>, 
            <span className="font-bold"> Machine Learning</span>, and 
            <span className="font-bold"> Full-Stack Development</span> to help people understand and protect wildlife.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">🛠️ Technologies Used</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <TechBadge>React</TechBadge>
              <TechBadge>Python</TechBadge>
              <TechBadge>FastAPI</TechBadge>
              <TechBadge>Node.js</TechBadge>
              <TechBadge>MongoDB</TechBadge>
              <TechBadge>TailwindCSS</TechBadge>
              <TechBadge>Computer Vision</TechBadge>
              <TechBadge>REST APIs</TechBadge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <a
              href="mailto:anshumanpattanayak931@gmail.com"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2 shadow-lg"
            >
              <FaEnvelope className="text-xl" />
              <span>Email Me</span>
            </a>
            <a
              href="https://github.com/ItsAnshumanPattanayak"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition inline-flex items-center gap-2 shadow-lg border-2 border-white/50"
            >
              <FaGithub className="text-xl" />
              <span>GitHub Profile</span>
            </a>
          </div>

          <div className="border-t border-white/30 pt-6">
            <p className="text-sm text-gray-200">
              💡 Have questions, suggestions, or want to collaborate? Feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="card text-center">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AnimalCard = ({ emoji, name }) => (
  <Link 
    to={`/animal/${name}`}
    className="card text-center hover:shadow-xl cursor-pointer"
  >
    <div className="text-5xl mb-2">{emoji}</div>
    <p className="font-semibold">{name}</p>
  </Link>
);

const TechBadge = ({ children }) => (
  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
    {children}
  </span>
);

export default Home;