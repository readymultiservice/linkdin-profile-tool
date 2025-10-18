import React, { useState } from 'react';
import type { JobMatchAnalysisResult, FileData } from '../types';
import { getJobMatchAnalysis } from '../services/geminiService';
import Tooltip from './Tooltip';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { ClipboardDocumentListIcon } from './icons/ClipboardDocumentListIcon';
import { TargetIcon } from './icons/TargetIcon';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import JobMatchAnalysisResults from './JobMatchAnalysisResults';


const JobMatchAnalyzerPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [inputType, setInputType] = useState<'text' | 'file'>('text');
    const [profileText, setProfileText] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [targetRole, setTargetRole] = useState('');

    const [result, setResult] = useState<JobMatchAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        } else {
            setResumeFile(null);
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
        if (!jobDescription || (!profileText && !resumeFile) || !targetRole) {
            setError("Please fill in all required fields to get an analysis.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            let resumeOrProfile: { text?: string; file?: FileData } = {};
            if (inputType === 'file' && resumeFile) {
                const base64 = await fileToBase64(resumeFile);
                resumeOrProfile.file = { base64, mimeType: resumeFile.type };
            } else {
                resumeOrProfile.text = profileText;
            }

            const apiResult = await getJobMatchAnalysis(resumeOrProfile, jobDescription, targetRole);
            setResult(apiResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";
    const tabClasses = (isActive: boolean) => 
        `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-black hover:bg-slate-300'
        }`;

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors no-print">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center no-print">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Keyword & Job Match Analyzer</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Optimize your resume or LinkedIn profile by comparing it against a job description to improve your match rate.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-6 rounded-lg shadow-md no-print">
                        <form onSubmit={handleSubmit} className="space-y-6">
                             <div>
                                <label className={labelClasses}>
                                    <div className="flex items-center gap-1.5">
                                        <TargetIcon className="h-5 w-5 inline-block text-slate-500" />
                                        Target Job Role
                                        <Tooltip text="The specific job title you are applying for. This helps the AI tailor its analysis.">
                                            <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
                                        </Tooltip>
                                    </div>
                                </label>
                                <input type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)} className={inputClasses} placeholder="e.g., Senior Data Analyst" required />
                            </div>
                            <div>
                                <label className={labelClasses}>
                                    <div className="flex items-center gap-1.5">
                                        <BriefcaseIcon className="h-5 w-5 inline-block text-slate-500" />
                                        Target Job Description
                                        <Tooltip text="Paste the full job description here for the most accurate keyword and skills comparison.">
                                            <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
                                        </Tooltip>
                                    </div>
                                </label>
                                <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} rows={8} className={inputClasses} placeholder="Paste the full job description here..." required />
                            </div>

                            <div>
                                <label className={labelClasses}>Your Resume / Profile</label>
                                <div className="flex space-x-2 mb-3">
                                    <button type="button" onClick={() => setInputType('text')} className={tabClasses(inputType === 'text')}>Paste Text</button>
                                    <button type="button" onClick={() => setInputType('file')} className={tabClasses(inputType === 'file')}>Upload File</button>
                                </div>
                                {inputType === 'text' ? (
                                    <div>
                                        <label htmlFor="profileText" className="sr-only">Your Resume / LinkedIn Profile Text</label>
                                        <textarea id="profileText" value={profileText} onChange={e => setProfileText(e.target.value)} rows={8} className={inputClasses} placeholder="Paste your full resume or LinkedIn profile text here..." />
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="resumeFile" className="sr-only">Upload Resume (PDF/DOCX)</label>
                                        <input type="file" id="resumeFile" onChange={handleFileChange} accept=".pdf,.doc,.docx" className={`${inputClasses} p-2`} />
                                        {resumeFile && <p className="text-xs text-black mt-2">Selected: {resumeFile.name}</p>}
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isLoading ? (
                                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyzing Match...</>
                                    ) : 'Analyze Job Match'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="print-area" className="bg-white p-6 rounded-lg shadow-md min-h-[500px]">
                        <h2 className="text-2xl font-bold text-black mb-6">Analysis Report</h2>
                        {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center"><svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span className="ml-3 text-black">AI is analyzing...</span></div></div>}
                        {error && <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg">{error}</div>}
                        {!isLoading && !error && !result && <div className="text-center p-8 text-black">Your job match analysis will appear here.</div>}
                        {result && <JobMatchAnalysisResults result={result} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobMatchAnalyzerPage;