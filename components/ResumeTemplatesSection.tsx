import React from 'react';
import type { AppView } from '../types';
import { TemplateIcon } from './icons/TemplateIcon';

interface ResumeTemplatesSectionProps {
  onNavigate: (view: AppView) => void;
}

const templates = [
  {
    name: 'Professional',
    description: 'A clean, classic design favored by recruiters for its clarity and readability.',
    imageUrl: 'https://picsum.photos/seed/prof/400/565',
  },
  {
    name: 'Modern',
    description: 'A stylish, two-column layout with a photo and skill ratings to make a bold impression.',
    imageUrl: 'https://picsum.photos/seed/modern/400/565',
  },
  {
    name: 'Classic',
    description: 'A timeless, elegant format with a focus on typography and professional experience.',
    imageUrl: 'https://picsum.photos/seed/classic/400/565',
  },
  {
    name: 'ATS-Friendly',
    description: 'A simple, single-column template designed for optimal parsing by applicant tracking systems.',
    imageUrl: 'https://picsum.photos/seed/ats/400/565',
  },
  {
    name: 'Designer',
    description: 'A creative and visually appealing layout perfect for designers and artists.',
    imageUrl: 'https://picsum.photos/seed/designer/400/565',
  },
];

const ResumeTemplatesSection: React.FC<ResumeTemplatesSectionProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                <TemplateIcon className="h-10 w-10 text-blue-600" />
            </div>
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
            Professionally-Designed Resume Templates
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
            Choose a template, fill in your details, and download your new resume in minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.name}
              onClick={() => onNavigate('resume-generator')}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden text-left transform hover:-translate-y-2 transition-transform duration-300 border border-slate-200"
            >
              <div className="relative pb-[141%]"> {/* Aspect ratio for resume */}
                <img
                  className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={template.imageUrl}
                  alt={`${template.name} resume template`}
                />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full">Select Template</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black">{template.name}</h3>
                <p className="mt-2 text-base text-black">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplatesSection;
