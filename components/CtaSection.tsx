import React from 'react';

interface CtaSectionProps {
  onGetStarted: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
          Ready to Land More Interviews?
        </h2>
        <p className="mt-4 max-w-md mx-auto text-lg text-slate-300">
          A standout profile is the first step. Let our AI give you the edge you need.
        </p>
        <div className="mt-8">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
          >
            Check My Profile Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;