import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

const benefits = [
  { name: 'Increase profile visibility by 3x.' },
  { name: 'Stand out in recruiter searches.' },
  { name: 'Save hours writing & editing.' },
  { name: 'Instant, actionable feedback.' },
];

const BenefitsSection: React.FC = () => {
  return (
    <div className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Transform Your Career Trajectory
            </p>
            <p className="mt-4 text-lg text-slate-300">
              A great LinkedIn profile is your digital handshake. Our tool ensures you make the best first impression, every time.
            </p>
            <dl className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.name} className="flex">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <dd className="ml-3 text-base text-slate-200 font-medium">{benefit.name}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-10 lg:mt-0" aria-hidden="true">
            <img 
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop" 
              alt="Professionals collaborating" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;