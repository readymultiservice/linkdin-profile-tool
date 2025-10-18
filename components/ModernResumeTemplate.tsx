import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { DesktopComputerIcon } from './icons/DesktopComputerIcon';
import { CogIcon } from './icons/CogIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import type { ResumeFormData } from '../types';

interface ModernResumeTemplateProps {
    formData: ResumeFormData;
    accentColor: string;
    fontFamily: string;
}

const ModernResumeTemplate: React.FC<ModernResumeTemplateProps> = ({ formData, accentColor, fontFamily }) => {
    
    const skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const getSkillLevel = (skill: string) => {
        let hash = 0;
        for (let i = 0; i < skill.length; i++) {
            hash = skill.charCodeAt(i) + ((hash << 5) - hash);
        }
        return (Math.abs(hash) % 50) + 45; // between 45 and 95
    };

    const clean = (text: string) => text ? text.replace(/\[|\]/g, '').trim() : '';
    const fontStyle = { fontFamily: `'${fontFamily}', ${fontFamily === 'Merriweather' ? 'serif' : 'sans-serif'}` };
    
    return (
        <div className="relative w-full h-full bg-white text-sm leading-relaxed" style={fontStyle}>
            <div className="flex min-h-[297mm]">
                {/* Left Column */}
                <div className="relative w-1/3 bg-[#0A2342] text-white p-8 flex flex-col gap-8 z-10 overflow-hidden">
                    <div className="absolute top-24 left-4 w-1 h-12 rounded-full opacity-50" style={{ backgroundColor: accentColor }}></div>
                    <div className="absolute top-64 left-12 w-1 h-6 rounded-full opacity-50" style={{ backgroundColor: accentColor }}></div>
                    
                    <div className="flex justify-center mt-4">
                        <div className="w-40 h-40 rounded-full p-1 bg-white" style={{ border: `6px solid ${accentColor}` }}>
                            <img src={formData.profilePhoto || 'https://images.unsplash.com/photo-1573496359112-58394a7a511a?q=80&w=500'} alt={clean(formData.fullName)} className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>

                    <section>
                        <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: accentColor }}>
                            <UserIcon className="w-5 h-5" /> My Contact
                        </h2>
                        <div className="border-t-2 my-2" style={{ borderColor: accentColor }}></div>
                        <div className="flex flex-col gap-3 text-xs">
                            <div className="flex items-start gap-3"><LocationMarkerIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }}/><span>{clean(formData.location)}</span></div>
                            <div className="flex items-start gap-3"><PhoneIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }}/><span>{clean(formData.phone)}</span></div>
                            <div className="flex items-start gap-3"><DesktopComputerIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }}/><span>{clean(formData.portfolio)}</span></div>
                            <div className="flex items-start gap-3"><MailIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }}/><span>{clean(formData.email)}</span></div>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: accentColor }}>
                           <CogIcon className="w-5 h-5" /> My Skills
                        </h2>
                        <div className="border-t-2 my-2" style={{ borderColor: accentColor }}></div>
                        <div className="flex flex-col gap-4 text-sm">
                            {skills.map(skill => (
                                <div key={skill}>
                                    <p>{skill}</p>
                                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1 border border-white/50">
                                        <div className="h-full rounded-full" style={{ backgroundColor: accentColor, width: `${getSkillLevel(skill)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="relative w-2/3 bg-white p-10 text-[#0A2342] z-10 overflow-hidden">
                    <div className="absolute top-8 right-8 w-2 h-16 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <div className="absolute bottom-8 right-8 w-2 h-32 rounded-full" style={{ backgroundColor: accentColor }}></div>

                    <header className="mb-10">
                        <h1 className="text-5xl font-extrabold tracking-tight">{clean(formData.fullName)}</h1>
                        <p className="text-2xl font-light mt-2">{clean(formData.targetRole)}</p>
                    </header>
                    
                    <div className="flex flex-col gap-10">
                        <section>
                            <h2 className="text-xl font-bold text-white inline-flex items-center px-6 py-2 rounded-full" style={{ backgroundColor: accentColor }}>
                                <GraduationCapIcon className="w-6 h-6 mr-3" /> Education Background
                            </h2>
                            <div className="mt-6 flex flex-col gap-6 border-l-2 pl-6" style={{ borderColor: accentColor }}>
                                {formData.education.split('\n').filter(line => line.trim() !== '').map((eduLine, index) => {
                                    const parts = eduLine.split(',');
                                    const degree = clean(parts[0] || '');
                                    const university = clean(parts[1] || '');
                                    const date = clean(parts[2] || '');
                                    return (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[34px] w-4 h-4 rounded-full mt-1" style={{ backgroundColor: accentColor }}></div>
                                            <p className="font-bold text-lg">{degree}</p>
                                            <p className="text-sm">{date}</p>
                                            <div className="text-xs text-white inline-block px-2 py-0.5 rounded-full my-1 font-semibold" style={{ backgroundColor: accentColor }}>{university}</div>
                                            <p className="text-xs mt-1 text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet.</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                        
                        <section>
                             <h2 className="text-xl font-bold text-white inline-flex items-center px-6 py-2 rounded-full" style={{ backgroundColor: accentColor }}>
                                <BriefcaseIcon className="w-6 h-6 mr-3" /> Work Experience
                            </h2>
                            <div className="mt-6 flex flex-col gap-6 border-l-2 pl-6" style={{ borderColor: accentColor }}>
                                {formData.experiences.map(exp => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[34px] w-4 h-4 rounded-full mt-1" style={{ backgroundColor: accentColor }}></div>
                                        <p className="font-bold text-lg">{clean(exp.jobTitle)}</p>
                                        <p className="text-sm">{clean(exp.startDate || '')} - {clean(exp.endDate || '')}</p>
                                        <div className="text-xs text-white inline-block px-2 py-0.5 rounded-full my-1 font-semibold" style={{ backgroundColor: accentColor }}>{clean(exp.company)}</div>
                                        <p className="text-xs mt-1 text-slate-600 whitespace-pre-line">{clean(exp.description).replace(/^- /gm, '')}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernResumeTemplate;