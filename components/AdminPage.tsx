import React, { useState, useEffect, useRef } from 'react';
import type { AppView, Slide, User, TimeoutDuration, WhatsAppCampaign, WhatsAppTemplate, Page, Service, ServiceCategory, ActivityLog, Post, Category, Tag } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CogIcon } from './icons/CogIcon';
import { PresentationChartBarIcon } from './icons/PresentationChartBarIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { PlusIcon } from './icons/PlusIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { ArchiveBoxIcon } from './icons/ArchiveBoxIcon';
import { ArrowUturnLeftIcon } from './icons/ArrowUturnLeftIcon';
import { ClockIcon } from './icons/ClockIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import { TagIcon } from './icons/TagIcon';
import { ClipboardDocumentListIcon } from './icons/ClipboardDocumentListIcon';


type AdminView = 'dashboard' | 'slides' | 'users' | 'whatsapp' | 'pages' | 'services' | 'posts' | 'categories' | 'tags' | 'settings' | 'logs' | 'blueprint';

interface AdminPageProps {
    onNavigate: (view: AppView) => void;
    initialView: AppView;
    slides: Slide[]; onUpdateSlide: (slide: Slide) => void; onAddSlide: (slide: Omit<Slide, 'id' | 'order'>) => void; onDeleteSlide: (id: number) => void; onReorderSlides: (id: number, direction: 'up' | 'down') => void;
    currentUser: User; users: User[]; onUpdateUser: (user: User) => void; onDeleteUser: (id: number) => void;
    campaigns: WhatsAppCampaign[]; templates: WhatsAppTemplate[]; onApproveCampaign: (id: number) => void; onRejectCampaign: (id: number) => void;
    pages: Page[]; onAddPage: (page: Omit<Page, 'id'|'order'|'status'>) => void; onUpdatePage: (page: Page) => void; onDeletePage: (id: number) => void; onRestorePage: (id: number) => void; onReorderPages: (id: number, direction: 'up' | 'down') => void;
    services: Service[]; onAddService: (service: Omit<Service, 'id'|'order'|'status'>) => void; onUpdateService: (service: Service) => void; onDeleteService: (id: number) => void; onRestoreService: (id: number) => void; onReorderServices: (id: number, direction: 'up' | 'down') => void; serviceCategories: ServiceCategory[];
    posts: Post[]; onAddPost: (post: Omit<Post, 'id'|'createdAt'|'updatedAt'|'author'>) => void; onUpdatePost: (post: Post) => void; onDeletePost: (id: number) => void;
    categories: Category[]; onAddCategory: (cat: Omit<Category, 'id'>) => void; onUpdateCategory: (cat: Category) => void; onDeleteCategory: (id: number) => void;
    tags: Tag[]; onAddTag: (tag: Omit<Tag, 'id'>) => void; onUpdateTag: (tag: Tag) => void; onDeleteTag: (id: number) => void;
    activityLogs: ActivityLog[];
    timeoutDuration: TimeoutDuration; setTimeoutDuration: (duration: TimeoutDuration) => void;
    onLogout: (reason?: string) => void;
}

const blueprintData = [
    {
        title: "1. Dashboard",
        items: [
            { name: "Home", description: "At-a-glance site overview (posts, pages, comments, health status)." },
            { name: "Updates", description: "Core, plugins, themes updates." }
        ]
    },
    {
        title: "2. Posts",
        items: [
            { name: "All Posts", description: "View, search, edit, delete posts." },
            { name: "Add New", description: "Create new blog posts." },
            { name: "Categories", description: "Create/manage hierarchical categories." },
            { name: "Tags", description: "Create/manage tags." }
        ]
    },
    {
        title: "3. Media",
        items: [
            { name: "Library", description: "Upload, view, edit images, videos, documents." },
            { name: "Add New", description: "Upload directly." }
        ]
    },
    {
        title: "4. Pages",
        items: [
            { name: "All Pages", description: "Manage all site pages." },
            { name: "Add New", description: "Create new static pages." }
        ]
    },
    {
        title: "5. Comments",
        items: [
            { description: "Moderate, approve, reply, or delete comments." },
            { description: "Mark as spam/trash." }
        ]
    },
    {
        title: "6. Appearance",
        items: [
            { name: "Themes", description: "Install, activate, customize themes." },
            { name: "Customize", description: "Live preview of site with theme options." },
            { name: "Widgets", description: "Manage sidebar/footer widgets." },
            { name: "Menus", description: "Create and organize navigation menus." },
            { name: "Theme File Editor", description: "Edit theme PHP/CSS files." }
        ]
    },
    {
        title: "7. Plugins",
        items: [
            { name: "Installed Plugins", description: "Activate, deactivate, update, delete." },
            { name: "Add New", description: "Search and install new plugins." },
            { name: "Plugin Editor", description: "Edit plugin code." }
        ]
    },
    {
        title: "8. Users",
        items: [
            { name: "All Users", description: "Manage admins, editors, authors, subscribers." },
            { name: "Add New", description: "Add user manually." },
            { name: "Profile", description: "Manage own profile, password, and preferences." }
        ]
    },
    {
        title: "9. Tools",
        items: [
            { name: "Available Tools", description: "Import/export tools." },
            { name: "Import", description: "Import posts/pages from other platforms." },
            { name: "Export", description: "Download site content." },
            { name: "Site Health", description: "Performance/security checks." }
        ]
    },
    {
        title: "10. Settings",
        items: [
            { name: "General", description: "Site title, tagline, URL, timezone, admin email." },
            { name: "Writing", description: "Default post category, formatting." },
            { name: "Reading", description: "Homepage displays, posts per page, syndication." },
            { name: "Discussion", description: "Comment settings." },
            { name: "Media", description: "Image sizes, uploads." },
            { name: "Permalinks", description: "URL structure." },
            { name: "Privacy", description: "Privacy policy page settings." }
        ]
    },
    {
        title: "11. Custom Post Types (if enabled)",
        items: [
            { name: "E.g., WooCommerce", description: "Products, Orders, Coupons." },
            { description: "Portfolio, Testimonials, Events (via plugins/themes)." }
        ]
    },
    {
        title: "12. Advanced / Hidden",
        items: [
            { name: "Multisite (if enabled)", description: "Network Admin." },
            { description: "Custom Fields (via ACF or core editor)." },
            { description: "Gutenberg Block Editor." }
        ]
    }
];

const BlueprintContent: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Admin Panel Blueprint</h2>
            <p className="text-slate-600 mb-6">A feature map and architectural guide for the site's administration panel.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blueprintData.map(section => (
                    <div key={section.title} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <h3 className="font-bold text-slate-800 text-lg mb-3">{section.title}</h3>
                        <ul className="space-y-2 text-sm">
                            {section.items.map((item, index) => (
                                <li key={index} className="text-slate-700">
                                    {item.name ? (
                                        <>
                                            <span className="font-semibold text-slate-800">{item.name}:</span> {item.description}
                                        </>
                                    ) : (
                                        <span>{item.description}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeView, setActiveView] = useState<AdminView>(props.initialView.replace('admin-', '') as AdminView || 'dashboard');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimers = () => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (warningTimer.current) clearTimeout(warningTimer.current);
        
        if (props.timeoutDuration !== 'never') {
            const durationMs = props.timeoutDuration * 60 * 1000;
            const warningTimeMs = durationMs - (5 * 60 * 1000); 

            if (warningTimeMs > 0) {
                 warningTimer.current = setTimeout(() => setShowWarningModal(true), warningTimeMs);
            }

            idleTimer.current = setTimeout(() => {
                props.onLogout("You have been logged out due to inactivity.");
            }, durationMs);
        }
    };

    useEffect(() => {
        resetTimers();
        const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
        events.forEach(event => window.addEventListener(event, resetTimers));
        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimers));
            if (idleTimer.current) clearTimeout(idleTimer.current);
            if (warningTimer.current) clearTimeout(warningTimer.current);
        };
    }, [props.timeoutDuration]);
    
    const handleStayLoggedIn = () => {
        setShowWarningModal(false);
        resetTimers();
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardContent users={props.users} />;
            case 'slides': return <ManageSlides slides={props.slides} onUpdateSlide={props.onUpdateSlide} onAddSlide={props.onAddSlide} onDeleteSlide={props.onDeleteSlide} onReorder={props.onReorderSlides} />;
            case 'users': return <ManageUsers users={props.users} onUpdateUser={props.onUpdateUser} onDeleteUser={props.onDeleteUser} />;
            case 'whatsapp': return <ManageWhatsApp campaigns={props.campaigns} templates={props.templates} onApprove={props.onApproveCampaign} onReject={props.onRejectCampaign} />;
            case 'pages': return <ManagePages pages={props.pages} onAdd={props.onAddPage} onUpdate={props.onUpdatePage} onDelete={props.onDeletePage} onRestore={props.onRestorePage} onReorder={props.onReorderPages} currentUserRole={props.currentUser.role}/>;
            case 'services': return <ManageServices services={props.services} categories={props.serviceCategories} onAdd={props.onAddService} onUpdate={props.onUpdateService} onDelete={props.onDeleteService} onRestore={props.onRestoreService} onReorder={props.onReorderServices} currentUserRole={props.currentUser.role} />;
            case 'posts': return <ManagePosts posts={props.posts} categories={props.categories} tags={props.tags} onAdd={props.onAddPost} onUpdate={props.onUpdatePost} onDelete={props.onDeletePost} />;
            case 'categories': return <ManageCategories categories={props.categories} onAdd={props.onAddCategory} onUpdate={props.onUpdateCategory} onDelete={props.onDeleteCategory} />;
            case 'tags': return <ManageTags tags={props.tags} onAdd={props.onAddTag} onUpdate={props.onUpdateTag} onDelete={props.onDeleteTag} />;
            case 'settings': return <Settings timeoutDuration={props.timeoutDuration} setTimeoutDuration={props.setTimeoutDuration} />;
            case 'logs': return <ActivityLogs logs={props.activityLogs} />;
            case 'blueprint': return <BlueprintContent />;
            default: return <DashboardContent users={props.users}/>;
        }
    }
    
    const NavLink: React.FC<{ view: AdminView; icon: React.ElementType; children: React.ReactNode }> = ({ view, icon: Icon, children }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`flex items-center px-4 py-2.5 w-full text-left text-sm font-medium rounded-md transition-colors ${
                activeView === view ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            <Icon className="h-5 w-5 mr-3" />
            {children}
        </button>
    );

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => props.onNavigate('home')} className="mb-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Main Site
                </button>
                <div className="md:flex md:space-x-8">
                    <aside className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
                        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                            <h2 className="text-lg font-bold text-slate-800 px-4 mb-2">Admin Menu</h2>
                            <NavLink view="dashboard" icon={HomeIcon}>Dashboard</NavLink>
                            <div className="pt-2 border-t">
                                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Content</h3>
                                <NavLink view="pages" icon={DocumentDuplicateIcon}>Pages</NavLink>
                                <NavLink view="posts" icon={NewspaperIcon}>Posts</NavLink>
                                <NavLink view="categories" icon={TagIcon}>Categories</NavLink>
                                <NavLink view="tags" icon={TagIcon}>Tags</NavLink>
                            </div>
                             <div className="pt-2 border-t">
                                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Features</h3>
                                <NavLink view="services" icon={WrenchScrewdriverIcon}>Services</NavLink>
                                <NavLink view="slides" icon={PresentationChartBarIcon}>Homepage Slides</NavLink>
                                <NavLink view="whatsapp" icon={ChatBubbleLeftRightIcon}>WhatsApp Mktg</NavLink>
                            </div>
                             <div className="pt-2 border-t">
                                 <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Administration</h3>
                                <NavLink view="users" icon={UsersIcon}>Users</NavLink>
                                <NavLink view="logs" icon={ClockIcon}>Activity Logs</NavLink>
                                <NavLink view="blueprint" icon={ClipboardDocumentListIcon}>Blueprint</NavLink>
                                <NavLink view="settings" icon={CogIcon}>Settings</NavLink>
                            </div>
                        </div>
                    </aside>
                    <main className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        {renderContent()}
                    </main>
                </div>
            </div>
            {showWarningModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                        <h3 className="text-xl font-bold">Are you still there?</h3>
                        <p className="my-4">You will be logged out in 5 minutes due to inactivity.</p>
                        <button onClick={handleStayLoggedIn} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
                            Stay Logged In
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ... other sub-components
const DashboardContent: React.FC<{users: User[]}> = ({users}) => ( <div><h2 className="text-2xl font-bold text-slate-900">Dashboard</h2><p className="text-slate-600 mb-6">Welcome! Here's a summary of platform activity.</p></div>);
const ManageSlides: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Manage Slides</h2><p>Slide management UI would be here.</p></div>;
const ManageUsers: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Manage Users</h2><p>User management UI would be here.</p></div>;
const ManageWhatsApp: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Manage WhatsApp Campaigns</h2><p>WhatsApp campaign management UI would be here.</p></div>;
const Settings: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Admin Settings</h2><p>Admin settings UI would be here.</p></div>;
const ManagePages: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Page Management</h2><p>Page management UI would be here.</p></div>;
const ManageServices: React.FC<any> = () => <div><h2 className="text-2xl font-bold">Service Management</h2><p>Service management UI would be here.</p></div>;

// Blog Post Management
const ManagePosts: React.FC<{posts: Post[], categories: Category[], tags: Tag[], onAdd: any, onUpdate: any, onDelete: any}> = ({ posts, categories, tags, onAdd, onUpdate, onDelete }) => {
    return (
         <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 text-sm"><PlusIcon className="h-5 w-5"/> Add New Post</button>
            </div>
            <p className="text-slate-600">Create and manage blog posts for your website.</p>
        </div>
    )
}

// Category Management
const ManageCategories: React.FC<{categories: Category[], onAdd: any, onUpdate: any, onDelete: any}> = ({ categories, onAdd, onUpdate, onDelete }) => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            onUpdate({ ...editingCategory, name, slug });
        } else {
            onAdd({ name, slug });
        }
        setName('');
        setSlug('');
        setEditingCategory(null);
    }
    
    const handleEdit = (cat: Category) => {
        setEditingCategory(cat);
        setName(cat.name);
        setSlug(cat.slug);
    }

    const handleCancel = () => {
        setEditingCategory(null);
        setName('');
        setSlug('');
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Post Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-lg space-y-4">
                        <h3 className="font-semibold">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2 mt-1" required />
                        </div>
                         <div>
                            <label className="text-sm font-medium">Slug</label>
                            <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full border rounded p-2 mt-1" required />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">{editingCategory ? 'Update' : 'Add'}</button>
                            {editingCategory && <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg text-sm">Cancel</button>}
                        </div>
                    </form>
                </div>
                <div className="md:col-span-2">
                    <div className="space-y-2">
                        {categories.map(cat => (
                            <div key={cat.id} className="p-2 bg-white border rounded-md flex justify-between items-center">
                                <span>{cat.name}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(cat)} className="p-1 hover:bg-slate-200 rounded"><PencilSquareIcon className="h-4 w-4"/></button>
                                    <button onClick={() => onDelete(cat.id)} className="p-1 hover:bg-red-100 text-red-600 rounded"><TrashIcon className="h-4 w-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

// Tag Management (similar to categories)
const ManageTags: React.FC<{tags: Tag[], onAdd: any, onUpdate: any, onDelete: any}> = ({ tags, onAdd, onUpdate, onDelete }) => {
     return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Post Tags</h2>
            <p className="text-slate-600">Manage tags for your blog posts.</p>
        </div>
    )
}

const ActivityLogs: React.FC<{ logs: ActivityLog[] }> = ({ logs }) => { /* ... Component from previous step ... */ return <div>Logs</div>};


export default AdminPage;