import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface ResumeWordedGuideProps {
  onBack: () => void;
}

const ResumeWordedGuide: React.FC<ResumeWordedGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Resume Worded &mdash; LinkedIn Review Guide</h1>
            <p className="mt-4 text-lg text-slate-600">A complete workflow on how to use AI for a powerful LinkedIn profile analysis.</p>
        </header>
        
        <GuideSection title="1. Before You Start — Prepare Your Inputs">
            <ol className="list-decimal list-inside space-y-2">
                <li>Open your LinkedIn profile and copy the public profile URL (e.g. https://www.linkedin.com/in/yourname).</li>
                <li><strong>OR</strong> export your profile as PDF: Profile → “More” → “Save to PDF” (this helps if some fields are private). Resume Worded accepts both.</li>
                <li>Have a short list of target job titles (1–3) you want to rank for — the tool’s recommendations are more useful when you know the roles you’re aiming at.</li>
                <li><strong>Optional:</strong> gather 2–3 job descriptions for those target roles (for keyword matching later).</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. How to Run the Resume Worded LinkedIn Review">
            <ol className="list-decimal list-inside space-y-2">
                <li>Go to the Resume Worded → LinkedIn Review page.</li>
                <li>Paste your public LinkedIn URL or upload the LinkedIn PDF you exported.</li>
                <li>Create a free account / sign in (Resume Worded will ask to create an account for saving results).</li>
                <li>Click <strong>Get Review</strong> (the AI will scan and return a 0–100 score plus detailed, section-level suggestions).</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. How to Read and Act on the Report">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Overall Score (0–100):</strong> A baseline. Higher = better discoverability and recruiter appeal.</li>
                <li><strong>Headline:</strong> Shows whether your headline is keyword-rich and benefit-driven. Follow their sample headlines.</li>
                <li><strong>About / Summary:</strong> Checks clarity, value proposition, keywords, tone and length. Use provided sample summaries as templates.</li>
                <li><strong>Experience:</strong> Looks for quantified achievements and active verbs. Add metrics (%, $ saved, users, growth).</li>
                <li><strong>Skills & Keywords:</strong> Compares your skills to those used in jobs you want; add missing keywords to your skills and experience.</li>
                <li><strong>Other suggestions:</strong> Profile photo, background image, contact info, featured content, URL optimization.</li>
            </ul>
        </GuideSection>

        <GuideSection title="4. Exact Prompt for Context">
          <p>Resume Worded usually reads the profile directly, but if you can submit context or notes, use this:</p>
          <PromptBlock>
            “Please analyze my public LinkedIn profile with the goal of getting interviews for: [Primary job title], and [Secondary job title — optional]. I want clear, actionable changes for: Headline, About, Experience bullets, Skills, and Keywords. Prefer ATS-friendly language and measurable achievements. Use examples and short editable templates I can copy into LinkedIn.”
          </PromptBlock>
        </GuideSection>

        <GuideSection title="5. Concrete Follow-up Prompts">
          <p>Use these with Resume Worded's output or with ChatGPT to implement changes.</p>
          <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">A — Headline Rewrite Prompt</h3>
          <PromptBlock>
            “Rewrite my LinkedIn headline to target [job title] and include top keywords [keyword1, keyword2, keyword3]. Keep it ≤ 120 characters and emphasize the main benefit I deliver. Current headline: ‘[paste current headline]’.”
          </PromptBlock>

          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">B — About / Summary Rewrite Prompt</h3>
          <PromptBlock>
            “Convert my current About section into a 3-paragraph LinkedIn summary (max 300 words) optimized for [job title]. Include 1 short opening sentence (what I do), 1 paragraph of impact + top skills with metrics, and 1 call-to-action. Here’s my current About: ‘[paste current About]’.”
          </PromptBlock>

          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">C — Experience Bullet Improvement</h3>
          <PromptBlock>
            {`“Rewrite these experience bullets to be achievement-oriented and keyword-rich for [job title]. Add metrics where possible. Current bullets:\n\n[bullet 1]\n[bullet 2]\n[bullet 3]”`}
          </PromptBlock>
        </GuideSection>

        <GuideSection title="6. Example Outputs (Copy-able)">
          <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Example Headline (template)</h3>
          <PromptBlock>“Product Manager • Growth-focused PM • 3x user growth • SaaS & FinTech”</PromptBlock>
          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Example About Paragraph (short)</h3>
          <PromptBlock>“Product Manager with 7+ years building B2B SaaS products that increased ARR and retention. Led cross-functional teams to deliver 30% YOY growth and a $1.2M ARR uplift. Skilled in product strategy, user research, and data-driven roadmaps. Interested in senior PM roles focused on scale and growth — let’s connect.”</PromptBlock>
        </GuideSection>
        
        <GuideSection title="7. Advanced Tips & Best Practices">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Quantify everything:</strong> convert vague bullets into numbers (e.g., “reduced churn 12% in 6 months”).</li>
                <li><strong>Skills list:</strong> add top 10 skills that recruiters search for in your field. Put the most important ones first.</li>
                <li><strong>Featured content:</strong> add 1–3 pieces (projects, PDFs, presentations) that prove impact.</li>
                <li><strong>Engage:</strong> post 1–2 times per week on LinkedIn; interaction improves profile views and search appearances.</li>
                <li><strong>Privacy:</strong> Resume Worded analyzes public data or an uploaded PDF; don’t share passwords.</li>
            </ul>
        </GuideSection>

        <GuideSection title="8. Quick Checklist (30–45 min)">
            <ol className="list-decimal list-inside space-y-2">
                <li>Export LinkedIn profile PDF & copy public URL.</li>
                <li>Run Resume Worded review and save the report.</li>
                <li>Apply top 3 headline and top 5 About changes.</li>
                <li>Edit 2 high-impact experience bullets per role to add metrics.</li>
                <li>Update skills and add featured work.</li>
                <li>Re-run Resume Worded to measure increase.</li>
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

export default ResumeWordedGuide;