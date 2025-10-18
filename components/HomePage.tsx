import React from 'react';
import type { AppView, Slide } from '../types';
import HeroSlider from './HeroSlider';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import BenefitsSection from './BenefitsSection';
import TrustSection from './TrustSection';
import CtaSection from './CtaSection';
import StatsHighlightSection from './StatsHighlightSection';
import AllToolsSection from './AllToolsSection';
import ResumeTemplatesSection from './ResumeTemplatesSection';

interface HomePageProps {
  onNavigate: (view: AppView) => void;
  slides: Slide[];
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, slides }) => {
  const handleGetStarted = () => {
    onNavigate('instant-score');
  };

  return (
    <div className="bg-white">
      <HeroSlider slides={slides} onNavigate={onNavigate} />
      <StatsHighlightSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <AllToolsSection onNavigate={onNavigate} />
      <ResumeTemplatesSection onNavigate={onNavigate} />
      <HowItWorksSection />
      <BenefitsSection />
      <TrustSection />
      <CtaSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default HomePage;