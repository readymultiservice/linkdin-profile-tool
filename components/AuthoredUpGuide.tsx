import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface AuthoredUpGuideProps {
  onBack: () => void;
}

const AuthoredUpGuide: React.FC<AuthoredUpGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">AuthoredUp — Content Creation Guide</h1>
            <p className="mt-4 text-lg text-slate-600">A guide to using AuthoredUp for writing, scheduling, and analyzing your LinkedIn content.</p>
        </header>
        
        <GuideSection title="1. Getting Started with the Editor">
            <ol className="list-decimal list-inside space-y-2">
                <li>Install the AuthoredUp browser extension and log in.</li>
                <li>Open LinkedIn and click the "Write a post" button. The AuthoredUp editor will appear.</li>
                <li>Explore the formatting tools: use <strong>bold</strong>, <em>italics</em>, and bullet points to make your post readable.</li>
                <li>Use the live preview on the right to see how your post will look on different devices.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Writing and Reusing Content">
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Drafting:</strong> Write your post directly in the editor. The readability score will help you simplify your language.</li>
                <li><strong>Using Snippets:</strong> Save frequently used phrases, hashtags, or calls-to-action as "Snippets" to insert them quickly.</li>
                <li><strong>Saving Drafts:</strong> AuthoredUp automatically saves your work, so you can come back to your drafts later.</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. Scheduling and Analytics">
            <p>Plan your content calendar and understand what works.</p>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Scheduling:</strong> Instead of posting immediately, click the "Schedule" button. Choose a date and time for your post to go live.</li>
                <li><strong>Analytics:</strong> After posting, go to your AuthoredUp dashboard to view analytics. Track impressions, engagement rate, and comments for each post.</li>
                <li><strong>Identify Top Posts:</strong> Use analytics to find your best-performing content and repurpose those topics for future posts.</li>
            </ol>
        </GuideSection>

        <GuideSection title="4. Prompt for Generating Post Ideas (to use with an AI tool)">
          <p>Before writing in AuthoredUp, generate ideas with a tool like ChatGPT.</p>
          <PromptBlock>
            “I am a [Your Profession] who wants to post on LinkedIn. Give me 5 post ideas about [Your Topic]. For each idea, provide a compelling hook, 3 key talking points, and a concluding question. The target audience is [Your Target Audience].”
          </PromptBlock>
        </GuideSection>
        
        <GuideSection title="5. Pro Tips for Maximum Impact">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Post Consistently:</strong> Use the scheduler to maintain a consistent posting schedule (e.g., 3 times per week).</li>
                <li><strong>Engage Early:</strong> The first hour after posting is critical. Be ready to reply to comments to boost your post's visibility in the algorithm.</li>
                <li><strong>Preview Before Publishing:</strong> Always use the mobile and desktop preview to ensure your formatting looks correct and that no important text is hidden behind a "see more" link.</li>
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

export default AuthoredUpGuide;