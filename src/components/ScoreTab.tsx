import React from 'react';
import type { ProfileScore, ScoreDetail } from '../types';
import ScoreChart from './ScoreChart';

interface ScoreTabProps {
  score: ProfileScore;
}

const ScoreTab: React.FC<ScoreTabProps> = ({ score }) => {
  const getScoreColor = (value: number) => {
    if (value >= 85) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ScoreCard: React.FC<{ title: string, details: ScoreDetail }> = ({ title, details }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-black">{title}</h4>
        <p className={`text-xl font-bold ${getScoreColor(details.score)}`}>{details.score}<span className="text-sm font-normal text-black">/100</span></p>
      </div>
      <p className="text-black mt-2 text-sm">{details.feedback}</p>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-black mb-4">Your Profile Score</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <ScoreChart score={score.overall} />
        </div>
        <div className="space-y-3">
          <ScoreCard title="Headline" details={score.breakdown.headline} />
          <ScoreCard title="Summary" details={score.breakdown.summary} />
          <ScoreCard title="Experience" details={score.breakdown.experience} />
          <ScoreCard title="Skills" details={score.breakdown.skills} />
        </div>
      </div>
    </div>
  );
};

export default ScoreTab;