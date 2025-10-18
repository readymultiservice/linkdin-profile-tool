import React from 'react';
import type { AppView } from '../types';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
    onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                         <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
                             <svg className="h-8 w-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a9.375 9.375 0 01-9.375-9.375c0-5.183 4.192-9.375 9.375-9.375s9.375 4.192 9.375 9.375-4.192 9.375-9.375 9.375zm0-16.875a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm-1.125 7.5a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
                            </svg>
                            <span className="text-xl font-bold text-white">ProfilePilot AI</span>
                        </button>
                         <p className="mt-4 text-sm text-slate-400">AI-powered tools to elevate your professional brand.</p>
                         <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white"><LinkedInIcon className="h-6 w-6" /></a>
                            <a href="#" className="text-slate-400 hover:text-white"><TwitterIcon className="h-6 w-6" /></a>
                            <a href="#" className="text-slate-400 hover:text-white"><InstagramIcon className="h-6 w-6" /></a>
                         </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Tools</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => onNavigate('instant-score')} className="text-base text-slate-400 hover:text-white">Instant Score</button></li>
                            <li><button onClick={() => onNavigate('job-match')} className="text-base text-slate-400 hover:text-white">Job Match</button></li>
                            <li><button onClick={() => onNavigate('content-strategy')} className="text-base text-slate-400 hover:text-white">Content Strategy</button></li>
                            <li><button onClick={() => onNavigate('resume-generator')} className="text-base text-slate-400 hover:text-white">Resume Builder</button></li>
                            <li><button onClick={() => onNavigate('whatsapp')} className="text-base text-slate-400 hover:text-white">WhatsApp Tool</button></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => onNavigate('about')} className="text-base text-slate-400 hover:text-white">About</button></li>
                            <li><button onClick={() => onNavigate('blog')} className="text-base text-slate-400 hover:text-white">Blog</button></li>
                            <li><button onClick={() => onNavigate('services')} className="text-base text-slate-400 hover:text-white">Services</button></li>
                            <li><button onClick={() => onNavigate('pricing')} className="text-base text-slate-400 hover:text-white">Pricing</button></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => onNavigate('contact')} className="text-base text-slate-400 hover:text-white">Contact</button></li>
                            <li><button onClick={() => onNavigate('guides')} className="text-base text-slate-400 hover:text-white">Guides</button></li>
                            <li><button onClick={() => onNavigate('admin-login')} className="text-base text-slate-400 hover:text-white">Admin Login</button></li>
                        </ul>
                    </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                           <li><a href="#" className="text-base text-slate-400 hover:text-white">Privacy Policy</a></li>
                           <li><a href="#" className="text-base text-slate-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} ProfilePilot AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;