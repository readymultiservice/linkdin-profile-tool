
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import ScoreTab from './ScoreTab';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

type ActiveTab = 'suggestions' | 'score';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('suggestions');

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
          <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-black">AI is analyzing your profile...</p>
          <p className="text-black">This might take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-red-50 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-red-800">An Error Occurred</h3>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      );
    }

    if (!result) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-slate-100 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-xl font-bold text-black">Analysis Results</h3>
          <p className="text-black mt-1">Your enhanced profile suggestions and score will appear here once you submit your information.</p>
        </div>
      );
    }

    return (
      <>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`${
                activeTab === 'suggestions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-black hover:text-black hover:border-slate-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
            >
              <SparklesIcon className="mr-2 h-5 w-5"/>
              AI Suggestions
            </button>
            <button
              onClick={() => setActiveTab('score')}
              className={`${
                activeTab === 'score'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-black hover:text-black hover:border-slate-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
            >
                <ChartBarIcon className="mr-2 h-5 w-5" />
              Profile Score
            </button>
          </nav>
        </div>
        <div className="py-6">
          {activeTab === 'suggestions' && <SuggestionsTab suggestions={result.suggestions} />}
          {activeTab === 'score' && <ScoreTab score={result.score} />}
        </div>
      </>
    );
  };
  
  return <div className="bg-white p-6 rounded-lg shadow-md min-h-[500px]">{renderContent()}</div>;
};

const SuggestionsTab: React.FC<{ suggestions: AnalysisResult['suggestions'] }> = ({ suggestions }) => (
  <div className="space-y-6 animate-fade-in">
    <h3 className="text-2xl font-bold text-black">AI-Powered Suggestions</h3>
    <p className="text-black">Here are the AI's suggestions to make your profile stand out.</p>

    <div className="space-y-4">
      <SuggestionCard title="Enhanced Headline" content={suggestions.headline} />
      <SuggestionCard title="Enhanced Summary" content={suggestions.summary} />
      
      <div>
        <h4 className="text-lg font-semibold text-black mb-2">Enhanced Experience</h4>
        <div className="space-y-4">
          {suggestions.experiences.map((exp, index) => (
            <SuggestionCard 
              key={index} 
              title={`For: ${exp.originalJobTitle}`} 
              content={exp.improvedDescription} 
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SuggestionCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
    <h4 className="font-semibold text-black text-md">{title}</h4>
    <p className="text-black mt-1 whitespace-pre-wrap">{content}</p>
  </div>
);


export default ResultsDisplay;