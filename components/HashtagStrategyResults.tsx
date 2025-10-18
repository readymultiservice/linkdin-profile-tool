
import React from 'react';
import type { HashtagStrategyResult } from '../types';
import { FireIcon } from './icons/FireIcon';
import { HashtagIcon } from './icons/HashtagIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';


const HashtagCategory: React.FC<{ title: string, hashtags: string[], bgColor: string, textColor: string }> = ({ title, hashtags, bgColor, textColor }) => (
    <div>
        <h4 className={`font-semibold mb-2 ${textColor}`}>{title}</h4>
        <div className="flex flex-wrap gap-2">
            {hashtags.map(tag => (
                <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>#{tag}</span>
            ))}
        </div>
    </div>
);

const HashtagStrategyResults: React.FC<{ result: HashtagStrategyResult }> = ({ result }) => (
    <div className="space-y-10 animate-fade-in">
        
        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><FireIcon className="h-6 w-6 mr-2 text-red-500" /> 🔥 Top 10 Recommended</h3>
            <div className="flex flex-wrap gap-2">
                {result.topHashtags.map(kw => (
                    <span key={kw} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">#{kw}</span>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><LightbulbIcon className="h-6 w-6 mr-2 text-blue-600" /> 📊 Strategy & Best Practices</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-sm">
                <div>
                    <strong className="text-black">How many to use:</strong>
                    <p className="text-black">{result.postingStrategy.howMany}</p>
                </div>
                 <div>
                    <strong className="text-black">Best combination:</strong>
                    <p className="text-black">{result.postingStrategy.combination}</p>
                </div>
                 <div>
                    <strong className="text-black">Placement:</strong>
                    <p className="text-black">{result.postingStrategy.placement}</p>
                </div>
            </div>
        </div>
        
        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><TrendingUpIcon className="h-6 w-6 mr-2 text-blue-600" /> 🆕 Emerging Hashtags</h3>
             <div className="flex flex-wrap gap-2">
                {result.emergingHashtags.map(tag => (
                    <span key={tag} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">#{tag}</span>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><HashtagIcon className="h-6 w-6 mr-2 text-blue-600" /> 📌 Full Hashtag List</h3>
            <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <HashtagCategory 
                    title="High Reach / Trending" 
                    hashtags={result.fullHashtagList.highReach}
                    bgColor="bg-purple-100"
                    textColor="text-purple-800"
                />
                 <HashtagCategory 
                    title="Medium Competition" 
                    hashtags={result.fullHashtagList.mediumCompetition}
                    bgColor="bg-blue-100"
                    textColor="text-blue-800"
                />
                 <HashtagCategory 
                    title="Niche / Long-tail" 
                    hashtags={result.fullHashtagList.niche}
                    bgColor="bg-slate-200"
                    textColor="text-black"
                />
            </div>
        </div>

    </div>
);


const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182 3.182m3.182-3.182v4.995m-3.182 0h4.995" />
  </svg>
);


export default HashtagStrategyResults;
