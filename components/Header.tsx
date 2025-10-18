import React, { useState, useEffect, useRef } from 'react';
import type { AppView } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  onNavigate: (view: AppView) => void;
}

const allSearchableItems = [
    { name: 'Home', view: 'home' as AppView },
    { name: 'Instant Profile Score', view: 'instant-score' as AppView },
    { name: 'Job Match Analyzer', view: 'job-match' as AppView },
    { name: 'AI Content Strategist', view: 'content-strategy' as AppView },
    { name: 'Keyword & SEO Strategist', view: 'keyword-research' as AppView },
    { name: 'Hashtag Generator', view: 'hashtag-generator' as AppView },
    { name: 'SEO & Rank Analyzer', view: 'seo-analyzer' as AppView },
    { name: 'AI Resume Builder', view: 'resume-generator' as AppView },
    { name: 'Construction RET Calculator', view: 'construction-ret-calculator' as AppView },
    { name: 'WhatsApp Tool', view: 'whatsapp' as AppView },
    { name: 'Marketing Toolkit', view: 'marketing-toolkit' as AppView },
    { name: 'Services', view: 'services' as AppView },
    { name: 'Guides', view: 'guides' as AppView },
    { name: 'Blog', view: 'blog' as AppView },
    { name: 'Pricing', view: 'pricing' as AppView },
    { name: 'Contact', view: 'contact' as AppView },
    { name: 'About Us', view: 'about' as AppView },
    { name: 'Expert Resume Writer', view: 'expert-resume-writer' as AppView },
];


const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{name: string; view: AppView}[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    
    // Mock user login state
    const isLoggedIn = true; // Changed to true to show admin/account view

    const navLinkClasses = "text-sm font-semibold text-black hover:text-blue-600 transition-colors";
    const mobileNavLinkClasses = "block py-2 px-3 rounded-md text-base font-medium text-black hover:bg-slate-100 hover:text-blue-600";
    
    const allTools = [
        { name: 'Instant Profile Score', view: 'instant-score' as AppView },
        { name: 'Job Match Analyzer', view: 'job-match' as AppView },
        { name: 'AI Content Strategist', view: 'content-strategy' as AppView },
        { name: 'Keyword & SEO Strategist', view: 'keyword-research' as AppView },
        { name: 'Hashtag Generator', view: 'hashtag-generator' as AppView },
        { name: 'SEO & Rank Analyzer', view: 'seo-analyzer' as AppView },
        { name: 'AI Resume Builder', view: 'resume-generator' as AppView },
        { name: 'Construction RET Calculator', view: 'construction-ret-calculator' as AppView },
        { name: 'WhatsApp Tool', view: 'whatsapp' as AppView },
        { name: 'Marketing Toolkit', view: 'marketing-toolkit' as AppView },
    ];

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            setIsSearchActive(false);
            return;
        }

        const filtered = allSearchableItems.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearchActive(true);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNav = (view: AppView) => {
        onNavigate(view);
        setIsMenuOpen(false);
        setIsToolsOpen(false);
        setIsAccountOpen(false);
        setSearchQuery('');
        setIsSearchActive(false);
    };

    const SearchBar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className="relative" ref={isMobile ? null : searchRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
                id={isMobile ? "search-mobile" : "search"}
                name={isMobile ? "search-mobile" : "search"}
                className={`block w-full border rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:outline-none focus:ring-blue-500 ${isMobile ? 'bg-white border-slate-300' : 'bg-slate-100 border-transparent focus:bg-white focus:border-blue-500'}`}
                placeholder="Search tools & pages..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
            />
            {isSearchActive && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full md:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-20 max-h-80 overflow-y-auto">
                    {searchResults.map(item => (
                        <button 
                            key={item.view} 
                            onClick={() => handleNav(item.view)} 
                            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-slate-100"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => handleNav('home')} className="flex-shrink-0 flex items-center space-x-2">
                             <svg className="h-8 w-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a9.375 9.375 0 01-9.375-9.375c0-5.183 4.192-9.375 9.375-9.375s9.375 4.192 9.375 9.375-4.192 9.375-9.375 9.375zm0-16.875a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm-1.125 7.5a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
                            </svg>
                            <span className="text-xl font-bold text-black">ProfilePilot AI</span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex flex-1 items-center justify-end">
                        <div className="flex items-baseline space-x-6">
                            <button onClick={() => handleNav('home')} className={navLinkClasses}>Home</button>
                             <div className="relative" onMouseLeave={() => setIsToolsOpen(false)}>
                                <button onMouseEnter={() => setIsToolsOpen(true)} className={`${navLinkClasses} flex items-center`}>
                                    Tools
                                    <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {isToolsOpen && (
                                     <div className="absolute -left-8 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-20">
                                        {allTools.map(tool => (
                                             <button key={tool.view} onClick={() => handleNav(tool.view)} className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-slate-100">{tool.name}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button onClick={() => handleNav('services')} className={navLinkClasses}>Services</button>
                            <button onClick={() => handleNav('guides')} className={navLinkClasses}>Guides</button>
                             <button onClick={() => handleNav('blog')} className={navLinkClasses}>Blog</button>
                            <button onClick={() => handleNav('pricing')} className={navLinkClasses}>Pricing</button>
                            <button onClick={() => handleNav('contact')} className={navLinkClasses}>Contact</button>
                        </div>
                        
                        <div className="ml-6">
                           <SearchBar />
                        </div>
                        
                        <div className="ml-4">
                            {isLoggedIn ? (
                                <div className="relative" onMouseLeave={() => setIsAccountOpen(false)}>
                                    <button onMouseEnter={() => setIsAccountOpen(true)} className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                       <UserCircleIcon className="h-8 w-8 text-black" />
                                    </button>
                                    {isAccountOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                                            <button onClick={() => handleNav('admin')} className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-slate-100">Admin Panel</button>
                                            <button onClick={() => handleNav('account-settings')} className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-slate-100">Settings</button>
                                            <button onClick={() => { /* Logout logic here */ handleNav('login'); }} className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-slate-100">Sign out</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                 <div className="flex items-center space-x-2">
                                    <button onClick={() => handleNav('login')} className="text-sm font-semibold text-black hover:text-blue-600">Sign In</button>
                                    <button onClick={() => handleNav('signup')} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">Sign Up</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden" ref={searchRef}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <div className="px-2 py-2">
                            <SearchBar isMobile={true} />
                        </div>

                        <button onClick={() => handleNav('home')} className={mobileNavLinkClasses}>Home</button>
                        {allTools.map(tool => (
                             <button key={tool.view} onClick={() => handleNav(tool.view)} className={`${mobileNavLinkClasses} pl-6`}>- {tool.name}</button>
                        ))}
                        <button onClick={() => handleNav('services')} className={mobileNavLinkClasses}>Services</button>
                        <button onClick={() => handleNav('guides')} className={mobileNavLinkClasses}>Guides</button>
                        <button onClick={() => handleNav('blog')} className={mobileNavLinkClasses}>Blog</button>
                        <button onClick={() => handleNav('pricing')} className={mobileNavLinkClasses}>Pricing</button>
                        <button onClick={() => handleNav('contact')} className={mobileNavLinkClasses}>Contact</button>
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-200">
                         <div className="px-2 space-y-1">
                             <button onClick={() => handleNav('login')} className={mobileNavLinkClasses}>Sign In</button>
                             <button onClick={() => handleNav('signup')} className={mobileNavLinkClasses}>Sign Up</button>
                         </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;