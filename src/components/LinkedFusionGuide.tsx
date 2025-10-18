import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface LinkedFusionGuideProps {
  onBack: () => void;
}

const LinkedFusionGuide: React.FC<LinkedFusionGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">LinkedFusion — Automation Workflow Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Optimize your outreach and lead generation with smart automation workflows.</p>
        </header>
        
        <GuideSection title="1. Preparation Checklist">
            <ol className="list-decimal list-inside space-y-2">
                <li>Define your Ideal Customer Profile (ICP): industry, company size, job title, location.</li>
                <li>Prepare a LinkedIn Sales Navigator search URL for your target audience.</li>
                <li>Write a connection request message template (keep it under 300 characters).</li>
                <li>Draft a sequence of 2-3 follow-up messages for new connections.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Setting Up a Campaign">
            <ol className="list-decimal list-inside space-y-2">
                <li>Log in to your LinkedFusion dashboard.</li>
                <li>Create a new campaign and give it a descriptive name.</li>
                <li>Import your target audience using the Sales Navigator search URL.</li>
                <li>Set up your message sequence: paste your connection request and follow-up messages.</li>
                <li>Configure campaign settings: set daily limits for connection requests and messages to stay within LinkedIn's safety guidelines.</li>
                <li>Launch the campaign.</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. Prompt for Writing Effective Outreach Messages">
          <p>Use an AI tool like ChatGPT to generate message templates before adding them to LinkedFusion.</p>
          <PromptBlock>
            “Write a LinkedIn connection request message for [Job Title, e.g., 'SaaS Founders']. My goal is to [Your Goal, e.g., 'offer my web design services']. The message should be friendly, personalized, and focus on a common interest or challenge. Keep it under 250 characters.”
          </PromptBlock>
        </GuideSection>

        <GuideSection title="4. Monitoring and Optimizing">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Track Key Metrics:</strong> Monitor your campaign's connection acceptance rate and reply rate.</li>
                <li><strong>A/B Test Messages:</strong> Create two versions of your connection request or follow-up messages to see which performs better.</li>
                <li><strong>Personalize Manually:</strong> Before LinkedFusion sends a request, review the prospect's profile and add a quick, personalized first line to your template.</li>
                <li><strong>Handle Replies Promptly:</strong> Turn off automation for prospects who reply and engage with them manually to build a relationship.</li>
            </ul>
        </GuideSection>

        <GuideSection title="5. Important Safety Precautions">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Warm-Up Your Account:</strong> If your LinkedIn account is new, start with low daily limits (e.g., 10-15 requests/day) and gradually increase.</li>
                <li><strong>Stay Below Limits:</strong> Do not exceed 80-100 connection requests per week to avoid account restrictions.</li>
                <li><strong>Vary Your Messaging:</strong> Use message variations (spintax) to avoid sending the exact same text repeatedly.</li>
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

export default LinkedFusionGuide;