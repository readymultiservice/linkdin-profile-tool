
import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface InlyticsGuideProps {
  onBack: () => void;
}

const InlyticsGuide: React.FC<InlyticsGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">inlytics — Analytics & Scheduling Guide</h1>
            <p className="mt-4 text-lg text-slate-600">A guide to using inlytics for analyzing performance and scheduling content for your personal profile.</p>
        </header>
        
        <GuideSection title="1. Initial Setup">
            <ol className="list-decimal list-inside space-y-2">
                <li>Create an inlytics account and connect it to your LinkedIn profile.</li>
                <li>Wait for the initial data sync to complete.</li>
                <li>Explore the Dashboard, Analytics, and Scheduler tabs.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Understanding Your Analytics Dashboard">
            <p>The main dashboard gives you a high-level overview. Pay attention to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Profile Views:</strong> How many people are visiting your profile? Look for spikes after posting popular content.</li>
                <li><strong>Follower Growth Chart:</strong> Is your audience growing consistently?</li>
                <li><strong>Engagement Rate:</strong> A key indicator of content quality. inlytics helps you see your average rate.</li>
                <li><strong>Best Time to Post:</strong> inlytics analyzes your past engagement to suggest optimal posting times.</li>
            </ul>
        </GuideSection>

        <GuideSection title="3. Using the Content Scheduler">
            <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the "Scheduler" tab.</li>
                <li>Click "Create Post" to open the content editor.</li>
                <li>Write your post, add images or videos, and format your text.</li>
                <li>Choose a date and time to publish. Consider using the "Best Time to Post" recommendations from your analytics.</li>
                <li>Schedule the post and view it on your content calendar.</li>
            </ol>
        </GuideSection>

        <GuideSection title="4. Prompt for Content Planning">
          <p>Use AI to generate a week's worth of content ideas to plug into the inlytics scheduler.</p>
          <PromptBlock>
            “I am a [Your Profession]. My goal on LinkedIn is to [Your Goal, e.g., 'attract new clients']. Based on the theme of [Your Core Topic], generate a 5-day content plan for me to schedule in inlytics. Include a mix of formats: a text-only story, a question/poll, and a post with an image.”
          </PromptBlock>
        </GuideSection>
        
        <GuideSection title="5. Pro Tips">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Plan a Week Ahead:</strong> Use the scheduler to plan and batch-create your content for the upcoming week. This ensures consistency.</li>
                <li><strong>Review Monthly Performance:</strong> At the end of each month, review your overall stats in inlytics. What worked well? What didn't? Adjust your strategy for the next month.</li>
                <li><strong>Combine with Native Analytics:</strong> Use inlytics for the high-level trends and scheduling, but cross-reference with LinkedIn's native analytics for demographic data about your audience.</li>
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

export default InlyticsGuide;
