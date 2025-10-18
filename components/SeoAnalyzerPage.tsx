
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SeoAnalyzerPageProps {
  onBack: () => void;
}

interface SeoResults {
    score: number;
    ranking: string;
    suggestions: string;
}

const SeoAnalyzerPage: React.FC<SeoAnalyzerPageProps> = ({ onBack }) => {
    const [url, setUrl] = useState('');
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState<SeoResults | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResults(null);

        // Demo: Fake SEO results after a delay
        setTimeout(() => {
            if (!url.startsWith('http')) {
                setError('Please enter a valid URL (e.g., https://example.com)');
                setIsLoading(false);
                return;
            }

            setResults({
                score: Math.floor(Math.random() * (95 - 65 + 1)) + 65, // Random score between 65 and 95
                ranking: `Keyword "${keywords.split(',')[0].trim() || 'your keyword'}" → Rank: #${Math.floor(Math.random() * (20 - 5 + 1)) + 5} on Google`,
                suggestions: "Suggestions: Add heading tags (H1, H2), compress images, include target keyword in the title, and improve mobile performance.",
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">SEO & Google Ranking Analyzer</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Enter your website or LinkedIn profile to get an instant SEO score and ranking insights.</p>
                </header>

                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="site-url" className="block text-black font-semibold mb-2">Enter Website / LinkedIn URL</label>
                            <input type="url" id="site-url" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)}
                                required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        </div>

                        <div>
                            <label htmlFor="keywords" className="block text-black font-semibold mb-2">Target Keywords (comma separated)</label>
                            <input type="text" id="keywords" placeholder="resume optimization, LinkedIn profile" value={keywords} onChange={e => setKeywords(e.target.value)}
                                required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        </div>

                        <button type="submit" disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Analyzing...
                                </>
                            ) : 'Analyze SEO & Check Ranking'}
                        </button>
                    </form>
                </div>
                
                {error && <div className="max-w-3xl mx-auto mt-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert"><span className="block sm:inline">{error}</span></div>}

                {results && (
                    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4 flex items-center"><SearchIcon className="h-6 w-6 mr-2 text-blue-600"/> Analysis Results</h2>
                        <div className="space-y-3">
                            <p className="text-lg font-semibold text-blue-600">SEO Score: {results.score}/100</p>
                            <p className="text-md text-black">{results.ranking}</p>
                            <div>
                                <h3 className="font-semibold text-black">Suggestions:</h3>
                                <p className="text-black">{results.suggestions}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeoAnalyzerPage;
