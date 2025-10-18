
import React from 'react';
import type { AppView } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CheckIcon } from './icons/CheckIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { TargetIcon } from './icons/TargetIcon';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const whatWeDoItems = [
    "LinkedIn Profile Optimization",
    "Resume Builder & Sync",
    "Keyword Matching & Gap Analysis",
    "Content Strategy & Growth",
    "Coaching & Support"
];

const approachItems = [
    { name: "1. AI Accuracy", description: "We use advanced AI scoring systems to instantly highlight gaps." },
    { name: "2. Human Touch", description: "Every recommendation is reviewed and polished by experts." },
    { name: "3. Action-First", description: "You don’t just get feedback, you get ready-to-paste updates." },
    { name: "4. Growth Mindset", description: "We focus on long-term career visibility, not just short-term fixes." }
];

const whyChooseUsItems = [
    "Tailored for all industries",
    "Instant results with clear, actionable reports",
    "Balance of AI insights + human expertise",
    "Privacy-first: your data and resume are never shared",
    "Affordable packages with flexible add-ons"
];

const teamMembers = [
    { name: "Founder’s Name", role: "Career Strategist & LinkedIn Specialist" },
    { name: "AI Specialist", role: "Ensures profile scoring & keyword matching accuracy" },
    { name: "Content Strategist", role: "Crafts optimized About sections & content plans" },
    { name: "Client Success Manager", role: "Guides you from onboarding to growth" }
];


const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="bg-white animate-fade-in">
            {/* Hero Section */}
            <div className="bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        &larr; Back to Home
                    </button>
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Helping Professionals Shine on LinkedIn & Beyond</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-black">
                           We transform your LinkedIn profile, resume, and personal brand into powerful tools that open doors to new opportunities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-black">Our Story</h2>
                    <p className="mt-4 text-lg text-black leading-relaxed">
                        ProfilePilot AI was founded with a simple mission: make professionals stand out in the digital job market. We noticed that even highly skilled people were missing out on opportunities because their LinkedIn profiles and resumes weren’t telling their true story.
                    </p>
                    <p className="mt-4 text-lg text-black leading-relaxed">
                        So, we built a service that blends AI-powered tools with human expertise — delivering instant profile scoring, resume-to-LinkedIn sync, keyword optimization, and growth analytics. Whether you’re a student, job seeker, or experienced professional, we help you present your best self online.
                    </p>
                </div>
            </div>

            {/* What We Do Section */}
            <div className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                     <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-black">What We Do</h2>
                    </div>
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                        {whatWeDoItems.map(item => (
                            <div key={item} className="p-4 bg-white rounded-lg shadow-sm">
                                <p className="font-semibold text-black">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Our Approach Section */}
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-black">Our Approach</h2>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {approachItems.map(item => (
                             <div key={item.name} className="p-6 bg-slate-50 rounded-lg text-center">
                                <h3 className="font-bold text-lg text-black">{item.name}</h3>
                                <p className="mt-2 text-black">{item.description}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <h2 className="text-3xl font-extrabold text-black">Why Choose Us?</h2>
                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
                        {whyChooseUsItems.map(item => (
                            <li key={item} className="flex items-center text-lg text-black">
                                <CheckIcon className="h-6 w-6 mr-3 flex-shrink-0 text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div className="p-8 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                            <TargetIcon className="h-8 w-8 text-blue-600 mr-4"/>
                            <h3 className="text-2xl font-bold text-black">Our Mission</h3>
                        </div>
                        <p className="mt-4 text-lg text-black">To empower professionals worldwide to build authentic, optimized profiles that attract recruiters, clients, and opportunities.</p>
                    </div>
                     <div className="p-8 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                            <LightbulbIcon className="h-8 w-8 text-blue-600 mr-4"/>
                            <h3 className="text-2xl font-bold text-black">Our Vision</h3>
                        </div>
                        <p className="mt-4 text-lg text-black">To become the most trusted LinkedIn & Resume optimization platform — helping 1M+ professionals elevate their careers.</p>
                    </div>
                </div>
            </div>
            
             {/* Meet the Team Section */}
            <div className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-black">Meet the Team</h2>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map(member => (
                            <div key={member.name} className="text-center bg-white p-6 rounded-lg shadow-sm">
                                <div className="mx-auto h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center">
                                    <UsersIcon className="h-10 w-10 text-slate-500" />
                                </div>
                                <h4 className="mt-4 text-lg font-bold text-black">{member.name}</h4>
                                <p className="mt-1 text-sm text-blue-600 font-semibold">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <SparklesIcon className="h-12 w-12 text-blue-600 mx-auto" />
                    <h2 className="mt-4 text-3xl font-extrabold text-black">Ready to make your LinkedIn work for you?</h2>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                         <button
                            onClick={() => onNavigate('instant-score')}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
                        >
                            Get Your Free Profile Score
                        </button>
                        <a
                            href="mailto:consultation@profilepilot.ai"
                            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-lg hover:bg-slate-100 transition-colors shadow-lg border border-slate-300 transform hover:scale-105"
                        >
                            Book a Consultation
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;