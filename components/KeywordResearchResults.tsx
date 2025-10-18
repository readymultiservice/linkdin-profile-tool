
import React from 'react';
import type { KeywordResearchResult, ContentOutlineNode } from '../types';
import { FireIcon } from './icons/FireIcon';
import { KeyIcon } from './icons/KeyIcon';
import { PencilIcon } from './icons/PencilIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { TagIcon } from './icons/TagIcon';

const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-black';
    }
};

const getVolumeColor = (volume: 'Low' | 'Medium' | 'High') => {
     switch (volume) {
        case 'Low': return 'bg-slate-100 text-black';
        case 'Medium': return 'bg-blue-100 text-blue-800';
        case 'High': return 'bg-purple-100 text-purple-800';
        default: return 'bg-slate-100 text-black';
    }
}

const renderOutline = (node: ContentOutlineNode, level = 1) => (
    <div key={node.heading} className={level > 1 ? 'ml-6' : ''}>
        <p className={`${
            level === 1 ? 'text-lg font-bold text-black' : 
            level === 2 ? 'text-md font-semibold text-black mt-3' : 
            'text-sm font-medium text-black'
        }`}>{node.heading}</p>
        {node.children && node.children.length > 0 && (
             <div className="border-l-2 border-slate-200 pl-4 mt-1">
                {node.children.map(child => renderOutline(child, level + 1))}
            </div>
        )}
    </div>
);


const KeywordResearchResults: React.FC<{ result: KeywordResearchResult }> = ({ result }) => (
    <div className="space-y-10 animate-fade-in">

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><FireIcon className="h-6 w-6 mr-2 text-red-500" /> 🔥 Top 10 High-Impact Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {result.topKeywords.map(kw => (
                    <span key={kw} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{kw}</span>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><PencilIcon className="h-6 w-6 mr-2 text-blue-600" /> 📝 Headline/Title Suggestions</h3>
            <ul className="list-disc list-inside space-y-2 text-black">
                {result.titleSuggestions.map((title, i) => <li key={i}>{title}</li>)}
            </ul>
        </div>

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><DocumentTextIcon className="h-6 w-6 mr-2 text-blue-600" /> 📑 SEO Content Outline</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                {renderOutline(result.contentOutline)}
            </div>
        </div>
        
        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><TagIcon className="h-6 w-6 mr-2 text-blue-600" /> #️⃣ Hashtags</h3>
            <div className="flex flex-wrap gap-2">
                {result.hashtags.map(tag => (
                    <span key={tag} className="text-sm text-blue-700 font-medium">#{tag}</span>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center"><KeyIcon className="h-6 w-6 mr-2 text-blue-600" /> 📌 Full Keyword List</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Keyword</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Volume</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Difficulty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Intent</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Suggested Use</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200 text-sm text-black">
                        {result.keywordList.map(item => (
                            <tr key={item.keyword}>
                                <td className="px-4 py-2 font-semibold">{item.keyword}</td>
                                <td className="px-4 py-2"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVolumeColor(item.volume)}`}>{item.volume}</span></td>
                                <td className="px-4 py-2"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(item.difficulty)}`}>{item.difficulty}</span></td>
                                <td className="px-4 py-2">{item.intent}</td>
                                <td className="px-4 py-2">{item.suggestedUse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
);

export default KeywordResearchResults;
