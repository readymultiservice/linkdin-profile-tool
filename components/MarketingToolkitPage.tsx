import React, { useState } from 'react';
import type { AppView } from '../types';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface MarketingToolkitPageProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const toolCategories = [
    {
        name: "1. Landing Page & Funnel Builders",
        tools: [
            { name: "ClickFunnels", description: "Complete sales funnel builder.", isEnabled: false },
            { name: "Unbounce", description: "Landing page A/B testing and optimization.", isEnabled: false },
            { name: "Leadpages", description: "Easy drag-and-drop landing page creation.", isEnabled: false },
            { name: "Instapage", description: "Advanced personalization and ad-to-page relevance.", isEnabled: false },
        ],
        demoTools: [{ name: "Landing Page Optimizer", description: "A/B test headlines, CTAs, and images to find the winning combination.", view: 'landing-page-optimizer' as AppView }]
    },
    {
        name: "2. Email Marketing & Automation",
        tools: [
            { name: "Mailchimp", description: "Email campaigns, automation, and forms.", isEnabled: false },
            { name: "ActiveCampaign", description: "CRM + email automation.", isEnabled: false },
            { name: "HubSpot Marketing Hub", description: "Email, workflows, and lead nurturing.", isEnabled: false },
            { name: "GetResponse", description: "Email + webinars + landing pages.", isEnabled: false },
            { name: "ConvertKit", description: "Focused on creators and small businesses.", isEnabled: false },
        ],
        demoTools: [
            { name: "AI Email Strategy Generator", description: "A master prompt to generate a complete email marketing plan.", view: 'email-marketing-guide' as AppView },
            { name: "Simple Email Sender", description: "Compose and send a test email. (Simulation)", view: 'simple-email-sender' as AppView }
        ]
    },
    {
        name: "3. Customer Relationship Management (CRM)",
        tools: [
            { name: "HubSpot CRM", description: "Free + scalable, integrates with marketing hub.", isEnabled: false },
            { name: "Salesforce", description: "Enterprise-level CRM with automation.", isEnabled: false },
            { name: "Zoho CRM", description: "Affordable and flexible CRM.", isEnabled: false },
            { name: "Pipedrive", description: "Sales pipeline management with automation.", isEnabled: false },
        ],
        demoTools: [{ 
            name: "Developer Blueprint: All-in-One CRM", 
            description: "A complete prompt & blueprint to build a multi-tier CRM platform.", 
            view: 'crm-blueprint' as AppView 
        }]
    },
    {
        name: "4. Lead Capture & Forms",
        tools: [
            { name: "Typeform", description: "Interactive forms and surveys.", isEnabled: false },
            { name: "Jotform", description: "Customizable lead capture forms.", isEnabled: false },
            { name: "OptinMonster", description: "Pop-ups, slide-ins, and exit-intent lead forms.", isEnabled: false },
            { name: "Hello Bar", description: "Sticky bars and pop-ups for capturing leads.", isEnabled: false },
        ]
    },
    {
        name: "5. Social Media & Ads Lead Tools",
        tools: [
            { name: "LinkedIn Sales Navigator", description: "B2B lead prospecting.", isEnabled: false },
            { name: "Facebook Lead Ads", description: "Direct form submissions inside Facebook/Instagram.", isEnabled: false },
            { name: "Hootsuite", description: "Social media management with lead capture.", isEnabled: false },
            { name: "Sprout Social", description: "Analytics + social listening for lead opportunities.", isEnabled: false },
        ]
    },
    {
        name: "6. SEO & Content Marketing",
        tools: [
            { name: "SEMrush", description: "Keyword research, competitor tracking.", isEnabled: false },
            { name: "Ahrefs", description: "Content gap + backlink opportunities.", isEnabled: false },
            { name: "Surfer SEO", description: "Content optimization for ranking.", isEnabled: false },
            { name: "BuzzSumo", description: "Find high-performing content & influencers.", isEnabled: false },
        ]
    },
    {
        name: "7. Chatbots & Conversational Marketing",
        tools: [
            { name: "Drift", description: "AI chatbots for real-time lead qualification.", isEnabled: false },
            { name: "Intercom", description: "Chatbots, live chat, and customer engagement.", isEnabled: false },
            { name: "Tidio", description: "Multichannel live chat + automation.", isEnabled: false },
            { name: "ManyChat", description: "Messenger and Instagram chatbot automation.", isEnabled: false },
        ]
    },
    {
        name: "8. Webinar & Event Tools",
        tools: [
            { name: "Zoom Webinars", description: "Host lead-gen webinars.", isEnabled: false },
            { name: "WebinarJam", description: "Automated webinars for lead nurturing.", isEnabled: false },
            { name: "Demio", description: "Easy-to-use live webinar platform.", isEnabled: false },
            { name: "GoToWebinar", description: "Enterprise-friendly webinar solution.", isEnabled: false },
        ]
    },
    {
        name: "9. Analytics & Tracking",
        tools: [
            { name: "Google Analytics 4", description: "Website traffic & conversion tracking.", isEnabled: false },
            { name: "Hotjar", description: "Heatmaps, recordings, and form analytics.", isEnabled: false },
            { name: "Mixpanel", description: "Product usage analytics for SaaS.", isEnabled: false },
            { name: "Funnel.io", description: "Consolidates ad + marketing data.", isEnabled: false },
        ]
    },
    {
        name: "10. All-in-One Marketing Suites",
        tools: [
            { name: "HubSpot Marketing Hub", description: "Complete inbound marketing suite.", isEnabled: false },
            { name: "Marketo", description: "Enterprise-level marketing automation.", isEnabled: false },
            { name: "Keap (Infusionsoft)", description: "CRM + marketing automation.", isEnabled: false },
            { name: "Zoho Marketing Plus", description: "Unified marketing automation.", isEnabled: false },
        ]
    }
];

const MarketingToolkitPage: React.FC<MarketingToolkitPageProps> = ({ onBack, onNavigate }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(toolCategories[0]?.name || null);

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">The Ultimate Marketing & Lead Generation Toolkit</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">A curated collection of tools to supercharge your marketing efforts. One tool has been enabled as a 'self-working' demonstration.</p>
                </header>

                <div className="space-y-4">
                    {toolCategories.map(category => (
                        <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleCategory(category.name)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 focus:outline-none"
                                aria-expanded={openCategory === category.name}
                                aria-controls={`category-content-${category.name.replace(/\s/g, '-')}`}
                            >
                                <h3 className="text-xl font-bold text-black">{category.name}</h3>
                                <ArrowDownIcon className={`h-6 w-6 text-slate-500 transition-transform transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                            </button>
                            {openCategory === category.name && (
                                <div 
                                    id={`category-content-${category.name.replace(/\s/g, '-')}`}
                                    className="px-6 pb-6 animate-fade-in"
                                >
                                    <ul className="space-y-3 border-t pt-4">
                                        {category.demoTools && category.demoTools.map(demoTool => (
                                             <li key={demoTool.view}>
                                                <button onClick={() => onNavigate(demoTool.view)} className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
                                                    <p className="font-semibold text-blue-800">{demoTool.name} <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full ml-2">DEMO</span></p>
                                                    <p className="text-sm text-blue-700">{demoTool.description}</p>
                                                </button>
                                            </li>
                                        ))}
                                        {category.tools.map(tool => (
                                            <li key={tool.name} className={`p-3 rounded-lg ${tool.isEnabled ? 'bg-green-50' : 'bg-slate-100 opacity-60'}`}>
                                                <p className={`font-semibold ${tool.isEnabled ? 'text-green-800' : 'text-slate-600'}`}>{tool.name}</p>
                                                <p className={`text-sm ${tool.isEnabled ? 'text-green-700' : 'text-slate-500'}`}>{tool.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketingToolkitPage;