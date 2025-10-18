import React from 'react';
import type { ResumeFormData } from '../types';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { StarIcon } from './icons/StarIcon';

interface SidebarResumeTemplateProps {
    formData: ResumeFormData;
    fontFamily: string;
}

const LeftSection: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/90 pb-1 border-b border-white/30">{title}</h2>
            <div className="mt-2 text-white/90 text-[10px] leading-snug">
                {children}
            </div>
        </section>
    );
};

const RightSection: React.FC<{ title: string; children: React.ReactNode; hasContent?: boolean }> = ({ title, children, hasContent = true }) => {
    if (!hasContent) return null;
    return (
        <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-700 pb-1 border-b-2 border-blue-700">{title}</h2>
            <div className="mt-3 text-slate-800 text-[10px] leading-normal">
                {children}
            </div>
        </section>
    );
};

const SidebarResumeTemplate: React.FC<SidebarResumeTemplateProps> = ({ formData, fontFamily }) => {
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };

    const interests = formData.interests.split('\n').map(i => i.trim()).filter(Boolean);
    const awards = formData.awards.split('\n').map(a => a.trim()).filter(Boolean);

    return (
        <div className="flex min-h-[297mm] bg-white" style={fontStyle}>
            {/* Left Column */}
            <div className="w-1/3 bg-blue-700 p-6 flex flex-col gap-6">
                {formData.profilePhoto && (
                    <div className="flex justify-center mt-2">
                        <img src={formData.profilePhoto} alt={formData.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                    </div>
                )}
                <LeftSection title="OBJETIVOS PROFESIONALES" hasContent={!!formData.summary}>
                    <p>{formData.summary}</p>
                </LeftSection>
                <LeftSection title="INTERESES" hasContent={interests.length > 0}>
                    <ul className="space-y-1">
                        {interests.map((interest, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-white/80">{interest.charAt(0)}</span>
                                <span>{interest.substring(1).trim()}</span>
                            </li>
                        ))}
                    </ul>
                </LeftSection>
                <LeftSection title="INFORMACIÓN DE CONTACTO">
                    <ul className="space-y-2">
                        {formData.phone && <li className="flex items-start gap-2"><PhoneIcon className="h-3 w-3 mt-0.5 text-white/80 flex-shrink-0" />{formData.phone}</li>}
                        {formData.email && <li className="flex items-start gap-2"><MailIcon className="h-3 w-3 mt-0.5 text-white/80 flex-shrink-0" />{formData.email}</li>}
                        {formData.portfolio && <li className="flex items-start gap-2"><GlobeAltIcon className="h-3 w-3 mt-0.5 text-white/80 flex-shrink-0" />{formData.portfolio}</li>}
                        {formData.location && <li className="flex items-start gap-2"><LocationMarkerIcon className="h-3 w-3 mt-0.5 text-white/80 flex-shrink-0" />{formData.location}</li>}
                    </ul>
                </LeftSection>
            </div>

            {/* Right Column */}
            <div className="w-2/3 p-8">
                <header className="mb-6 text-left">
                    <h1 className="text-4xl font-bold text-blue-700 uppercase tracking-wide">{formData.fullName}</h1>
                    <p className="text-lg text-slate-500 font-medium uppercase tracking-widest">{formData.targetRole}</p>
                </header>

                <div className="space-y-6">
                    <RightSection title="HISTORIAL ACADÉMICO" hasContent={!!formData.education}>
                         <div className="whitespace-pre-line">{formData.education}</div>
                    </RightSection>

                    <RightSection title="EXPERIENCIA LABORAL" hasContent={formData.experiences.some(e => e.jobTitle)}>
                        <div className="space-y-4">
                            {formData.experiences.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[11px]">{exp.jobTitle} | {exp.company}</h3>
                                        <p className="text-slate-600 font-medium text-[9px]">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <ul className="list-none mt-1 space-y-0.5">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i} className="pl-1">{line}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </RightSection>
                    
                    <RightSection title="LOGROS" hasContent={awards.length > 0}>
                        <ul className="space-y-1">
                            {awards.map((award, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-600">{award.charAt(0)}</span>
                                    <span>{award.substring(1).trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </RightSection>
                </div>
            </div>
        </div>
    );
};

export default SidebarResumeTemplate;