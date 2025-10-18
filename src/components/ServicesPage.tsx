import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { GaugeIcon } from './icons/GaugeIcon';
import { SyncIcon } from './icons/SyncIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { UsersIcon } from './icons/UsersIcon';
import { PencilIcon } from './icons/PencilIcon';
import { ScanIcon } from './icons/ScanIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import type { AppView } from '../types';

const services = [
  { name: 'Instant Profile Score', description: '0–100 score with section breakdown (Headline, About, Experience, Skills, Engagement).', icon: GaugeIcon },
  { name: 'Resume ↔ LinkedIn Sync', description: 'Upload resume PDF to find gaps and copy high-impact achievements to your profile.', icon: SyncIcon },
  { name: 'AI Rewrites (Ready-to-Paste)', description: '3 headline options, 3 About variants, and revised experience bullets optimized for recruiters & ATS.', icon: SparklesIcon },
  { name: 'Keyword & Job Match', description: 'We match your profile to target job descriptions and return missing keywords to add.', icon: SearchIcon },
  { name: 'Content Strategy & Posts', description: '30-day posting calendar, 8 ready-to-post content ideas, hashtags & posting schedule.', icon: LightbulbIcon },
  { name: 'Analytics & Growth Tracking', description: 'Weekly reports using Shield/Inlytics + LinkedIn native analytics; measurable KPIs.', icon: ChartBarIcon },
  { name: 'One-on-One Coaching', description: 'Optional 1:1 session to refine messaging and outreach scripts.', icon: UsersIcon },
];

const howItWorksSteps = [
    { name: '1. Submit', description: 'Paste LinkedIn URL and/or upload resume PDF + enter target job titles.', icon: PencilIcon },
    { name: '2. Analyze', description: 'We run AI scoring and manual checks; create a prioritized action list.', icon: ScanIcon },
    { name: '3. Optimize', description: 'We deliver rewritten headline, About, 10 experience bullets, skills list, and featured content suggestions. You approve edits.', icon: SparklesIcon },
    { name: '4. Grow', description: 'We hand you a 30-day content plan + weekly analytics reporting, or manage posting for you (optional).', icon: TrophyIcon },
];

const deliverables = [
  "PDF Profile Report (score + recommendations)",
  "Copy-ready profile updates (Headline, About, Experience bullets)",
  "Keyword list and Job Match report",
  "30-day Content Plan (optional)",
  "Analytics dashboard export (weekly/monthly)",
];

const faqs = [
    {
        q: "How long until I see results?",
        a: "Profile visibility often improves within 2–6 weeks after applying changes and posting consistently."
    },
    {
        q: "Do you log into my LinkedIn account?",
        a: "No — we work with public profile data or uploaded resume content. For posting services, we can provide copy for you or post via a read-only scheduler you approve."
    },
    {
        q: "Can you tailor for specific roles?",
        a: "Yes — provide 1–3 target job descriptions; we’ll tailor keywords and examples to those roles."
    }
];

interface ServicesPageProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-white animate-fade-in">
        {/* Hero Section */}
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Turn Your LinkedIn Into a Lead-Generating, Interview-Getting Profile</h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-black">
                        AI-powered profile scoring, resume & LinkedIn sync, content strategy, and analytics — done for you.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => onNavigate('instant-score')}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
                        >
                            Get My Free Profile Score
                        </button>
                        <a
                            href="mailto:consultation@profilepilot.ai"
                            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-lg hover:bg-slate-100 transition-colors shadow-lg border border-slate-300 transform hover:scale-105"
                        >
                            Book a 15-min Consultation
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        {/* What We Do Section */}
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                <h2 className="text-3xl font-extrabold text-black">What We Do</h2>
                <p className="mt-4 text-lg text-black">
                    We combine AI tools, industry best practices, and hands-on editing to optimize every part of your LinkedIn — headline, About, experience bullets, skills, featured media, and content strategy. We also compare your resume and LinkedIn, give a clear score, and provide a prioritized action plan.
                </p>
            </div>
        </div>

        {/* Core Services Section */}
        <div className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-black">Core Services</h2>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.name} className="p-6 bg-white rounded-lg shadow-md flex flex-col items-start">
                            <service.icon className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-black">{service.name}</h3>
                            <p className="mt-2 text-black flex-grow">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-black">How It Works</h2>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                     {howItWorksSteps.map((step) => (
                         <div key={step.name} className="text-center">
                            <div className="flex justify-center items-center">
                                <span className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full">
                                    <step.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-medium text-black">{step.name}</h3>
                            <p className="mt-2 text-base text-black">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Combined Deliverables & Privacy Section */}
         <div className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl font-extrabold text-black">Deliverables</h2>
                    <p className="mt-3 text-black">Here's what you get.</p>
                    <ul className="mt-6 space-y-3">
                         {deliverables.map(item => (
                             <li key={item} className="flex items-start text-black"><CheckIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />{item}</li>
                         ))}
                    </ul>
                </div>
                <div>
                     <h2 className="text-3xl font-extrabold text-black">Technical & Privacy Notes</h2>
                      <p className="mt-3 text-black">Your data is safe with us.</p>
                     <ul className="mt-6 space-y-6">
                        <li className="flex items-start text-black">
                           <EyeSlashIcon className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                           <div>
                            <h4 className="font-semibold">No Passwords Needed</h4>
                            We analyze only public LinkedIn data or uploaded resume files. We never ask for your LinkedIn password.
                           </div>
                        </li>
                        <li className="flex items-start text-black">
                           <ShieldCheckIcon className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                           <div>
                            <h4 className="font-semibold">Secure & Private</h4>
                            Resume uploads are processed securely and can be deleted on request.
                           </div>
                        </li>
                         <li className="flex items-start text-black">
                           <SparklesIcon className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                           <div>
                            <h4 className="font-semibold">Human-Reviewed AI</h4>
                           We use AI models and industry tools to generate suggestions; every edit is reviewed by a human before delivery.
                           </div>
                        </li>
                     </ul>
                </div>
            </div>
        </div>

        {/* FAQs Section */}
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <h2 className="text-3xl font-extrabold text-black text-center">Frequently Asked Questions</h2>
                <div className="mt-8 space-y-4">
                    {faqs.map(faq => (
                        <details key={faq.q} className="p-4 border border-slate-200 rounded-lg bg-white group cursor-pointer">
                            <summary className="font-semibold text-black list-none flex justify-between items-center">
                                {faq.q}
                                <div className="transition-transform transform group-open:rotate-180">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </summary>
                            <p className="mt-3 text-black">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </div>

        {/* CTA Block */}
        <div className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-3xl font-extrabold text-black">Ready to transform your LinkedIn?</h2>
                 <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => onNavigate('instant-score')}
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
                    >
                        Get My Free Profile Score
                    </button>
                    <a
                        href="mailto:consultation@profilepilot.ai"
                        className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-lg hover:bg-slate-100 transition-colors shadow-lg border border-slate-300 transform hover:scale-105"
                    >
                        Book a 15-min Consultation
                    </a>
                </div>
            </div>
        </div>

    </div>
  );
};

export default ServicesPage;