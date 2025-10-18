import React from 'react';
import type { ResumeFormData } from '../types';

const Section: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean; }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section className="mt-5">
            <h3 className="text-blue-600 text-sm font-bold tracking-wider uppercase border-b-2 border-blue-600 pb-1">
                {title}
            </h3>
            <div className="pt-3 text-[10px] text-slate-800 leading-relaxed">
                {children}
            </div>
        </section>
    );
};

interface CorporateResumeTemplateProps {
    formData: ResumeFormData;
    fontFamily: string;
}

const CorporateResumeTemplate: React.FC<CorporateResumeTemplateProps> = ({ formData, fontFamily }) => {
    const clean = (text: string | undefined) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const skills = clean(formData.skills).split(',').map(s => s.trim()).filter(Boolean);

    const educationEntries = clean(formData.education)
        .split('\n')
        .map(entry => {
            const [main, ...details] = entry.split('|-');
            const [degree, institution, date] = main.split(',');
            return {
                degree: clean(degree),
                institution: clean(institution),
                date: clean(date),
                details: details.map(d => clean(d.replace(/•\s*/, '')))
            };
        });

    const additionalInfo = {
        Languages: clean(formData.languages),
        Certifications: clean(formData.certifications),
        'Awards/Activities': clean(formData.awards)
    };
    
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };

    return (
        <div className="p-8 bg-white text-black" style={fontStyle}>
            <header className="text-left mb-4">
                <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight leading-tight">{formData.fullName.toUpperCase()}</h1>
                <h2 className="text-lg font-bold tracking-wide mt-1">{formData.targetRole.toUpperCase()}</h2>
                <p className="text-[9px] mt-2 text-slate-500">{clean(formData.location)} | {clean(formData.email)} | {clean(formData.portfolio)}</p>
            </header>

            <Section title="Summary" hasContent={!!formData.summary}>
                <p className="text-[10px]">{clean(formData.summary)}</p>
            </Section>

            <Section title="Technical Skills" hasContent={skills.length > 0}>
                <div className="grid grid-cols-3 gap-x-4">
                    {skills.map(skill => <p key={skill} className="text-[10px]">{skill}</p>)}
                </div>
            </Section>

            <Section title="Professional Experience" hasContent={formData.experiences.some(e => clean(e.jobTitle))}>
                 <div className="space-y-4">
                    {formData.experiences.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[11px]">{clean(exp.jobTitle)}</h4>
                                <p className="text-slate-600 font-medium text-[9px]">{clean(exp.startDate)} - {clean(exp.endDate)}</p>
                            </div>
                            <p className="text-[10px] italic">{clean(exp.company)}</p>
                            <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5 text-slate-800">
                                {clean(exp.description).split('\n').map((line, i) => line.trim() && <li key={i} className="pl-1">{line.replace(/•\s*/, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section title="Education" hasContent={educationEntries.length > 0 && !!educationEntries[0].degree}>
                <div className="space-y-4">
                     {educationEntries.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[11px]">{edu.degree}</h4>
                                <p className="text-slate-600 font-medium text-[9px]">{edu.date}</p>
                            </div>
                            <p className="text-[10px] italic">{edu.institution}</p>
                            {edu.details.length > 0 && (
                                <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5 text-slate-800">
                                    {edu.details.map((detail, i) => <li key={i} className="pl-1">{detail}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section title="Additional Information" hasContent={Object.values(additionalInfo).some(Boolean)}>
                <ul className="list-none space-y-1">
                    {Object.entries(additionalInfo).map(([key, value]) => value && (
                        <li key={key}>
                            <span className="font-bold">{key}:</span> {value}
                        </li>
                    ))}
                </ul>
            </Section>
        </div>
    );
};

export default CorporateResumeTemplate;