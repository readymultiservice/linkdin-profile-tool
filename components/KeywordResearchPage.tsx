
import React, { useState } from 'react';
import type { KeywordResearchInput, KeywordResearchResult } from '../types';
import { generateKeywordStrategy } from '../services/geminiService';
import KeywordResearchResults from './KeywordResearchResults';
import { KeyIcon } from './icons/KeyIcon';

const KeywordResearchPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [inputs, setInputs] = useState<KeywordResearchInput>({
        primaryKeyword: '',
        audience: 'Job Seekers',
        goal: 'Improve SEO rankings'
    });
    const [result, setResult] = useState<KeywordResearchResult | null>(null);
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
            const apiResult = await generateKeywordStrategy(inputs);
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
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">AI Keyword & SEO Strategist</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Generate keyword ideas, content outlines, and SEO insights for your industry, role, or topic.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="primaryKeyword" className={labelClasses}>Primary Keyword / Topic</label>
                                <input type="text" id="primaryKeyword" name="primaryKeyword" value={inputs.primaryKeyword} onChange={handleInputChange} className={inputClasses} placeholder="e.g., Data Analyst Resume" required />
                            </div>
                            <div>
                                <label htmlFor="audience" className={labelClasses}>Target Audience</label>
                                <select id="audience" name="audience" value={inputs.audience} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Job Seekers</option>
                                    <option>Recruiters</option>
                                    <option>HR Managers</option>
                                    <option>Small Businesses</option>
                                    <option>Marketers</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="goal" className={labelClasses}>Goal</label>
                                <select id="goal" name="goal" value={inputs.goal} onChange={handleInputChange} className={inputClasses} required>
                                    <option>Improve SEO rankings</option>
                                    <option>Increase LinkedIn visibility</option>
                                    <option>Attract recruiters</option>
                                    <option>Rank on Google</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isLoading ? (
                                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating Strategy...</>
                                    ) : 'Get Keyword Strategy'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md min-h-[500px]">
                        <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                            <KeyIcon className="h-6 w-6 mr-3 text-blue-600" />
                            Keyword & SEO Report
                        </h2>
                        {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center"><svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="ml-3 text-black">AI is researching...</span></div></div>}
                        {error && <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg">{error}</div>}
                        {!isLoading && !error && !result && <div className="text-center p-8 text-black">Your keyword strategy will appear here.</div>}
                        {result && <KeywordResearchResults result={result} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordResearchPage;
