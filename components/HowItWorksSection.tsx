import React from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { ScanIcon } from './icons/ScanIcon';
import { PencilIcon } from './icons/PencilIcon';
import { DownloadIcon } from './icons/DownloadIcon';

const steps = [
  {
    name: '1. Enter Profile Details',
    description: 'Simply fill in the fields with your current LinkedIn profile information. No login required.',
    icon: LinkIcon,
  },
  {
    name: '2. Get Your Score',
    description: 'Our AI scans your profile data and provides a comprehensive score from 0 to 100.',
    icon: ScanIcon,
  },
  {
    name: '3. Receive Suggestions',
    description: 'Get personalized, AI-generated suggestions for your headline, summary, experiences, and skills.',
    icon: PencilIcon,
  },
  {
    name: '4. Apply & Improve',
    description: 'Implement the feedback to enhance your profile. An optional improvement checklist will be available.',
    icon: DownloadIcon,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <div className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Four Simple Steps to a Better Profile
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.name} className="pt-6">
                <div className="flow-root bg-slate-800 rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{step.name}</h3>
                    <p className="mt-5 text-base text-slate-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;