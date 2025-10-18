
import React from 'react';
import type { JobMatchAnalysisResult, ActionableSuggestion, OptimizedContent } from '../types';
import ScoreChart from './ScoreChart';
import { CopyIcon } from './icons/CopyIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { TargetIcon } from './icons/TargetIcon';
import { KeyIcon } from './icons/KeyIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { StarIcon } from './icons/StarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';


const StarRating: React.FC<{ score: number; label: string }> = ({ score, label }) => (
    <div className="flex items-center">
      <span className="text-xs font-semibold text-black mr-2 capitalize">{label}:</span>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`h-4 w-4 ${i < score ? 'text-yellow-400' : 'text-slate-300'}`} />
        ))}
      </div>
    </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300 text-slate-700 p-1.5 rounded-md transition-colors">
            {copied ? <CheckCircleIcon className="h-4 w-4 text-green-600" /> : <CopyIcon className="h-4 w-4" />}
        </button>
    );
};

const OptimizedContentSection: React.FC<{ content: OptimizedContent }> = ({ content }) => (
    <div>
        <h3 className="text-xl font-bold text-black mb-4 flex items-center"><SparklesIcon className="h-6 w-6 mr-2 text-blue-600" /> Optimized Content</h3>
        <div className="space-y-4">
            <details className="bg-slate-50 border border-slate-200 rounded-lg p-3 group" open>
                <summary className="font-semibold text-black list-none flex justify-between items-center text-md cursor-pointer">Headlines</summary>
                <div className="mt-2 space-y-2">
                    {content.headlines.map((item, i) => <div key={i} className="relative bg-white p-2 border rounded"><p className="text-sm text-black pr-8">{item}</p><CopyButton text={item} /></div>)}
                </div>
            </details>
             <details className="bg-slate-50 border border-slate-200 rounded-lg p-3 group">
                <summary className="font-semibold text-black list-none flex justify-between items-center text-md cursor-pointer">Summaries</summary>
                 <div className="mt-2 space-y-2">
                    {content.summaries.map((item, i) => <div key={i} className="relative bg-white p-2 border rounded"><p className="text-sm text-black whitespace-pre-wrap pr-8">{item}</p><CopyButton text={item} /></div>)}
                </div>
            </details>
             <details className="bg-slate-50 border border-slate-200 rounded-lg p-3 group">
                <summary className="font-semibold text-black list-none flex justify-between items-center text-md cursor-pointer">Experience Bullets</summary>
                 <div className="mt-2 space-y-2">
                    {content.experienceBullets.map((item, i) => <div key={i} className="relative bg-white p-2 border rounded"><p className="text-sm text-black pr-8">{item}</p><CopyButton text={item} /></div>)}
                </div>
            </details>
        </div>
    </div>
);


const JobMatchAnalysisResults: React.FC<{ result: JobMatchAnalysisResult }> = ({ result }) => {
    const sectionWeights: Record<string, number> = {
        headline: 10,
        summary: 20,
        experience: 30,
        skills: 30,
        formatting: 10,
    };
    return (
        <div className="space-y-10 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black">Job Match Report</h3>
                <button onClick={() => window.print()} className="bg-slate-200 text-black font-semibold py-2 px-4 rounded-lg text-sm hover:bg-slate-300 transition-colors no-print">Download Report</button>
            </div>
            
            {/* Score Section */}
            <div>
                <h3 className="text-xl font-bold text-black mb-3 flex items-center"><TargetIcon className="h-6 w-6 mr-2 text-blue-600" /> Overall Match Score</h3>
                <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 p-4 rounded-lg">
                    <div className="flex-shrink-0">
                        <ScoreChart score={result.overallScore} />
                    </div>
                    <div className="space-y-2 w-full">
                        {Object.entries(result.sections).map(([key, value]: [string, { score: number; explanation: string }]) => (
                            <div key={key} className="p-2 bg-white rounded-lg border">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold capitalize text-black text-sm">{key}</p>
                                    <p className="font-bold text-base text-black">{value.score}<span className="text-xs font-normal text-black">/{sectionWeights[key] || 0}</span></p>
                                </div>
                                <p className="text-xs text-black mt-1">{value.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Missing Keywords */}
            <div>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center"><KeyIcon className="h-6 w-6 mr-2 text-blue-600" /> Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map(kw => (
                        <span key={kw.keyword} className={`text-xs font-semibold px-2 py-1 rounded-full ${kw.importance === 'MUST' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {kw.keyword}
                        </span>
                    ))}
                </div>
            </div>

             {/* Actionable Suggestions */}
            <div>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center"><LightbulbIcon className="h-6 w-6 mr-2 text-blue-600" /> Actionable Suggestions</h3>
                <ul className="space-y-2">
                    {result.suggestions.map((tip, i) => (
                        <li key={i} className="bg-white p-3 rounded-lg border">
                            <p className="text-sm"><strong className="capitalize font-semibold">{tip.section}:</strong> <span className="text-black">{tip.text}</span></p>
                            <div className="flex space-x-4 mt-2 border-t pt-2">
                                <StarRating score={tip.impact} label="Impact" />
                                <StarRating score={tip.ease} label="Ease" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Optimized Content */}
            <OptimizedContentSection content={result.optimizedContent} />

            {/* ATS Readiness */}
            <div>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center"><ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-600" /> ATS Readiness</h3>
                <ul className="space-y-2">
                    {result.atsReadiness.map((check, i) => (
                        <li key={i} className="flex items-start text-sm p-3 rounded-md bg-slate-50 border">
                            {check.status === 'Pass' && <CheckCircleIcon className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />}
                            {check.status === 'Warn' && <ExclamationTriangleIcon className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />}
                            {check.status === 'Fail' && <ShieldExclamationIcon className="h-5 w-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />}
                            <div>
                                <span className="font-semibold text-black">{check.check}</span>
                                <p className="text-black">{check.recommendation}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JobMatchAnalysisResults;
