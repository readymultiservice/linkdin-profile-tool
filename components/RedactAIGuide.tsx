import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface RedactAIGuideProps {
  onBack: () => void;
}

const RedactAIGuide: React.FC<RedactAIGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">RedactAI — AI LinkedIn Profile Review Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Get free, actionable suggestions and content ideas for your profile, headlines, and posts.</p>
        </header>
        
        <GuideSection title="1. Inputs to Prepare">
            <ol className="list-decimal list-inside space-y-2">
                <li>Your public LinkedIn profile URL (recommended).</li>
                <li><strong>Optional:</strong> 2–3 past LinkedIn posts (if you want RedactAI to learn your voice for post generation).</li>
                <li>Target role(s) or tone (e.g., “senior product manager — data-driven, friendly”).</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Step-by-Step Execution">
            <ol className="list-decimal list-inside space-y-2">
                <li>Open RedactAI → Free Tools → AI LinkedIn Profile Review.</li>
                <li>Paste your LinkedIn profile URL (or paste your About text).</li>
                <li>Choose what you want (Profile Review, Summary Generator, Post Generator) and submit.</li>
                <li>RedactAI returns section-by-section suggestions and example rewrites.</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. Exact Copy-Paste Prompt">
            <p>For RedactAI's input box or to send a VA:</p>
            <PromptBlock>
                “Please audit this LinkedIn profile to increase recruiter messages and profile search appearances for [job title]. Provide: (A) Score (0–100) or qualitative grade, (B) Headline – 3 variants, (C) About – short + long templates tailored to [industry], (D) Top 8 skills to add, (E) 3 sample post ideas to demonstrate expertise.”
            </PromptBlock>
        </GuideSection>

        <GuideSection title="4. Follow-up ChatGPT Prompts">
          <p>Use the same ChatGPT prompts as the Jobscan guide for Headline/About/Experience bullets. For post generation from RedactAI's output, use this:</p>
          <PromptBlock>
            “Take this draft post and expand into 3 LinkedIn post hooks + 1 carousel idea suitable for senior-level product managers.”
          </PromptBlock>
        </GuideSection>
        
        <GuideSection title="5. How to Act on RedactAI's Output">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Profile review:</strong> RedactAI gives rewrite examples — copy the best variant into your LinkedIn About and headline fields.</li>
                <li><strong>Post generator:</strong> Use generated posts as first drafts — edit to add personal specifics and metrics.</li>
                <li><strong>Voice Matching:</strong> For better results, provide 3-5 of your prior posts so it can learn your style.</li>
            </ul>
        </GuideSection>

        <GuideSection title="6. Quick Actionable Checklist">
            <ol className="list-decimal list-inside space-y-2">
                <li>Pick 1 tool to start with (Jobscan for job-matching; RedactAI for fast rewrites + post ideas).</li>
                <li>Prepare your public profile URL + 3 job descriptions (for Jobscan) or 2–3 posts (for RedactAI).</li>
                <li>Run the tool → copy top 3 headline/About suggestions.</li>
                <li>Paste the chosen variants into ChatGPT and ask for 3 final polished options.</li>
                <li>Update LinkedIn, then re-run the tool and save before/after screenshots.</li>
            </ol>
        </GuideSection>

        <div className="text-center mt-12">
            <button onClick={onBack} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105">
              Back to All Guides
            </button>
        </div>
      </div>
    </div>
  );
};

export default RedactAIGuide;