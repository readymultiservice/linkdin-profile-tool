import React from 'react';
import type { AppView } from '../types';
import { GaugeIcon } from './icons/GaugeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { KeyIcon } from './icons/KeyIcon';
import { HashtagIcon } from './icons/HashtagIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface AllToolsSectionProps {
  onNavigate: (view: AppView) => void;
}

const allTools = [
    { name: 'Instant Profile Score', description: 'Get an instant AI score for your profile, with actionable feedback.', view: 'instant-score' as AppView, icon: GaugeIcon },
    { name: 'Job Match Analyzer', description: 'Analyze your resume against a job description for keyword gaps.', view: 'job-match' as AppView, icon: SearchIcon },
    { name: 'AI Content Strategist', description: 'Generate a 30-day content plan and post ideas for LinkedIn.', view: 'content-strategy' as AppView, icon: LightbulbIcon },
    { name: 'Keyword & SEO Strategist', description: 'Discover keywords, content outlines, and SEO insights.', view: 'keyword-research' as AppView, icon: KeyIcon },
    { name: 'Hashtag Generator', description: 'Find the best hashtags to maximize your reach and engagement.', view: 'hashtag-generator' as AppView, icon: HashtagIcon },
    { name: 'SEO & Rank Analyzer', description: 'Get an SEO score and ranking insights for your website or profile.', view: 'seo-analyzer' as AppView, icon: ChartBarIcon },
    { name: 'AI Resume Builder', description: 'Generate a clean, professional, ATS-friendly resume from your info.', view: 'resume-generator' as AppView, icon: DocumentTextIcon },
    { name: 'Construction RET Calculator', description: 'Estimate project cost & ROI for construction projects in India.', view: 'construction-ret-calculator' as AppView, icon: CalculatorIcon },
    { name: 'WhatsApp Marketing Tool', description: 'Connect your number, manage contacts, and send bulk messages.', view: 'whatsapp' as AppView, icon: WhatsAppIcon },
    { name: 'Marketing Toolkit', description: 'A curated collection of marketing tools and blueprints.', view: 'marketing-toolkit' as AppView, icon: WrenchScrewdriverIcon },
];

const AllToolsSection: React.FC<AllToolsSectionProps> = ({ onNavigate }) => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
                        Explore Our Full Suite of Tools
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
                        Everything you need to build your professional brand and accelerate your career.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {allTools.map((tool) => (
                        <button 
                            key={tool.view} 
                            onClick={() => onNavigate(tool.view)}
                            className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-lg flex flex-col items-start text-left transform hover:-translate-y-1 transition-transform hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white">
                                <tool.icon className="h-7 w-7" aria-hidden="true" />
                            </div>
                            <div className="mt-4 flex-grow">
                                <h3 className="text-lg font-bold text-black">{tool.name}</h3>
                                <p className="mt-2 text-base text-black">{tool.description}</p>
                            </div>
                             <div className="mt-4">
                                <span className="text-sm font-semibold text-blue-600">
                                    Launch Tool &rarr;
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllToolsSection;
