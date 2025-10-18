import React from 'react';
import type { ResumeFormData } from '../types';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

const GraphicDesignerResumeTemplate: React.FC<{ formData: ResumeFormData; fontFamily: string }> = ({ formData, fontFamily }) => {
    const fontStyle = { fontFamily: `'${fontFamily}', sans-serif` };
    const clean = (text: string | undefined) => text ? text.replace(/\[|\]/g, '').trim() : '';

    const skills = clean(formData.skills).split(',').map(s => s.trim()).filter(Boolean);
    const getSkillLevel = (skill: string) => {
        let hash = 0;
        for (let i = 0; i < skill.length; i++) {
            hash = skill.charCodeAt(i) + ((hash << 5) - hash);
        }
        return (Math.abs(hash) % 40) + 55; // between 55 and 95
    };

    const SkillBar: React.FC<{ skill: string, level: number }> = ({ skill, level }) => (
        <div>
            <p className="text-sm font-medium">{skill}</p>
            <div className="mt-1 w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#0f3f3c] h-2 rounded-full" style={{ width: `${level}%` }}></div>
            </div>
        </div>
    );
    
    const educationEntries = clean(formData.education).split('\n').map(line => {
        const [university, degree, dates] = line.split(',');
        return { university, degree, dates };
    });

    const awards = clean(formData.awards).split(',').map(line => {
        const [competition, details] = line.split(',');
        return { competition, details };
    });

    return (
        <div className="flex w-full h-full bg-white font-sans text-slate-800" style={fontStyle}>
            {/* Left Column */}
            <div className="w-[35%] bg-[#0f3f3c] text-white p-6 flex flex-col gap-10">
                <section className="mt-[200px]">
                    <h2 className="text-xl font-bold bg-[#145a55] px-4 py-2 rounded-full inline-block -ml-2 shadow-md">Contact</h2>
                    <div className="mt-4 space-y-3 text-sm">
                        {formData.phone && <div className="flex items-center gap-3"><PhoneIcon className="w-4 h-4" /><span>{formData.phone}</span></div>}
                        {formData.email && <div className="flex items-center gap-3"><MailIcon className="w-4 h-4" /><span>{formData.email}</span></div>}
                        {formData.portfolio && <div className="flex items-center gap-3"><GlobeAltIcon className="w-4 h-4" /><span>{formData.portfolio}</span></div>}
                        {formData.location && <div className="flex items-center gap-3"><LocationMarkerIcon className="w-4 h-4" /><span>{formData.location}</span></div>}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-xl font-bold bg-[#145a55] px-4 py-2 rounded-full inline-block -ml-2 shadow-md">Education</h2>
                    <div className="mt-4 space-y-4 text-sm">
                        {educationEntries.map((edu, i) => (
                            <div key={i}>
                                <h3 className="font-bold">{edu.university}</h3>
                                <p className="text-white/80">{edu.degree}</p>
                                <p className="text-white/80 text-xs">{edu.dates}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-xl font-bold bg-[#145a55] px-4 py-2 rounded-full inline-block -ml-2 shadow-md">Award</h2>
                    <div className="mt-4 space-y-4 text-sm">
                        {awards.map((award, i) => (
                             <div key={i}>
                                <h3 className="font-bold">{award.competition}</h3>
                                <p className="text-white/80">{award.details}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column with Header overlap */}
            <div className="w-[65%] bg-white relative">
                <div className="absolute top-0 left-[-17.5%] w-[117.5%] h-64 bg-[#0f3f3c] z-0"></div>
                
                <div className="relative z-10">
                    <div className="absolute top-6 left-[-95px] w-48 h-48">
                        <div className="absolute inset-0 bg-[#145a55] rounded-full transform -rotate-45">
                             <div className="absolute inset-[12px] bg-[#0f3f3c] rounded-full"></div>
                        </div>
                        <img src={formData.profilePhoto} alt={formData.fullName} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[152px] h-[152px] rounded-full object-cover border-4 border-white" />
                    </div>
                    
                    <div className="pl-[75px] pt-10 pb-8 text-white bg-[#0f3f3c]">
                        <h1 className="text-4xl font-extrabold tracking-wide">{formData.fullName.toUpperCase()}</h1>
                        <p className="text-2xl font-light mt-1">{formData.targetRole}</p>
                        <hr className="w-1/4 my-4 border-white/50" />
                        <p className="text-sm leading-relaxed">{formData.summary}</p>
                    </div>

                    <div className="p-8 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold bg-[#0f3f3c] text-white px-5 py-2 rounded-full inline-block shadow-md">Work Experience</h2>
                            <div className="mt-4 space-y-5">
                                {formData.experiences.map(exp => (
                                    <div key={exp.id}>
                                        <h3 className="font-bold text-lg">{exp.company} ({exp.startDate} - {exp.endDate})</h3>
                                        <p className="font-semibold text-md text-slate-600">{exp.jobTitle}</p>
                                        <ul className="list-disc list-inside text-sm mt-1 pl-4 space-y-1">
                                            {clean(exp.description).split('\n').map((line, i) => <li key={i}>{line.replace(/•\s*/, '')}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold bg-[#0f3f3c] text-white px-5 py-2 rounded-full inline-block shadow-md">Skills</h2>
                            <div className="mt-4 space-y-4">
                                {skills.map(skill => <SkillBar key={skill} skill={skill} level={getSkillLevel(skill)} />)}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphicDesignerResumeTemplate;
