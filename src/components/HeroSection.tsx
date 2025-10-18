import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
            Transform Your LinkedIn Profile with AI
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-black">
            Get instant, data-driven feedback to stand out to recruiters, attract opportunities, and build your professional brand.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
            >
              Analyze Your Profile for Free
            </button>
          </div>
          <div className="mt-6 text-sm text-black flex items-center justify-center">
            <LinkedInIcon className="h-5 w-5 mr-2 text-black" />
            No login required. 100% secure and private.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;