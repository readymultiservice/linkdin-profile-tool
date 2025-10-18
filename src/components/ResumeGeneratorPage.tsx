
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Experience, Project, ResumeFormData, EditorContact } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import ModernResumeTemplate from './ModernResumeTemplate';
import ClassicResumeTemplate from './ClassicResumeTemplate';
import ProfessionalResumeTemplate from './ProfessionalResumeTemplate';
import CreativeResumeTemplate from './CreativeResumeTemplate';
import CorporateResumeTemplate from './CorporateResumeTemplate';
import SidebarResumeTemplate from './SidebarResumeTemplate';
import GraphicDesignerResumeTemplate from './GraphicDesignerResumeTemplate';
import ExecutiveResumeTemplate from './ExecutiveResumeTemplate';
import { HomeIcon } from './icons/HomeIcon';
import { LayoutIcon } from './icons/LayoutIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { FolderIcon } from './icons/FolderIcon';
import { PencilAltIcon } from './icons/PencilAltIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { DocumentReportIcon } from './icons/DocumentReportIcon';
import { ShareIcon } from './icons/ShareIcon';
import { EyeIcon } from './icons/EyeIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { SearchIcon } from './icons/SearchIcon';


const mockContacts: EditorContact[] = [
    { id: 1, name: 'Crett Mai Vcess', role: 'Chisiao lis', date: 'Date 2/10/14', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Chispaio Belvety', role: 'Frose 27 2017', date: 'Date 2/10/14', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Ulsry Brown Loget', role: 'Dars 3 2011', date: 'Octer 3 1001', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Becily Seswoss', role: 'Dan 21011', date: 'Triplon Elidges', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Mamey Wisher', role: 'Ochat Schiare', date: 'Date 3/10/15', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Ennyoring Al Nothien', role: 'Carpr 2013', date: 'Cboot Enchies', avatar: 'https://i.pravatar.cc/150?img=6' },
];

type TemplateName = 'modern' | 'classic' | 'professional' | 'creative' | 'corporate' | 'sidebar' | 'graphic-designer' | 'executive';

const templates: { id: TemplateName; name: string; thumbnail: string }[] = [
    { id: 'executive', name: 'Executive', thumbnail: 'https://i.imgur.com/3I6Yg2H.png' },
    { id: 'modern', name: 'Modern', thumbnail: 'https://i.imgur.com/2m6aWJc.png' },
    { id: 'graphic-designer', name: 'Designer', thumbnail: 'https://i.imgur.com/zWz5v3u.png' },
    { id: 'sidebar', name: 'Sidebar', thumbnail: 'https://i.imgur.com/8x8Y3aQ.png' },
    { id: 'classic', name: 'Classic', thumbnail: 'https://i.imgur.com/qCaL8J6.png' },
    { id: 'professional', name: 'Professional', thumbnail: 'https://i.imgur.com/bT4h5rS.png' },
    { id: 'creative', name: 'Creative', thumbnail: 'https://i.imgur.com/7bFASr7.png' },
    { id: 'corporate', name: 'Corporate', thumbnail: 'https://i.imgur.com/r6mG2K8.png' },
];


const ResumeGeneratorPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [template, setTemplate] = useState<TemplateName>('executive');
    const [accentColor, setAccentColor] = useState('#2F6BFF');
    const [fontFamily, setFontFamily] = useState('Inter');
    const [formData, setFormData] = useState<ResumeFormData>({
        fullName: 'Drsin Jeh Resume',
        targetRole: 'Prepleas Scimmar',
        phone: '123-456-7890',
        email: 'drisin.jeh@example.com',
        linkedin: 'linkedin.com/in/drisinjeh',
        location: 'City, State',
        portfolio: 'drisinjeh.com',
        summary: "A brief summary about Drsin Jeh's professional background, highlighting key skills and career goals. This section aims to provide a quick overview for recruiters.",
        experiences: [
            { id: 1, jobTitle: 'Sunger Vlars', company: 'Tech Solutions Inc.', startDate: 'Jan 2020', endDate: 'Present', description: '• Led a team in developing scalable web applications.\n• Improved application performance by 30%.' },
            { id: 2, jobTitle: 'FYRLLR CE PLMLINGS', company: 'Innovate Co.', startDate: 'Jun 2018', endDate: 'Dec 2019', description: '• Designed and implemented new features for the main product.\n• Collaborated with cross-functional teams.' },
        ],
        education: "Vellnas Sstinets - University of Technology, 2018",
        skills: 'JavaScript, React, Node.js, SQL, Project Management',
        languages: 'English, Spanish',
        certifications: 'Certified Web Developer, 2019',
        awards: 'Employee of the Year, 2021',
        projects: [
            { id: 1, name: 'Personal Portfolio', description: 'A personal website to showcase projects.', link: 'drisinjeh.com' }
        ],
        interests: 'Hiking, Photography, Reading',
        profilePhoto: 'https://i.pravatar.cc/150?img=8',
        coreCompetencies: ''
    });

    const resumePreviewRef = useRef<HTMLDivElement>(null);
    
    // Form handlers can be added here if needed for interactivity in sidebars

    const downloadPDF = () => {
        const input = resumePreviewRef.current;
        if (input) {
            const a4_width_px = 794;
            html2canvas(input, { scale: 2, width: a4_width_px, height: input.scrollHeight }).then((canvas: any) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${formData.fullName.replace(/\s/g, '_')}_Resume.pdf`);
            });
        }
    };

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernResumeTemplate formData={formData} accentColor={accentColor} fontFamily={fontFamily} />;
            case 'classic':
                return <ClassicResumeTemplate formData={formData} accentColor={accentColor} fontFamily={fontFamily} />;
            case 'professional':
                return <ProfessionalResumeTemplate formData={formData} fontFamily={fontFamily} />;
            case 'creative':
                return <CreativeResumeTemplate formData={formData} accentColor={accentColor} fontFamily={fontFamily} />;
            case 'corporate':
                return <CorporateResumeTemplate formData={formData} fontFamily={fontFamily} />;
            case 'sidebar':
                return <SidebarResumeTemplate formData={formData} fontFamily={fontFamily} />;
            case 'graphic-designer':
                return <GraphicDesignerResumeTemplate formData={formData} fontFamily={fontFamily} />;
            case 'executive':
                return <ExecutiveResumeTemplate formData={formData} fontFamily={fontFamily} />;
            default:
                return <ExecutiveResumeTemplate formData={formData} fontFamily={fontFamily} />;
        }
    };


    return (
        <div className="flex flex-col h-screen bg-slate-100 text-slate-800 font-sans text-sm">
            {/* Top Header */}
            <header className="flex-shrink-0 bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-1 rounded-md hover:bg-slate-100"><HomeIcon className="h-6 w-6 text-slate-600" /></button>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Hanepples</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-500">Alocuts</span>
                         <span className="text-slate-400">/</span>
                        <span className="text-slate-500">Cobral</span>
                    </div>
                </div>
                <div className="flex-1 max-w-md mx-4">
                     <div className="relative">
                        <input type="search" placeholder="Log Tines" className="w-full bg-slate-100 border-none rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon className="h-5 w-5 text-slate-400" /></div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-100">Resural</button>
                    <button onClick={downloadPDF} className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-100 flex items-center gap-1"><EyeIcon className="h-4 w-4"/>Download</button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Anity Comel</button>
                    <UserCircleIcon className="h-8 w-8 text-slate-500"/>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Vertical Nav */}
                <nav className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600"><LayoutIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><DatabaseIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><FolderIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><PencilAltIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><BookmarkIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><DocumentReportIcon className="h-6 w-6"/></button>
                    <div className="flex-grow"></div>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><ShareIcon className="h-6 w-6"/></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><TrashIcon className="h-6 w-6"/></button>
                </nav>

                {/* Left Sidebar */}
                <aside className="w-72 bg-white p-4 overflow-y-auto border-r border-slate-200">
                    <div className="space-y-6">
                       <section>
                            <h3 className="font-semibold mb-2">Templates</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {templates.map(t => (
                                    <button key={t.id} onClick={() => setTemplate(t.id)} className={`border-2 rounded-md overflow-hidden transition-all ${template === t.id ? 'border-blue-500' : 'border-transparent hover:border-blue-300'}`}>
                                        <img src={t.thumbnail} alt={`${t.name} template thumbnail`} className="w-full h-auto aspect-[10/14] object-cover object-top" />
                                        <span className="block text-xs text-center py-1 bg-slate-100">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                        <section>
                            <h3 className="font-semibold mb-2">Customization</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="accentColor" className="text-sm font-medium">Accent Color</label>
                                    <input type="color" id="accentColor" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-full h-8 p-1 border border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="fontFamily" className="text-sm font-medium">Font Family</label>
                                    <select id="fontFamily" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full border rounded p-2 mt-1 text-sm bg-white">
                                        <option value="Inter">Inter (Sans-serif)</option>
                                        <option value="Lato">Lato (Sans-serif)</option>
                                        <option value="Merriweather">Merriweather (Serif)</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-semibold mb-2">Framor</h3>
                            <div className="flex items-center gap-4 p-2 border rounded-lg">
                                <img src={formData.profilePhoto} className="w-16 h-16 rounded-full object-cover"/>
                                <div>
                                    <h4 className="font-bold">Drsin Juin Resume</h4>
                                    <p className="text-xs text-slate-500">Prepleas Scimmar</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </aside>

                {/* Center Canvas */}
                <main className="flex-1 p-8 overflow-y-auto">
                     <div className="max-w-[850px] mx-auto">
                        <div ref={resumePreviewRef} className="w-[210mm] min-h-[297mm] shadow-2xl bg-white mx-auto border">
                             {renderTemplate()}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-72 bg-white p-4 overflow-y-auto border-l border-slate-200">
                     <h3 className="font-semibold mb-4">Gragrations</h3>
                     <div className="space-y-3">
                        {mockContacts.slice(0, 5).map(contact => (
                            <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-sm">{contact.name}</p>
                                    <p className="text-xs text-slate-500">{contact.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <h3 className="font-semibold my-4">Baten Produes</h3>
                     <div className="space-y-3">
                        {mockContacts.slice(5).map(contact => (
                            <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-sm">{contact.name}</p>
                                    <p className="text-xs text-slate-500">{contact.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ResumeGeneratorPage;
