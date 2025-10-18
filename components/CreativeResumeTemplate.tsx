import React from 'react';
import type { ResumeFormData } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface CreativeResumeTemplateProps {
    formData: ResumeFormData;
    accentColor: string;
    fontFamily: string;
}

const Section: React.FC<{ title: string, accentColor: string, children: React.ReactNode, hasContent?: boolean }> = ({ title, accentColor, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <div className="mt-4">
            <h2 className="text-sm font-bold tracking-widest text-black uppercase">{title}</h2>
            <hr className="mt-1 border-t-2" style={{ borderColor: accentColor }} />
            <div className="mt-2 text-[10px] text-slate-800 leading-normal">
                {children}
            </div>
        </div>
    );
};

const CreativeResumeTemplate: React.FC<CreativeResumeTemplateProps> = ({ formData, accentColor, fontFamily }) => {
    const clean = (text: string | undefined) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const contactLinks = [
        `Email: ${clean(formData.email)}`,
        `Mobile: ${clean(formData.phone)}`,
        `Linkedin: ${clean(formData.linkedin)}`,
        ...clean(formData.portfolio).split('|').map(s => s.trim())
    ].filter(Boolean);
    
    const educationEntries = clean(formData.education)
        .split('\n')
        .map(entry => {
            const [main, grade, dates] = entry.split(',');
            const [institution, location, degree] = main.split(' - ');
            return {
                institution, location, degree, grade, dates
            };
        });
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };

    return (
        <div className="p-8 bg-white text-black" style={fontStyle}>
            <header className="text-center mb-4">
                <h1 className="text-3xl font-extrabold tracking-wider">{clean(formData.fullName).toUpperCase()}</h1>
                <p className="mt-2 text-xs text-slate-600">
                    {contactLinks.join(' | ')}
                </p>
            </header>

            <Section title="Career objective" accentColor={accentColor} hasContent={!!formData.summary}>
                <p>{clean(formData.summary)}</p>
            </Section>

            <Section title="Experience" accentColor={accentColor} hasContent={formData.experiences.some(e => clean(e.jobTitle))}>
                 <div className="space-y-3">
                    {formData.experiences.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-xs">{clean(exp.jobTitle)}</h3>
                                <p className="text-xs font-medium text-slate-600">{clean(exp.startDate)} - {clean(exp.endDate)}</p>
                            </div>
                            <p className="text-xs italic text-slate-700">{clean(exp.company)}</p>
                            <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                                {clean(exp.description).split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/•\s*/, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section title="Education" accentColor={accentColor} hasContent={!!formData.education}>
                 <div className="space-y-3">
                    {clean(formData.education).split('\n').map((line, i) => {
                        const [main, ...rest] = line.split(',');
                        const [inst, loc] = main.split(' - ');
                        return(
                        <div key={i}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-xs">{clean(inst)}</h3>
                                <p className="text-xs font-medium text-slate-600">{clean(rest.pop())}</p>
                            </div>
                             <p className="text-xs italic text-slate-700">{clean(loc)} - {clean(rest.join(', '))}</p>
                        </div>
                        )
                    })}
                </div>
            </Section>
            
            <Section title="Project" accentColor={accentColor} hasContent={formData.projects.some(p => clean(p.name))}>
                <div className="space-y-3">
                    {formData.projects.map(proj => (
                        <div key={proj.id}>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-xs">{clean(proj.name)}</h3>
                                {proj.link && (
                                    <a href={`https://${clean(proj.link)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        <ExternalLinkIcon className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                            <p className="mt-1">{clean(proj.description)}</p>
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section title="Technical Skills and Interests" accentColor={accentColor} hasContent={!!formData.skills}>
                <div className="space-y-1">
                    {clean(formData.skills).split('\n').map((line, i) => {
                         const [category, skills] = line.replace(/•\s*/, '').split(':');
                         return (
                            <p key={i}><strong>{clean(category)}:</strong> {clean(skills)}</p>
                         )
                    })}
                </div>
            </Section>
            
            <Section title="Achievement and Certification" accentColor={accentColor} hasContent={!!formData.awards}>
                <ul className="list-disc list-inside ml-2 space-y-0.5">
                    {clean(formData.awards).split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/•\s*/, '')}</li>)}
                </ul>
            </Section>
        </div>
    );
};

export default CreativeResumeTemplate;