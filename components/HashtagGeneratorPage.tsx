
import React, { useState } from 'react';
import type { HashtagStrategyInput, HashtagStrategyResult } from '../types';
import { generateHashtagStrategy } from '../services/geminiService';
import HashtagStrategyResults from './HashtagStrategyResults';
import { HashtagIcon } from './icons/HashtagIcon';

const HashtagGeneratorPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [inputs, setInputs] = useState<HashtagStrategyInput>({
        topic: '',
        platform: 'LinkedIn',
        audienceGoal: 'Job Seekers',
        contentType: 'Post'
    });
    const [result, setResult] = useState<HashtagStrategyResult | null>(null);
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
            const apiResult = await generateHashtagStrategy(inputs);
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">AI Hashtag & Growth Assistant</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Generate hashtags that maximize reach, engagement, and discoverability across social media platforms.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="topic" className={labelClasses}>Topic / Niche</label>
                                <input type="text" id="topic" name="topic" value={inputs.topic} onChange={handleInputChange} className={inputClasses} placeholder="e.g., AI in Marketing" required />
                            </div>
                            <div>
                                <label htmlFor="platform" className={labelClasses}>Target Platform</label>
                                <select id="platform" name="platform" value={inputs.platform} onChange={handleInputChange} className={inputClasses} required>
                                    <option>LinkedIn</option>
                                    <option>Instagram</option>
                                    <option>Twitter/X</option>
                                    <option>TikTok</option>
                                    <option>YouTube</option>
                                    <option>All</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="audienceGoal" className={labelClasses}>Audience Goal</label>
                                <select id="audienceGoal" name="audienceGoal" value={inputs.audienceGoal} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Job Seekers</option>
                                    <option>Recruiters</option>
                                    <option>Entrepreneurs</option>
                                    <option>Creators</option>
                                    <option>Buyers</option>
                                    <option>General Public</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="contentType" className={labelClasses}>Content Type</label>
                                <select id="contentType" name="contentType" value={inputs.contentType} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Post</option>
                                    <option>Video</option>
                                    <option>Carousel</option>
                                    <option>Story</option>
                                    <option>Article</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isLoading ? (
                                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating Hashtags...</>
                                    ) : 'Generate Hashtags'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md min-h-[500px]">
                        <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                            <HashtagIcon className="h-6 w-6 mr-3 text-blue-600" />
                            Hashtag Strategy Report
                        </h2>
                        {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center"><svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="ml-3 text-black">AI is researching...</span></div></div>}
                        {error && <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg">{error}</div>}
                        {!isLoading && !error && !result && <div className="text-center p-8 text-black">Your hashtag strategy will appear here.</div>}
                        {result && <HashtagStrategyResults result={result} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HashtagGeneratorPage;
