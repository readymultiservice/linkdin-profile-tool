
import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface BrandwatchGuideProps {
  onBack: () => void;
}

const BrandwatchGuide: React.FC<BrandwatchGuideProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to All Guides
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Brandwatch — Social Listening Guide</h1>
            <p className="mt-4 text-lg text-slate-600">Leverage Brandwatch to monitor industry conversations, track your personal brand, and find content opportunities on LinkedIn.</p>
        </header>
        
        <GuideSection title="1. What You'll Need">
            <ol className="list-decimal list-inside space-y-2">
                <li>A Brandwatch account with access to the Consumer Intelligence platform.</li>
                <li>A list of 5-10 keywords relevant to your industry and expertise (e.g., "SaaS marketing," "product-led growth").</li>
                <li>A list of 3-5 competitors or industry leaders you want to monitor.</li>
                <li>Your own name and company name to track mentions.</li>
            </ol>
        </GuideSection>

        <GuideSection title="2. Setting Up Your Listening Queries">
            <ol className="list-decimal list-inside space-y-2">
                <li>Log into Brandwatch and navigate to the "Data" section to create a new "Query."</li>
                <li><strong>Industry Buzz Query:</strong> Create a query using your industry keywords. Use Boolean operators like OR and AND to refine it (e.g., `("SaaS" OR "B2B Tech") AND ("marketing" OR "growth")`).</li>
                <li><strong>Personal Brand Query:</strong> Create a query with your name and variations (e.g., `"Jane Doe" OR "Jane D." OR "@janedoe"`).</li>
                <li><strong>Competitor Query:</strong> Create a query for each competitor you want to track.</li>
                <li>For all queries, add a filter to only include data from `linkedin.com`.</li>
            </ol>
        </GuideSection>

        <GuideSection title="3. AI Prompt for Query Building">
          <p>If you're unsure how to structure your query, use an AI assistant with this prompt:</p>
          <PromptBlock>
            “Create a Brandwatch Boolean query to track conversations about AI in marketing on LinkedIn. Include keywords like 'generative AI', 'marketing automation', and 'personalization'. Exclude mentions related to job postings.”
          </PromptBlock>
        </GuideSection>

        <GuideSection title="4. Analyzing the Data for LinkedIn Strategy">
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Find Content Ideas:</strong> In your "Industry Buzz" dashboard, look at the "Topics" cloud. What are people talking about? What questions are they asking? Use these as prompts for your next LinkedIn posts.</li>
                <li><strong>Engage in Conversations:</strong> Find relevant public posts from your queries and add thoughtful comments to join the conversation and increase your visibility.</li>
                <li><strong>Track Your Mentions:</strong> Monitor your "Personal Brand" query to see who is talking about you. Engage with positive mentions and address any negative feedback.</li>
                <li><strong>Benchmark Against Competitors:</strong> See what content is performing well for your competitors. Analyze their topics, post formats, and engagement rates to inform your own strategy.</li>
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

export default BrandwatchGuide;
