
import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';

const trustPoints = [
  {
    name: 'No Login Required',
    description: 'We never ask for or store your LinkedIn login details. Your account credentials remain private.',
    icon: EyeSlashIcon,
  },
  {
    name: 'Secure & Private',
    description: 'The information you provide is only used for the analysis and is not stored or shared.',
    icon: ShieldCheckIcon,
  },
];

const TrustSection: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Trust & Security</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
                Your Privacy is Our Priority
            </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {trustPoints.map((point) => (
              <div key={point.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <point.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-black">{point.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-black">{point.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
