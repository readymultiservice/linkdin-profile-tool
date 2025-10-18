
import React from 'react';

export const GuideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-black border-b-2 border-blue-200 pb-2 mb-4">{title}</h2>
    <div className="space-y-4 text-black leading-relaxed">
      {children}
    </div>
  </div>
);

export const PromptBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-100 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
    <code className="text-sm sm:text-base text-black whitespace-pre-wrap font-mono">{children}</code>
  </div>
);
