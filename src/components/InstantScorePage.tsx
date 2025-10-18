import React, { useState } from 'react';
import type { InstantScoreData, InstantScoreResult, InstantScoreDetail, ImprovementTip } from '../types';
import { getInstantProfileScore, getInstantResumeScore, compareProfileAndResume } from '../services/geminiService';
import ScoreChart from './ScoreChart';
import Tooltip from './Tooltip';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { ClipboardDocumentIcon } from './ClipboardDocumentIcon';
import { TargetIcon } from './icons/TargetIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { StarIcon } from './icons/StarIcon';

const InstantScorePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [profileText, setProfileText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [commonData, setCommonData] = useState({
    targetJobTitle: '',
    industry: '',
    hasPhoto: true,
    hasFeaturedContent: false,
    connectionsCount: '500+',
  });
  
  const [result, setResult] = useState<InstantScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommonInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setCommonData(prev => ({ ...prev, [name]: checked }));
    } else {
        setCommonData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); 
        };
        reader.onerror = error => reject(error);
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileText && !file) {
        setError("Please provide either LinkedIn profile text or a resume PDF to analyze.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
        let apiResult: InstantScoreResult;

        if (profileText && file) {
            const base64 = await fileToBase64(file);
            const compareData = {
                profileText,
                targetJobTitle: commonData.targetJobTitle,
                industry: commonData.industry
            };
            apiResult = await compareProfileAndResume({ base64, mimeType: file.type }, compareData);
        } else if (file) {
            const base64 = await fileToBase64(file);
            const resumeData = {
                targetJobTitle: commonData.targetJobTitle,
                industry: commonData.industry
            };
            apiResult = await getInstantResumeScore({ base64, mimeType: file.type }, resumeData);
        } else {
            const profileData: InstantScoreData = { profileText, ...commonData };
            apiResult = await getInstantProfileScore(profileData);
        }
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
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors no-print">
          &larr; Back to Home
        </button>

        <header className="mb-10 text-center no-print">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Instant Profile & Resume Score</h1>
            <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Analyze your LinkedIn presence, your resume, or compare both. Get an instant AI-powered score and improvement plan.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-lg shadow-md no-print">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="profileText" className={labelClasses}>
                            <div className="flex items-center gap-1.5">
                                <ClipboardDocumentIcon className="h-5 w-5 inline-block text-slate-500" />
                                Paste LinkedIn Profile Text (Optional)
                                <Tooltip text="For best results, paste your Headline, About, all Experience descriptions, and your full Skills list.">
                                    <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
                                </Tooltip>
                            </div>
                        </label>
                        <textarea id="profileText" name="profileText" value={profileText} onChange={(e) => setProfileText(e.target.value)} rows={8} className={inputClasses} placeholder="Paste your Headline, About, Experience, and Skills here..." />
                    </div>
                    <div>
                         <label htmlFor="resumeFile" className={labelClasses}>
                            <div className="flex items-center gap-1.5">
                                <DocumentArrowUpIcon className="h-5 w-5 inline-block text-slate-500" />
                                Upload Resume PDF (Optional)
                                <Tooltip text="Upload your resume in PDF format. The AI will analyze its content and structure against best practices.">
                                    <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
                                </Tooltip>
                            </div>
                        </label>
                        <input type="file" id="resumeFile" name="resumeFile" onChange={handleFileChange} accept=".pdf" className={`${inputClasses} p-2`} />
                        {file && <p className="text-xs text-black mt-2">Selected: {file.name}</p>}
                    </div>
                     <div>
                        <label htmlFor="targetJobTitle" className={labelClasses}>
                            <div className="flex items-center gap-1.5">
                                <TargetIcon className="h-5 w-5 inline-block text-slate-500" />
                                Target Job Title
                                <Tooltip text="Providing a target job title helps the AI tailor its recommendations and keyword suggestions to your specific career goals.">
                                    <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
                                </Tooltip>
                            </div>
                        </label>
                        <input type="text" id="targetJobTitle" name="targetJobTitle" value={commonData.targetJobTitle} onChange={handleCommonInputChange} className={inputClasses} placeholder="e.g., Senior Product Manager" required />
                    </div>
                     <div>
                        <label htmlFor="industry" className={labelClasses}>
                             <BuildingOfficeIcon className="h-5 w-5 inline-block mr-2 text-slate-500" />
                            Industry
                        </label>
                        <input type="text" id="industry" name="industry" value={commonData.industry} onChange={handleCommonInputChange} className={inputClasses} placeholder="e.g., B2B SaaS" required />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">LinkedIn Engagement Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input type="checkbox" id="hasPhoto" name="hasPhoto" checked={commonData.hasPhoto} onChange={handleCommonInputChange} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                                <label htmlFor="hasPhoto" className="ml-2 block text-sm text-black">I have a professional profile photo.</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="hasFeaturedContent" name="hasFeaturedContent" checked={commonData.hasFeaturedContent} onChange={handleCommonInputChange} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                                <label htmlFor="hasFeaturedContent" className="ml-2 block text-sm text-black">I have a "Featured" section on my profile.</label>
                            </div>
                            <div>
                                <label htmlFor="connectionsCount" className="block text-sm text-black mb-1">My number of connections is...</label>
                                <select id="connectionsCount" name="connectionsCount" value={commonData.connectionsCount} onChange={handleCommonInputChange} className={inputClasses}>
                                    <option>500+</option>
                                    <option>300-500</option>
                                    <option>50-300</option>
                                    <option>0-50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                        {isLoading ? (
                            <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Calculating Score...</>
                        ) : 'Get My Instant Score'}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Results Section */}
            <div id="print-area" className="bg-white p-6 rounded-lg shadow-md min-h-[500px]">
                <h2 className="text-2xl font-bold text-black mb-6">Your Results</h2>
                {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center"><svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="ml-3 text-black">Analyzing document...</span></div></div>}
                {error && <div className="text-center p-8 text-red-600">{error}</div>}
                {!isLoading && !error && !result && <div className="text-center p-8 text-black">Your score and analysis will appear here.</div>}
                {result && <InstantScoreResults result={result} />}
            </div>
        </div>
      </div>
    </div>
  );
};

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

const InstantScoreResults: React.FC<{ result: InstantScoreResult }> = ({ result }) => {
    const getScoreColor = (value: number, max: number) => {
        const percentage = (value / max) * 100;
        if (percentage >= 85) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black">Profile Strength Report</h3>
                <button onClick={() => window.print()} className="bg-slate-200 text-black font-semibold py-2 px-4 rounded-lg text-sm hover:bg-slate-300 transition-colors no-print">Download Report</button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                    <ScoreChart score={result.overallScore} />
                </div>
                <div className="space-y-2 w-full">
                    {Object.entries(result.breakdown).map(([key, value]: [string, InstantScoreDetail]) => (
                        <div key={key} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold capitalize text-black">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className={`font-bold text-lg ${getScoreColor(value.score, 20)}`}>{value.score}<span className="text-sm font-normal text-black">/20</span></p>
                            </div>
                            <p className="text-xs text-black mt-1">{value.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div>
                <h3 className="text-xl font-bold text-black mb-3">Current Status</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 flex items-center">
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            Strengths
                        </h4>
                        <ul className="list-disc list-inside mt-2 text-sm text-green-700 space-y-1">
                            {result.currentStatus.strengths.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                     </div>
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 flex items-center">
                            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                            Weaknesses
                        </h4>
                        <ul className="list-disc list-inside mt-2 text-sm text-yellow-700 space-y-1">
                             {result.currentStatus.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                     </div>
                 </div>
            </div>
            
            {result.comparison && (
                 <div>
                    <h3 className="text-xl font-bold text-black mb-3">
                        <DocumentDuplicateIcon className="h-6 w-6 inline-block mr-2 text-blue-600" />
                        Comparison Analysis
                    </h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
                        <p className="text-black text-sm">{result.comparison.summary}</p>
                        {result.comparison.missingInLinkedIn?.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-black">Add to LinkedIn (from your Resume):</h4>
                                <ul className="list-disc list-inside mt-1 text-sm text-black">
                                    {result.comparison.missingInLinkedIn.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                         {result.comparison.missingInResume?.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-black">Add to Resume (from your LinkedIn):</h4>
                                <ul className="list-disc list-inside mt-1 text-sm text-black">
                                    {result.comparison.missingInResume.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xl font-bold text-black mb-3">Top 10 Keyword Recommendations</h3>
                <div className="flex flex-wrap gap-2">
                    {result.keywordRecommendations.map(kw => (
                        <span key={kw} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{kw}</span>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-black mb-3">
                    <SparklesIcon className="h-6 w-6 inline-block mr-2 text-blue-600" />
                    AI-Generated Content
                </h3>
                 <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-black text-md">Optimized Headline / Title Variations</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        {result.optimizedHeadlines.map((headline, i) => (
                           <li key={i} className="text-sm text-black">{headline}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-black text-md">Optimized Summary / Objective</h4>
                    <p className="text-sm text-black whitespace-pre-wrap mt-2">{result.optimizedSummary}</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-black mb-3">Actionable Improvement Plan</h3>
                {Object.entries(result.improvementTips).map(([sectionKey, tips]: [string, ImprovementTip[]]) => (
                    tips.length > 0 && (
                        <div key={sectionKey}>
                            <h4 className="font-semibold capitalize text-black text-md mt-4 mb-2">{sectionKey} Tips</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {tips.map((tip, i) => (
                                    <li key={i} className="bg-white p-3 rounded-lg border">
                                        <p className="text-sm text-black">{tip.suggestion}</p>
                                        <div className="flex space-x-4 mt-2 border-t pt-2">
                                            <StarRating score={tip.impact} label="Impact" />
                                            <StarRating score={tip.ease} label="Ease" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default InstantScorePage;