
import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface ShieldAnalyticsGuideProps {
  onBack: () => void;
}

const ShieldAnalyticsGuide: React.FC<ShieldAnalyticsGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Shield Analytics — Performance Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Use Shield to get deep insights into your LinkedIn content performance and audience growth.</p>
        </header>
        
        <GuideSection title="1. Getting Set Up">
            <ol className="list-decimal list-inside space-y-2">
                <li>Sign up for a Shield Analytics account and connect your LinkedIn profile.</li>
                <li>Allow 24-48 hours for Shield to sync your historical data.</li>
                <li>Familiarize yourself with the main dashboard sections: Stats, Content, and Audience.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Key Metrics to Track">
            <p>Focus on these metrics to understand what's working:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Average Views per Post:</strong> Your baseline reach. Aim to increase this over time.</li>
                <li><strong>Average Engagement Rate:</strong> (Likes + Comments) / Views. This shows how well your content resonates.</li>
                <li><strong>Follower Growth:</strong> Track your daily and weekly follower growth to see the impact of your content and engagement.</li>
                <li><strong>Top Performing Posts:</strong> Identify your best content by views, likes, and comments.</li>
            </ul>
        </GuideSection>

        <GuideSection title="3. How to Analyze Your Content">
            <ol className="list-decimal list-inside space-y-2">
                <li>Go to the "Content" tab in Shield.</li>
                <li>Sort your posts by "Views," "Likes," and "Comments" to find your winners.</li>
                <li>For each top post, analyze: What was the topic? What was the format (text, image, video, poll)? What was the hook in the first line?</li>
                <li>Use Shield's content labels (tags) to categorize your posts by topic (e.g., #leadership, #marketing, #tech). Compare the performance of different labels.</li>
            </ol>
        </GuideSection>

        <GuideSection title="4. AI Prompt for Content Strategy">
          <p>After analyzing your Shield data, use an AI to brainstorm new ideas.</p>
          <PromptBlock>
            “Based on my Shield Analytics, my top-performing LinkedIn posts are about [Your Top Topic 1] and [Your Top Topic 2]. The best format is [Text-only posts with a story]. Generate 5 new post ideas that follow this successful pattern. For each idea, provide a strong hook and 3 bullet points to cover.”
          </PromptBlock>
        </GuideSection>

        <GuideSection title="5. Best Practices">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Check Weekly:</strong> Dedicate 20 minutes each week to review your Shield dashboard. Identify one key insight to apply to the following week's content.</li>
                <li><strong>Double Down on What Works:</strong> If posts about a certain topic consistently perform well, create more content on that topic.</li>
                <li><strong>Experiment with Formats:</strong> If you only post text, use Shield to track the performance of your first few image or video posts to see if they resonate with your audience.</li>
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

export default ShieldAnalyticsGuide;
