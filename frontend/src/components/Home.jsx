//import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaSearch, FaShieldAlt, FaMedkit, FaBook } from 'react-icons/fa';

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

export default Home;