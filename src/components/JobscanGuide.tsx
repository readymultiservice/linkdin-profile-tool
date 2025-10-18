import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface JobscanGuideProps {
  onBack: () => void;
}

const JobscanGuide: React.FC<JobscanGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Jobscan — LinkedIn Optimization Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Score your profile against job descriptions to improve keyword match and discoverability.</p>
        </header>
        
        <GuideSection title="1. Inputs to Prepare">
            <ol className="list-decimal list-inside space-y-2">
                <li>Your public LinkedIn profile URL (or an exported PDF).</li>
                <li>3 target job descriptions (copy-paste from LinkedIn/Indeed/company posting) for roles you want to be found for.</li>
                <li>A short list of top 6 keywords/skills you want prioritized (optional but helpful).</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Step-by-Step Execution">
            <ol className="list-decimal list-inside space-y-2">
                <li>Open Jobscan → LinkedIn → LinkedIn Optimizer.</li>
                <li>Paste your LinkedIn profile URL (or upload the profile PDF).</li>
                <li>Add at least three job descriptions (Jobscan asks for these to tailor suggestions).</li>
                <li>Click <strong>Get Profile Score / Optimize</strong>. Jobscan will produce an overall score and section-level suggestions.</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. Exact Copy-Paste Prompt">
            <p>Use this in any “notes/context” box or send to your VA:</p>
            <PromptBlock>
              “Analyze this LinkedIn profile to maximize recruiter search appearances and match these job descriptions. Target roles: [Primary job title], [Secondary job title]. Prioritize keywords: [keyword1, keyword2…]. Return: (A) Overall score & what each 10 points means, (B) 3 headline alternatives (≤120 chars), (C) 3 About/summary rewrites (short, medium, long), (D) 6 rewritten experience bullets (achievement + metric) for top role, and (E) Skill list ordered by priority.”
            </PromptBlock>
        </GuideSection>

        <GuideSection title="4. Follow-up ChatGPT Prompts">
          <p>Use these after you get Jobscan suggestions.</p>
          <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Headline Rewrite:</h3>
          <PromptBlock>
            “Rewrite my headline to target [job title] and include keywords [k1,k2,k3]. Current headline: ‘[paste current]’.”
          </PromptBlock>

          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">About/Summary Rewrite:</h3>
          <PromptBlock>
            “Turn this draft into a 200–280 word LinkedIn About optimized for [job title]. Add one-sentence hook, 2 impact paragraphs with metrics, 1 CTA.”
          </PromptBlock>

          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Experience Bullets Rewrite:</h3>
          <PromptBlock>
            “Rewrite these bullets into achievement-focused bullets (add metrics if possible): [paste bullets]. Provide 2 variants per bullet (concise + detailed).”
          </PromptBlock>
        </GuideSection>
        
        <GuideSection title="5. How to Read the Jobscan Report">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Overall score:</strong> Baseline for recruiter discoverability — use it to measure improvement after edits.</li>
                <li><strong>Keyword gaps:</strong> Add missing keywords into Headline, About, Experience, and Skills (not just the Skills section).</li>
                <li><strong>Field completeness:</strong> Fill out Featured, Projects, Certifications — Jobscan flags missing important fields.</li>
            </ul>
        </GuideSection>

        <GuideSection title="6. Example Deliverables (for a VA)">
             <p>A 30-60 minute job could produce:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>3 headline options.</li>
                <li>3 About variations (short/medium/long).</li>
                <li>6 revised experience bullets (for two roles).</li>
                <li>Updated skills list (top 10 ordered).</li>
                <li>Screenshot of Jobscan before/after scores.</li>
            </ul>
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

export default JobscanGuide;