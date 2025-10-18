
import React from 'react';
import type { AppView } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface PricingPageProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-white animate-fade-in">
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Simple, Transparent Pricing</h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-black">
                        Choose the plan that fits your career goals. Get started for free or upgrade for advanced tools.
                    </p>
                </div>
            </div>
        </div>
        
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {/* Starter Package */}
                    <div className="border border-slate-200 rounded-lg p-8 flex flex-col bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-black">Starter</h3>
                        <p className="mt-4 text-black">For a quick analysis and essential improvements.</p>
                        <p className="mt-6 text-4xl font-extrabold text-black">₹1,999</p>
                        <ul className="mt-8 space-y-4 text-black flex-grow">
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />Instant Profile Score + 1-page report</li>
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />1 Headline + 1 About suggestion</li>
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />1 week email support</li>
                        </ul>
                        <button onClick={() => onNavigate('signup')} className="mt-8 w-full bg-slate-200 text-black font-semibold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors">Choose Starter</button>
                    </div>

                    {/* Professional Package */}
                     <div className="border-2 border-blue-600 rounded-lg p-8 flex flex-col relative bg-white shadow-2xl">
                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                        </div>
                        <h3 className="text-2xl font-bold text-black">Professional</h3>
                        <p className="mt-4 text-black">The complete toolkit for serious job seekers.</p>
                        <p className="mt-6 text-4xl font-extrabold text-black">₹4,999</p>
                        <ul className="mt-8 space-y-4 text-black flex-grow">
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />Full profile audit + scorecard</li>
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />3 headline options, 3 About variants, 6 experience bullets rewritten</li>
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />Resume ↔ LinkedIn gap analysis</li>
                            <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />2 weeks content calendar + 3 post drafts</li>
                        </ul>
                         <button onClick={() => onNavigate('signup')} className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Choose Professional</button>
                    </div>

                    {/* Growth Package */}
                    <div className="border border-slate-200 rounded-lg p-8 flex flex-col bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-black">Growth</h3>
                        <p className="mt-4 text-black">Ongoing support for continuous career growth.</p>
                        <p className="mt-6 text-4xl font-extrabold text-black">₹9,999<span className="text-xl font-medium text-black">/mo</span></p>
                        <ul className="mt-8 space-y-4 text-black flex-grow">
                             <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />Everything in Professional</li>
                             <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />Weekly analytics report & optimization</li>
                             <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />8 posts per month (drafted)</li>
                             <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />1 monthly coaching call</li>
                        </ul>
                        <button onClick={() => onNavigate('signup')} className="mt-8 w-full bg-slate-200 text-black font-semibold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors">Choose Growth</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PricingPage;