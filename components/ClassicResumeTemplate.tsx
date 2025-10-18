import React from 'react';
import type { ResumeFormData } from '../types';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean; accentColor: string }> = ({ title, children, hasContent = true, accentColor }) => {
    if (!hasContent) return null;
    return (
        <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: accentColor }}>{title}</h2>
            <div className="mt-1 mb-2 border-b-2" style={{ borderColor: accentColor }}></div>
            <div className="border-b border-slate-300 -mt-[7px]"></div>
            <div className="pt-2 text-[10px] text-slate-800 leading-normal">
                {children}
            </div>
        </section>
    );
};


const ClassicResumeTemplate: React.FC<{ formData: ResumeFormData, accentColor: string, fontFamily: string }> = ({ formData, accentColor, fontFamily }) => {
    const clean = (text: string) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const skills = clean(formData.skills).split(',').map(s => s.trim()).filter(Boolean);
    const numSkills = skills.length;
    const colSize = Math.ceil(numSkills / 3);
    const skillsCol1 = skills.slice(0, colSize);
    const skillsCol2 = skills.slice(colSize, colSize * 2);
    const skillsCol3 = skills.slice(colSize * 2);

    const additionalInfo = [formData.languages, formData.certifications, formData.awards].map(clean).filter(Boolean);
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };

    return (
        <div className="p-8 bg-white text-slate-900 text-[10px]" style={fontStyle}>
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider" style={{ color: accentColor }}>{clean(formData.fullName)}</h1>
                <h2 className="text-lg font-bold uppercase tracking-wider mt-1">{clean(formData.targetRole)}</h2>
                <div className="mt-2 text-xs text-slate-600 flex justify-center items-center flex-wrap gap-x-3">
                    <span>{clean(formData.location)}</span>
                    <span>|</span>
                    <span>{clean(formData.email)}</span>
                    <span>|</span>
                    <span>{clean(formData.portfolio)}</span>
                </div>
            </header>

            {/* Summary */}
            <ResumeSection title="Summary" accentColor={accentColor}>
                <p>{clean(formData.summary)}</p>
            </ResumeSection>

            {/* Technical Skills */}
            <ResumeSection title="Technical Skills" accentColor={accentColor}>
                <div className="grid grid-cols-3 gap-x-4">
                    <ul className="list-disc list-inside">
                        {skillsCol1.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                    <ul className="list-disc list-inside">
                        {skillsCol2.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                    <ul className="list-disc list-inside">
                        {skillsCol3.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                </div>
            </ResumeSection>

            {/* Professional Experience */}
            <ResumeSection title="Professional Experience" hasContent={formData.experiences.some(e => clean(e.jobTitle))} accentColor={accentColor}>
                <div className="space-y-4">
                    {formData.experiences.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-sm text-slate-900">
                                    {clean(exp.jobTitle)}{exp.company ? `, ${clean(exp.company)}` : ''}
                                </h3>
                                <p className="font-bold text-xs text-slate-800">{clean(exp.startDate)} - {clean(exp.endDate)}</p>
                            </div>
                            <ul className="list-disc list-inside mt-1 pl-1 space-y-1">
                                {clean(exp.description).split('\n').map((line, i) => (
                                    <li key={i}>{line.replace(/•\s*/, '')}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Education" hasContent={!!clean(formData.education)} accentColor={accentColor}>
                 <div className="space-y-4">
                    {clean(formData.education).split('\n').map((eduLine, i) => {
                        const [main, ...details] = eduLine.split('|-');
                        const [degree, institution, date] = main.split(',');
                        return (
                            <div key={i}>
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm text-slate-900">{clean(degree || '')}, <span className="font-normal italic">{clean(institution || '')}</span></h3>
                                    <p className="font-bold text-xs text-slate-800">{clean(date || '')}</p>
                                </div>
                                {details && details.length > 0 && (
                                     <ul className="list-disc list-inside mt-1 pl-1 space-y-1">
                                        {details.map((detail, j) => (
                                            <li key={j}>{clean(detail).replace(/•\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                </div>
            </ResumeSection>

            {/* Additional Information */}
            <ResumeSection title="Additional Information" hasContent={additionalInfo.length > 0} accentColor={accentColor}>
                <ul className="list-disc list-inside space-y-1">
                    {additionalInfo.map((info, i) => (
                        <li key={i}>{info.replace(/•\s*/, '')}</li>
                    ))}
                </ul>
            </ResumeSection>

        </div>
    );
};

export default ClassicResumeTemplate;