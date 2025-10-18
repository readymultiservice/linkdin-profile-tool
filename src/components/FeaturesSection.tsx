import React from 'react';
import { GaugeIcon } from './icons/GaugeIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { SearchIcon } from './icons/SearchIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

const credentials = [
  {
    name: 'AI-Powered Accuracy',
    description: 'Trained on 10M+ job postings.',
    icon: SparklesIcon,
  },
  {
    name: 'Fast & Secure',
    description: 'Private data, results in seconds.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Job-Ready Insights',
    description: 'Increases profile views & callbacks.',
    icon: BriefcaseIcon,
  },
  {
    name: 'Trusted by Professionals',
    description: 'Used by 25,000+ job seekers.',
    icon: UsersIcon,
  },
];

const services = [
  {
    name: 'Instant LinkedIn Profile Score',
    description: 'See where you stand in real-time. Get section-wise suggestions for headline, summary, skills & keywords.',
    tag: 'Free instant report',
    icon: GaugeIcon,
  },
  {
    name: 'Resume Optimizer',
    description: 'Upload your PDF/Doc — AI scores it against industry standards & job descriptions.',
    tag: 'ATS-friendly analysis',
    icon: DocumentTextIcon,
  },
  {
    name: 'Content & Growth Tools',
    description: 'Plan, write & optimize LinkedIn posts with AI assistance. Track what engages your network.',
    tag: 'Templates & analytics',
    icon: ChartBarIcon,
  },
  {
    name: 'Job Match Analyzer',
    description: 'Paste a job description & your profile — get a keyword gap analysis and recruiter alignment score.',
    tag: 'Increases job relevancy',
    icon: SearchIcon,
  },
   {
    name: 'Engagement Analytics',
    description: 'Go beyond views: see impressions, reach, content performance & profile search stats.',
    tag: 'Advanced reporting',
    icon: ChartBarIcon,
  },
  {
    name: 'Coaching Mode',
    description: 'Step-by-step guidance + expert tips inside the tool. Learn exactly how to stand out.',
    tag: 'Premium',
    icon: UsersIcon,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Boost Your Career with AI-Powered LinkedIn & Resume Tools
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-slate-300 lg:mx-auto">
            Instant scores. Actionable insights. Smarter networking.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item) => (
            <div key={item.name} className="p-4 bg-slate-700/50 rounded-lg shadow-sm flex items-center space-x-4">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="p-6 bg-slate-700 rounded-lg shadow-lg flex flex-col transform hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                        <service.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                        {service.tag}
                    </span>
                </div>
                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-bold text-white">{service.name}</h3>
                  <p className="mt-2 text-base text-slate-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

      </div>
    </div>
  );
};

export default FeaturesSection;