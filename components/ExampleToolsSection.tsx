
import React from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

const tools = [
  {
    name: 'Resume Worded',
    description: 'Get an instant, AI-powered score and detailed feedback on your LinkedIn profile.',
    linkText: 'View Guide',
    id: 'resumeWorded',
  },
  {
    name: 'Jobscan',
    description: 'Optimize your profile by comparing it against specific job descriptions to improve your match rate.',
    linkText: 'View Guide',
    id: 'jobscan',
  },
];


interface ExampleToolsSectionProps {
    onSelectGuide: (guideId: string) => void;
}


const ExampleToolsSection: React.FC<ExampleToolsSectionProps> = ({ onSelectGuide }) => {
  return (
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Popular AI Tool Guides</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-black">
            Learn how to use popular third-party AI tools to enhance your LinkedIn profile with our step-by-step guides.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool.name} className="p-6 bg-white rounded-lg shadow-md flex flex-col">
              <DocumentTextIcon className="h-10 w-10 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold text-black">{tool.name}</h3>
              <p className="mt-2 text-black flex-grow">{tool.description}</p>
              <button 
                onClick={() => onSelectGuide(tool.id)}
                className="mt-4 text-blue-600 font-semibold hover:text-blue-800 self-start"
              >
                {tool.linkText} &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExampleToolsSection;
