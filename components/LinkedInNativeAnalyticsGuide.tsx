
import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface LinkedInNativeAnalyticsGuideProps {
  onBack: () => void;
}

const LinkedInNativeAnalyticsGuide: React.FC<LinkedInNativeAnalyticsGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">LinkedIn Native Analytics Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Understand and utilize the free, built-in analytics tools provided by LinkedIn for your personal profile.</p>
        </header>
        
        <GuideSection title="1. Where to Find Your Analytics">
            <p>LinkedIn provides analytics in a few different places:</p>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Your Dashboard (Private to you):</strong> Go to your profile page and scroll down. You'll see a section called "Analytics" with key stats.</li>
                <li><strong>Individual Post Analytics:</strong> Click the "View analytics" button or the view count at the bottom of any of your posts.</li>
                <li><strong>Creator Mode Analytics:</strong> If you have Creator Mode turned on, you'll have a more detailed analytics dashboard accessible from your profile.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Key Profile Analytics to Understand">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Profile Views:</strong> Shows how many people have viewed your profile over the last 90 days. You can see trends and basic demographic info about your viewers.</li>
                <li><strong>Post Impressions:</strong> The total number of times your posts have been seen during a specific period.</li>
                <li><strong>Search Appearances:</strong> How many times your profile appeared in search results. This shows the effectiveness of your profile keywords.</li>
            </ul>
        </GuideSection>

        <GuideSection title="3. Analyzing Individual Post Performance">
            <p>When you click the analytics for a specific post, you'll see:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Impressions:</strong> The number of times your post was shown in the feed.</li>
                <li><strong>Reactions, Comments, Reposts:</strong> Your core engagement metrics.</li>
                <li><strong>Viewer Demographics:</strong> This is the most valuable part. You can see the job titles, companies, and locations of the people who viewed your post. This tells you if you're reaching your target audience.</li>
            </ul>
        </GuideSection>
        
        <GuideSection title="4. Actionable Insights from Your Data">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>If Search Appearances are low:</strong> Your profile keywords need work. Optimize your Headline and About section with terms your target audience would search for.</li>
                <li><strong>If Post Impressions are high but Engagement is low:</strong> Your content is reaching people, but it's not compelling enough to make them act. Work on stronger hooks and clearer calls-to-action.</li>
                <li><strong>If Viewer Demographics don't match your target audience:</strong> Your content topics might be too broad. Niche down to subjects that specifically appeal to the professionals you want to attract.</li>
            </ul>
        </GuideSection>

        <GuideSection title="5. AI Prompt for Keyword Optimization">
          <p>Use your 'Search Appearances' data to improve your profile with AI.</p>
          <PromptBlock>
            “My LinkedIn profile appeared in searches for these keywords: [List top 3-5 keywords from your analytics]. I want to rank higher for [Your Target Keyword]. Analyze my current headline '[Your Headline]' and About section '[Paste first 2 sentences of About]' and suggest how to integrate '[Your Target Keyword]' more effectively.”
          </PromptBlock>
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

export default LinkedInNativeAnalyticsGuide;
