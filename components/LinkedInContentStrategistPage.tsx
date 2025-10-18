
import React, { useState } from 'react';
import type { ContentStrategyInput, ContentStrategyResult, PostDraft } from '../types';
import { generateContentStrategy } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

const LinkedInContentStrategistPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [inputs, setInputs] = useState<ContentStrategyInput>({
        industry: '',
        audience: 'Recruiters',
        goal: 'Job Hunting',
        style: 'Professional'
    });
    const [result, setResult] = useState<ContentStrategyResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const apiResult = await generateContentStrategy(inputs);
            setResult(apiResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";
    
    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                 <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">AI LinkedIn Content Strategist</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Generate a complete 30-day content plan, post drafts, and engagement strategy in seconds.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="industry" className={labelClasses}>Industry / Niche</label>
                                <input type="text" id="industry" name="industry" value={inputs.industry} onChange={handleInputChange} className={inputClasses} placeholder="e.g., B2B SaaS Marketing" required />
                            </div>
                            <div>
                                <label htmlFor="audience" className={labelClasses}>Target Audience</label>
                                <select id="audience" name="audience" value={inputs.audience} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Recruiters</option>
                                    <option>Industry Professionals</option>
                                    <option>Potential Clients / Leads</option>
                                    <option>General Networking</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="goal" className={labelClasses}>Personal Brand Goal</label>
                                <select id="goal" name="goal" value={inputs.goal} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Job Hunting</option>
                                    <option>Sales & Lead Generation</option>
                                    <option>Thought Leadership</option>
                                    <option>Networking</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="style" className={labelClasses}>Style Preference</label>
                                <select id="style" name="style" value={inputs.style} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Professional</option>
                                    <option>Storytelling</option>
                                    <option>Casual & Relatable</option>
                                    <option>Data-driven & Analytical</option>
                                </select>
                            </div>
                             <div>
                                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isLoading ? (
                                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating Strategy...</>
                                    ) : 'Create Content Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md min-h-[500px]">
                        <h2 className="text-2xl font-bold text-black mb-6">Your Content Strategy</h2>
                        {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center"><svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="ml-3 text-black">AI is strategizing...</span></div></div>}
                        {error && <div className="text-center p-8 text-red-600">{error}</div>}
                        {!isLoading && !error && !result && <div className="text-center p-8 text-black">Your generated content plan will appear here.</div>}
                        {result && <ContentStrategyResultsDisplay result={result} />}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ContentStrategyResultsDisplay: React.FC<{result: ContentStrategyResult}> = ({ result }) => (
    <div className="space-y-10 animate-fade-in">
        {/* Content Calendar */}
        <div>
            <h3 className="text-xl font-bold text-black mb-4">📅 Content Calendar (30 Days)</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Day</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Post Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Topic Idea</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200 text-sm text-black">
                        {result.contentCalendar.map(item => (
                            <tr key={item.day}>
                                <td className="px-4 py-2 font-semibold">{item.day}</td>
                                <td className="px-4 py-2"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{item.postType}</span></td>
                                <td className="px-4 py-2">{item.topicIdea}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        {/* Trending Topics & Engagement Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center"><TrendingUpIcon className="h-6 w-6 mr-2 text-blue-600" /> 🔥 Trending Topics</h3>
                <ul className="list-disc list-inside space-y-2 text-black">
                    {result.trendingTopics.map((topic, i) => <li key={i}>{topic}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center"><LightbulbIcon className="h-6 w-6 mr-2 text-blue-600" /> 📌 Engagement Tips</h3>
                <div className="space-y-3">
                    <div>
                        <h4 className="font-semibold text-black">Best Posting Times:</h4>
                        <p className="text-sm text-black">{result.engagementTips.postingTimes}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black">Strategies:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-black">
                             {result.engagementTips.strategies.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Post Drafts */}
        <div>
            <h3 className="text-xl font-bold text-black mb-4">📝 Post Drafts</h3>
            <div className="space-y-6">
                {result.postDrafts.map((draft, i) => <PostDraftCard key={i} draft={draft} />)}
            </div>
        </div>
    </div>
);

const PostDraftCard: React.FC<{ draft: PostDraft }> = ({ draft }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <p className="font-semibold text-black italic">"{draft.hook}"</p>
        <p className="mt-2 text-black whitespace-pre-wrap">{draft.body}</p>
        <p className="mt-3 font-semibold text-black">{draft.cta}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {draft.hashtags.map(tag => <span key={tag} className="text-xs text-blue-700 font-medium">#{tag}</span>)}
        </div>
    </div>
);


const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182 3.182m3.182-3.182v4.995m-3.182 0h4.995" />
  </svg>
);


export default LinkedInContentStrategistPage;