import React from 'react';
import type { ResumeFormData } from '../types';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface ExecutiveResumeTemplateProps {
    formData: ResumeFormData;
    fontFamily: string;
}

const RightSection: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-500 pb-1.5 border-b border-slate-300">{title}</h2>
            <div className="mt-3 text-[10px] text-slate-700 leading-normal">
                {children}
            </div>
        </section>
    );
};

const LeftSection: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400 pb-1.5 border-b border-slate-600">{title}</h2>
            <div className="mt-3 text-[10px] text-slate-300 leading-normal">
                {children}
            </div>
        </section>
    );
};

const ProgressBar: React.FC<{ label: string; level: number }> = ({ label, level }) => (
    <div className="mb-2">
        <p className="text-xs mb-1">{label}</p>
        <div className="w-full bg-slate-600 rounded-full h-1">
            <div className="bg-white h-1 rounded-full" style={{ width: `${level}%` }}></div>
        </div>
    </div>
);


const ExecutiveResumeTemplate: React.FC<ExecutiveResumeTemplateProps> = ({ formData, fontFamily }) => {
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };
    const clean = (text: string | undefined) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const languages = clean(formData.languages).split('\n').map(s => {
        const [lang, level] = s.split(',');
        return { lang: clean(lang), level: parseInt(level, 10) || 0 };
    });
    
    const skills = clean(formData.skills).split('\n').map(s => {
        const [skill, level] = s.split(',');
        return { skill: clean(skill), level: parseInt(level, 10) || 0 };
    });

    return (
        <div className="flex min-h-[297mm] bg-white text-black" style={fontStyle}>
            {/* Left Column */}
            <div className="w-[35%] bg-slate-800 text-white p-6 flex flex-col">
                <header className="pt-2">
                    <h1 className="text-3xl font-bold leading-tight tracking-wide">{clean(formData.fullName)}</h1>
                    <p className="text-md font-light text-slate-300 mt-1">{clean(formData.targetRole)}</p>
                </header>

                <div className="mt-8 space-y-1 text-xs">
                     <div className="flex items-center gap-2"><MailIcon className="w-3 h-3 text-slate-400" />{clean(formData.email)}</div>
                     <div className="flex items-center gap-2"><PhoneIcon className="w-3 h-3 text-slate-400" />{clean(formData.phone)}</div>
                     <div className="flex items-center gap-2"><LocationMarkerIcon className="w-3 h-3 text-slate-400" />{clean(formData.location)}</div>
                </div>

                <div className="mt-8 space-y-6">
                    <LeftSection title="IDIOMAS" hasContent={languages.some(l => l.lang)}>
                        {languages.map(l => l.lang && <ProgressBar key={l.lang} label={l.lang} level={l.level} />)}
                    </LeftSection>
                    <LeftSection title="CERTIFICACIONES" hasContent={!!formData.certifications}>
                        <div className="whitespace-pre-line">{clean(formData.certifications)}</div>
                    </LeftSection>
                    <LeftSection title="FORMACIÓN ACADÉMICA" hasContent={!!formData.education}>
                        <div className="whitespace-pre-line">{clean(formData.education)}</div>
                    </LeftSection>
                    <LeftSection title="HABILIDADES" hasContent={skills.some(s => s.skill)}>
                         {skills.map(s => s.skill && <ProgressBar key={s.skill} label={s.skill} level={s.level} />)}
                    </LeftSection>
                </div>
            </div>
            {/* Divider */}
            <div className="w-px bg-slate-300"></div>
            {/* Right Column */}
            <div className="w-[65%] p-8">
                <RightSection title="SOBRE MÍ" hasContent={!!formData.summary}>
                    <p>{clean(formData.summary)}</p>
                </RightSection>

                <RightSection title="EXPERIENCIA" hasContent={formData.experiences.some(e => clean(e.jobTitle))}>
                    <div className="space-y-4">
                        {formData.experiences.map(exp => (
                             <div key={exp.id}>
                                <h3 className="font-bold text-xs">{clean(exp.jobTitle)}</h3>
                                <p className="text-[10px] text-slate-600 font-semibold my-0.5">{clean(exp.company)}, {clean(exp.startDate)} - {clean(exp.endDate)}</p>
                                <ul className="list-none space-y-1">
                                    {clean(exp.description).split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </RightSection>
            </div>
        </div>
    );
};

export default ExecutiveResumeTemplate;