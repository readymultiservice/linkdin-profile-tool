
import React, { useState } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import ResumeWordedGuide from './ResumeWordedGuide';
import JobscanGuide from './JobscanGuide';
import RedactAIGuide from './RedactAIGuide';
import ReeplGuide from './ReeplGuide';
import LinkedFusionGuide from './LinkedFusionGuide';
import AuthoredUpGuide from './AuthoredUpGuide';
import BrandwatchGuide from './BrandwatchGuide';
import ShieldAnalyticsGuide from './ShieldAnalyticsGuide';
import InlyticsGuide from './InlyticsGuide';
import LinkedInNativeAnalyticsGuide from './LinkedInNativeAnalyticsGuide';

interface GuidesPageProps {
  onBack: () => void;
}

type GuideId = 
  | 'resumeWorded' 
  | 'jobscan' 
  | 'redactAI' 
  | 'reepl' 
  | 'linkedFusion' 
  | 'authoredUp'
  | 'brandwatch'
  | 'shield'
  | 'inlytics'
  | 'linkedInNative';

const guides = [
  { id: 'resumeWorded', title: 'Resume Worded', description: 'AI-powered profile analysis and scoring.' },
  { id: 'jobscan', title: 'Jobscan', description: 'Optimize your profile against specific job descriptions.' },
  { id: 'redactAI', title: 'RedactAI', description: 'Free profile reviews and content generation.' },
  { id: 'reepl', title: 'Reepl', description: 'Generate engaging posts and carousels with AI.' },
  { id: 'linkedFusion', title: 'LinkedFusion', description: 'Automate your outreach and lead generation workflows.' },
  { id: 'authoredUp', title: 'AuthoredUp', description: 'Write, schedule, and analyze your content.' },
  { id: 'brandwatch', title: 'Brandwatch', description: 'Social listening and audience analysis.' },
  { id: 'shield', title: 'Shield Analytics', description: 'In-depth personal profile analytics.' },
  { id: 'inlytics', title: 'inlytics', description: 'Analytics for personal profiles and company pages.' },
  { id: 'linkedInNative', title: 'LinkedIn Native Analytics', description: 'Understand LinkedIn\'s built-in analytics tools.' },
];

const GuidesPage: React.FC<GuidesPageProps> = ({ onBack }) => {
  const [activeGuide, setActiveGuide] = useState<GuideId | null>(null);

  const handleSelectGuide = (id: GuideId) => {
    setActiveGuide(id);
    window.scrollTo(0, 0);
  };

  const handleBackToGuides = () => {
    setActiveGuide(null);
    window.scrollTo(0, 0);
  };

  if (activeGuide) {
    switch(activeGuide) {
      case 'resumeWorded': return <ResumeWordedGuide onBack={handleBackToGuides} />;
      case 'jobscan': return <JobscanGuide onBack={handleBackToGuides} />;
      case 'redactAI': return <RedactAIGuide onBack={handleBackToGuides} />;
      case 'reepl': return <ReeplGuide onBack={handleBackToGuides} />;
      case 'linkedFusion': return <LinkedFusionGuide onBack={handleBackToGuides} />;
      case 'authoredUp': return <AuthoredUpGuide onBack={handleBackToGuides} />;
      case 'brandwatch': return <BrandwatchGuide onBack={handleBackToGuides} />;
      case 'shield': return <ShieldAnalyticsGuide onBack={handleBackToGuides} />;
      case 'inlytics': return <InlyticsGuide onBack={handleBackToGuides} />;
      case 'linkedInNative': return <LinkedInNativeAnalyticsGuide onBack={handleBackToGuides} />;
      default: return null;
    }
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to Home
        </button>

        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Tool & Workflow Guides</h1>
          <p className="mt-4 text-lg text-black">Step-by-step guides for popular LinkedIn tools to help you optimize your profile and content strategy.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => handleSelectGuide(guide.id as GuideId)}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden text-left p-6 transition-transform transform hover:-translate-y-1 bg-white hover:bg-slate-50 border border-slate-200"
            >
              <BookOpenIcon className="h-8 w-8 mb-4 text-blue-600" />
              <h3 className="text-lg font-bold text-black">{guide.title}</h3>
              <p className="mt-1 text-sm flex-grow text-black">{guide.description}</p>
              <p className="mt-4 text-sm font-semibold text-blue-600">View Guide &rarr;</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
