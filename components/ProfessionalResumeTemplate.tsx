import React from 'react';
import type { ResumeFormData } from '../types';

const Section: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean; }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section className="mt-5">
            <h3 className="bg-slate-100 text-slate-800 text-[9px] font-extrabold tracking-[.2em] p-1.5 px-2">
                {title}
            </h3>
            <div className="pt-3 text-[10px] text-slate-700 leading-relaxed">
                {children}
            </div>
        </section>
    );
};

const ProfessionalResumeTemplate: React.FC<{ formData: ResumeFormData, fontFamily: string }> = ({ formData, fontFamily }) => {
    const clean = (text: string) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const splitIntoColumns = (items: string[]) => {
        if (!items) return [[], []];
        const mid = Math.ceil(items.length / 2);
        return [items.slice(0, mid), items.slice(mid)];
    };

    const skills = clean(formData.skills).split(',').map(s => s.trim()).filter(Boolean);
    const [skillsCol1, skillsCol2] = splitIntoColumns(skills);
    
    const interests = clean(formData.interests).split(',').map(s => s.trim()).filter(Boolean);
    const [interestsCol1, interestsCol2] = splitIntoColumns(interests);

    const awards = clean(formData.awards)
        .split('\n')
        .map(s => s.replace(/•\s*/, '').trim())
        .filter(Boolean);
        
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

    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };

    return (
        <div className="p-8 bg-white text-black" style={fontStyle}>
            <header className="text-left mb-4">
                <h1 className="text-[2.5rem] font-black tracking-normal leading-tight">{formData.fullName.toUpperCase()}</h1>
                <p className="text-[9px] mt-1 tracking-widest text-slate-600">{formData.location} | {formData.email} | {formData.portfolio}</p>
                <h2 className="text-sm font-bold tracking-[.2em] mt-3">{formData.targetRole.toUpperCase()}</h2>
                <p className="text-[10px] mt-2 text-slate-700 leading-normal border-t border-slate-200 pt-2">{formData.summary}</p>
            </header>

            <Section title="WORK EXPERIENCE" hasContent={formData.experiences.some(e => clean(e.jobTitle))}>
                 <div className="space-y-3">
                    {formData.experiences.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[11px]">{clean(exp.jobTitle)} | {clean(exp.company)}</h4>
                                <p className="text-slate-600 font-medium text-[9px]">{clean(exp.startDate)} - {clean(exp.endDate)}</p>
                            </div>
                            <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5 text-slate-800">
                                {clean(exp.description).split('\n').map((line, i) => line.trim() && <li key={i} className="pl-1">{line.replace(/•\s*/, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section title="SKILLS" hasContent={skills.length > 0}>
                 <div className="grid grid-cols-2 gap-x-8">
                    <ul className="list-disc list-inside space-y-1">
                        {skillsCol1.map(skill => <li key={skill} className="pl-1">{skill}</li>)}
                    </ul>
                    <ul className="list-disc list-inside space-y-1">
                        {skillsCol2.map(skill => <li key={skill} className="pl-1">{skill}</li>)}
                    </ul>
                </div>
            </Section>
            
            <Section title="EDUCATION" hasContent={educationEntries.length > 0 && !!educationEntries[0].degree}>
                <div className="space-y-3">
                     {educationEntries.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-[11px]">{edu.degree} | {edu.institution}</h4>
                                <p className="text-slate-600 font-medium text-[9px]">{edu.date}</p>
                            </div>
                            <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5 text-slate-800">
                                {edu.details.map((detail, i) => <li key={i} className="pl-1">{detail}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
            
             <Section title="INTERESTS" hasContent={interests.length > 0}>
                <div className="grid grid-cols-2 gap-x-8">
                    <ul className="list-disc list-inside space-y-1">
                        {interestsCol1.map(interest => <li key={interest} className="pl-1">{interest}</li>)}
                    </ul>
                    <ul className="list-disc list-inside space-y-1">
                        {interestsCol2.map(interest => <li key={interest} className="pl-1">{interest}</li>)}
                    </ul>
                </div>
            </Section>

            <Section title="AWARDS" hasContent={awards.length > 0}>
                <ul className="list-disc list-inside space-y-1">
                    {awards.map(award => <li key={award} className="pl-1">{award}</li>)}
                </ul>
            </Section>
        </div>
    );
};

export default ProfessionalResumeTemplate;