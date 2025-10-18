import React, { useState, useEffect } from 'react';
import type { AppView, BlogPost, Slide, User, TimeoutDuration, ConnectedAccount, WhatsAppContact, WhatsAppCampaign, WhatsAppTemplate, Page, Service, ServiceCategory, ActivityLog, Post, Category, Tag } from './types';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InstantScorePage from './components/InstantScorePage';
import JobMatchAnalyzerPage from './components/JobMatchAnalyzerPage';
import LinkedInContentStrategistPage from './components/LinkedInContentStrategistPage';
import KeywordResearchPage from './components/KeywordResearchPage';
import HashtagGeneratorPage from './components/HashtagGeneratorPage';
import ResumeGeneratorPage from './components/ResumeGeneratorPage';
import SeoAnalyzerPage from './components/SeoAnalyzerPage';
import WhatsAppPage from './components/WhatsAppPage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import GuidesPage from './components/GuidesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPage from './components/AdminPage';
import AccountSettingsPage from './components/AccountSettingsPage';
import ConstructionRetCalculatorPage from './components/ConstructionRetCalculatorPage';
import MarketingToolkitPage from './components/MarketingToolkitPage';
import FunnelBuilderPage from './components/FunnelBuilderPage';
import EmailMarketingGuidePage from './components/EmailMarketingGuidePage';
import SimpleEmailSenderPage from './components/SimpleEmailSenderPage';
import CrmBlueprintPage from './components/CrmBlueprintPage';
import ExpertResumeWriterPage from './components/ExpertResumeWriterPage';

// Mock Data
const initialSlides: Slide[] = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=2070', title: 'Transform Your Career with AI', subtitle: 'Get instant, data-driven feedback on your LinkedIn profile and resume to stand out to recruiters.', buttonText: 'Get a Free Profile Score', buttonView: 'instant-score', order: 1, isVisible: true, },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070', title: 'Land Your Dream Job Faster', subtitle: 'Our Job Match Analyzer compares your profile to job descriptions and shows you how to improve.', buttonText: 'Analyze Job Match', buttonView: 'job-match', order: 2, isVisible: true, },
];
const initialUsers: User[] = [ { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', plan: 'Premium', status: 'Active', lastLogin: '2023-10-27' }, { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'User', plan: 'Pro', status: 'Active', lastLogin: '2023-10-26' }, ];
const initialPages: Page[] = [ { id: 1, title: 'Home', slug: '/', seoTitle: 'AI Career & LinkedIn Tools', seoDescription: '...', seoKeywords: 'linkedin, resume, ai', content: 'Welcome page content', menuPlacement: 'top', isVisible: true, status: 'published', order: 1 }, { id: 2, title: 'About Us', slug: '/about', seoTitle: 'About ProfilePilot AI', seoDescription: '...', seoKeywords: 'about us, career tools', content: 'About page content', menuPlacement: 'top', isVisible: true, status: 'published', order: 2 }, { id: 3, title: 'Privacy Policy', slug: '/privacy', seoTitle: 'Privacy Policy', seoDescription: '...', seoKeywords: 'privacy, legal', content: 'Privacy policy content', menuPlacement: 'footer', isVisible: true, status: 'published', order: 3 }, ];
const initialServiceCategories: ServiceCategory[] = [ { id: 1, name: 'Resume Tools' }, { id: 2, name: 'Marketing Tools' }, { id: 3, name: 'Analytics' }, ];
const initialServices: Service[] = [ { id: 1, name: 'Instant Profile Score', description: 'Get an instant AI score for your profile.', price: 'Free', icon: 'SparklesIcon', categoryId: 1, isFeatured: true, relatedToolView: 'instant-score', status: 'published', order: 1 }, { id: 2, name: 'WhatsApp Marketing', description: 'Send bulk messages from your own number.', price: '$29/mo', icon: 'WhatsAppIcon', categoryId: 2, isFeatured: true, relatedToolView: 'whatsapp', status: 'published', order: 2 }, ];
const mockContacts: WhatsAppContact[] = [ { id: 1, name: 'John Doe', phone: '+15550001111', group: 'Leads', tags: ['potential', 'follow-up'] }, { id: 2, name: 'Jane Smith', phone: '+15552223333', group: 'Customers', tags: ['active'] }, ];
const mockTemplates: WhatsAppTemplate[] = [ { id: 1, name: 'job_alert_1', content: 'Hi {{1}}, new job alert: {{2}} at {{3}}. Apply: {{4}}', category: 'Notification' }, { id: 2, name: 'promo_q4', content: 'Special offer for you, {{1}}! Get 20% off our Pro plan this week.', category: 'Promotion' }, ];
const mockCampaigns: WhatsAppCampaign[] = [ { id: 1, name: 'Q4 Promo', status: 'Sent', approvalStatus: 'Approved', recipients: 150, sent: 148, read: 120, replied: 15, createdAt: '2023-10-25', templateId: 2 }, { id: 2, name: 'New Feature Launch', status: 'Draft', approvalStatus: 'Pending', recipients: 250, sent: 0, read: 0, replied: 0, createdAt: '2023-10-28', templateId: 1 }, ];
const initialCategories: Category[] = [ { id: 1, name: 'Profile Optimization', slug: 'profile-optimization' }, { id: 2, name: 'Resume Tips', slug: 'resume-tips' } ];
const initialTags: Tag[] = [ { id: 1, name: 'AI', slug: 'ai' }, { id: 2, name: 'LinkedIn', slug: 'linkedin' } ];
const initialPosts: Post[] = [ { id: 1, title: '5 AI-Powered Secrets to a LinkedIn Headline', slug: 'ai-linkedin-headline', content: 'Full blog post content here...', excerpt: 'Your headline is the most important part of your profile. Learn how to use AI...', featuredImageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000', categoryId: 1, tagIds: [1, 2], author: 'Jane Doe', status: 'published', createdAt: '2023-10-26', updatedAt: '2023-10-26' } ];


const App: React.FC = () => {
    const [view, setView] = useState<AppView>('home');
    const [selectedBlogPost, setSelectedBlogPost] = useState<Post | null>(null);
    const [loginMessage, setLoginMessage] = useState<string | null>(null);

    // Admin state
    const [slides, setSlides] = useState<Slide[]>(initialSlides);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [timeoutDuration, setTimeoutDuration] = useState<TimeoutDuration>(60);
    const [pages, setPages] = useState<Page[]>(initialPages);
    const [services, setServices] = useState<Service[]>(initialServices);
    const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(initialServiceCategories);
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [tags, setTags] = useState<Tag[]>(initialTags);
    
    // Activity Log Handler
    const logActivity = (action: string, entityType: string, entityName: string) => {
        const newLog: ActivityLog = { id: Date.now(), user: 'Admin User', action, entityType, entityName, timestamp: new Date().toISOString() };
        setActivityLogs(prev => [newLog, ...prev]);
    };

    // Admin handlers
    const handleUpdateSlide = (updatedSlide: Slide) => setSlides(slides.map(s => s.id === updatedSlide.id ? updatedSlide : s));
    const handleAddSlide = (newSlide: Omit<Slide, 'id' | 'order'>) => setSlides([...slides, { ...newSlide, id: Date.now(), order: slides.length + 1 }]);
    const handleDeleteSlide = (id: number) => setSlides(slides.filter(s => s.id !== id));
    const handleReorderSlides = (id: number, direction: 'up' | 'down') => console.log("Reordering slide", id, direction);
    const handleUpdateUser = (updatedUser: User) => setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    const handleDeleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));
    const handleApproveCampaign = (id: number) => setCampaigns(campaigns.map(c => c.id === id ? { ...c, approvalStatus: 'Approved' } : c));
    const handleRejectCampaign = (id: number) => setCampaigns(campaigns.map(c => c.id === id ? { ...c, approvalStatus: 'Rejected' } : c));
    const handleAddPage = (newPage: Omit<Page, 'id' | 'order' | 'status'>) => { const createdPage = { ...newPage, id: Date.now(), order: pages.length + 1, status: 'published' as const }; setPages([...pages, createdPage]); logActivity('Created Page', 'Page', createdPage.title); };
    const handleUpdatePage = (updatedPage: Page) => { setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p)); logActivity('Updated Page', 'Page', updatedPage.title); };
    const handleDeletePage = (id: number) => { const page = pages.find(p => p.id === id); if (!page) return; setPages(pages.map(p => p.id === id ? { ...p, status: 'archived' } : p)); logActivity('Archived Page', 'Page', page.title); };
    const handleRestorePage = (id: number) => { const page = pages.find(p => p.id === id); if (!page) return; setPages(pages.map(p => p.id === id ? { ...p, status: 'published' } : p)); logActivity('Restored Page', 'Page', page.title); }
    const handleReorderPages = (id: number, direction: 'up' | 'down') => console.log("Reorder page", id, direction);
    const handleAddService = (newService: Omit<Service, 'id' | 'order' | 'status'>) => { const createdService = { ...newService, id: Date.now(), order: services.length + 1, status: 'published' as const }; setServices([...services, createdService]); logActivity('Created Service', 'Service', createdService.name); };
    const handleUpdateService = (updatedService: Service) => { setServices(services.map(s => s.id === updatedService.id ? updatedService : s)); logActivity('Updated Service', 'Service', updatedService.name); };
    const handleDeleteService = (id: number) => { const service = services.find(s => s.id === id); if (!service) return; setServices(services.map(s => s.id === id ? { ...s, status: 'archived' } : s)); logActivity('Archived Service', 'Service', service.name); };
    const handleRestoreService = (id: number) => { const service = services.find(s => s.id === id); if (!service) return; setServices(services.map(s => s.id === id ? { ...s, status: 'published' } : s)); logActivity('Restored Service', 'Service', service.name); }
    const handleReorderServices = (id: number, direction: 'up' | 'down') => console.log("Reorder service", id, direction);

    // Blog CMS Handlers
    const handleAddPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => { const newPost = { ...post, id: Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), author: 'Admin User' }; setPosts([...posts, newPost]); logActivity('Created Post', 'Post', newPost.title); };
    const handleUpdatePost = (updatedPost: Post) => { setPosts(posts.map(p => p.id === updatedPost.id ? { ...updatedPost, updatedAt: new Date().toISOString() } : p)); logActivity('Updated Post', 'Post', updatedPost.title); };
    const handleDeletePost = (id: number) => { const post = posts.find(p => p.id === id); if(post) { setPosts(posts.filter(p => p.id !== id)); logActivity('Deleted Post', 'Post', post.title); }};
    const handleAddCategory = (cat: Omit<Category, 'id'>) => { const newCat = { ...cat, id: Date.now() }; setCategories([...categories, newCat]); logActivity('Created Category', 'Category', newCat.name); };
    const handleUpdateCategory = (updatedCat: Category) => { setCategories(categories.map(c => c.id === updatedCat.id ? updatedCat : c)); logActivity('Updated Category', 'Category', updatedCat.name); };
    const handleDeleteCategory = (id: number) => { const cat = categories.find(c => c.id === id); if(cat) { setCategories(categories.filter(c => c.id !== id)); logActivity('Deleted Category', 'Category', cat.name); }};
    const handleAddTag = (tag: Omit<Tag, 'id'>) => { const newTag = { ...tag, id: Date.now() }; setTags([...tags, newTag]); logActivity('Created Tag', 'Tag', newTag.name); };
    const handleUpdateTag = (updatedTag: Tag) => { setTags(tags.map(t => t.id === updatedTag.id ? updatedTag : t)); logActivity('Updated Tag', 'Tag', updatedTag.name); };
    const handleDeleteTag = (id: number) => { const tag = tags.find(t => t.id === id); if(tag) { setTags(tags.filter(t => t.id !== id)); logActivity('Deleted Tag', 'Tag', tag.name); }};


    // WhatsApp State
    const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount>({ status: 'Disconnected' });
    const [contacts, setContacts] = useState<WhatsAppContact[]>(mockContacts);
    const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>(mockCampaigns);
    const [templates, setTemplates] = useState<WhatsAppTemplate[]>(mockTemplates);
    
    const handleNavigate = (newView: AppView) => { setView(newView); window.scrollTo(0, 0); };
    const handleSelectPost = (post: Post) => { setSelectedBlogPost(post); handleNavigate('blog'); };
    const handleBackToBlog = () => { setSelectedBlogPost(null); }
    const handleLogout = (reason?: string) => { if (reason) { setLoginMessage(reason); } handleNavigate('login'); }
    
    const renderView = () => {
        if (view === 'blog' && selectedBlogPost) {
            return <BlogPostPage post={selectedBlogPost} onBack={handleBackToBlog} />;
        }

        switch (view) {
            case 'home': return <HomePage onNavigate={handleNavigate} slides={slides.filter(s => s.isVisible).sort((a,b) => a.order - b.order)} />;
            case 'instant-score': return <InstantScorePage onBack={() => handleNavigate('home')} />;
            case 'job-match': return <JobMatchAnalyzerPage onBack={() => handleNavigate('home')} />;
            case 'content-strategy': return <LinkedInContentStrategistPage onBack={() => handleNavigate('home')} />;
            case 'keyword-research': return <KeywordResearchPage onBack={() => handleNavigate('home')} />;
            case 'hashtag-generator': return <HashtagGeneratorPage onBack={() => handleNavigate('home')} />;
            case 'resume-generator': return <ResumeGeneratorPage onBack={() => handleNavigate('home')} />;
            case 'construction-ret-calculator': return <ConstructionRetCalculatorPage onBack={() => handleNavigate('home')} />;
            case 'seo-analyzer': return <SeoAnalyzerPage onBack={() => handleNavigate('home')} />;
            case 'whatsapp': return <WhatsAppPage onBack={() => handleNavigate('home')} connectedAccount={connectedAccount} onConnect={(number) => setConnectedAccount({ status: 'Connected', number })} onDisconnect={() => setConnectedAccount({ status: 'Disconnected' })} contacts={contacts} campaigns={campaigns} onAddContact={(contact) => setContacts(prev => [...prev, { ...contact, id: Date.now() }])} onCreateCampaign={(campaign) => setCampaigns(prev => [...prev, { ...campaign, id: Date.now(), status: 'Draft', approvalStatus: 'Pending', recipients: 0, sent: 0, read: 0, replied: 0, createdAt: new Date().toISOString().split('T')[0] }])} />;
            case 'marketing-toolkit': return <MarketingToolkitPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
            case 'landing-page-optimizer': return <FunnelBuilderPage onBack={() => handleNavigate('marketing-toolkit')} />;
            case 'email-marketing-guide': return <EmailMarketingGuidePage onBack={() => handleNavigate('marketing-toolkit')} />;
            case 'simple-email-sender': return <SimpleEmailSenderPage onBack={() => handleNavigate('marketing-toolkit')} />;
            case 'crm-blueprint': return <CrmBlueprintPage onBack={() => handleNavigate('marketing-toolkit')} />;
            case 'expert-resume-writer': return <ExpertResumeWriterPage onBack={() => handleNavigate('home')} />;
            case 'services': return <ServicesPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
            case 'about': return <AboutPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
            case 'pricing': return <PricingPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
            case 'contact': return <ContactPage onBack={() => handleNavigate('home')} />;
            case 'blog': return <BlogPage posts={posts.filter(p => p.status === 'published')} categories={categories} onBack={() => handleNavigate('home')} onSelectPost={handleSelectPost} />;
            case 'guides': return <GuidesPage onBack={() => handleNavigate('home')} />;
            case 'login': return <LoginPage onNavigate={handleNavigate} message={loginMessage} onMessageShown={() => setLoginMessage(null)} />;
            case 'signup': return <SignupPage onNavigate={handleNavigate} />;
            case 'forgot-password': return <ForgotPasswordPage onNavigate={handleNavigate} />;
            case 'reset-password': return <ResetPasswordPage onNavigate={handleNavigate} />;
            case 'admin-login': return <AdminLoginPage onNavigate={handleNavigate} />;
            case 'admin':
            case 'admin-slides':
            case 'admin-users':
            case 'admin-whatsapp':
            case 'admin-pages':
            case 'admin-services':
            case 'admin-posts':
            case 'admin-categories':
            case 'admin-tags':
            case 'admin-settings':
            case 'admin-logs':
            case 'admin-blueprint':
                 return <AdminPage 
                    onNavigate={handleNavigate}
                    initialView={view}
                    slides={slides} onUpdateSlide={handleUpdateSlide} onAddSlide={handleAddSlide} onDeleteSlide={handleDeleteSlide} onReorderSlides={handleReorderSlides}
                    currentUser={users[0]} users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser}
                    campaigns={campaigns} templates={templates} onApproveCampaign={handleApproveCampaign} onRejectCampaign={handleRejectCampaign}
                    pages={pages} onAddPage={handleAddPage} onUpdatePage={handleUpdatePage} onDeletePage={handleDeletePage} onRestorePage={handleRestorePage} onReorderPages={handleReorderPages}
                    services={services} onAddService={handleAddService} onUpdateService={handleUpdateService} onDeleteService={handleDeleteService} onRestoreService={handleRestoreService} onReorderServices={handleReorderServices} serviceCategories={serviceCategories}
                    posts={posts} onAddPost={handleAddPost} onUpdatePost={handleUpdatePost} onDeletePost={handleDeletePost}
                    categories={categories} onAddCategory={handleAddCategory} onUpdateCategory={handleUpdateCategory} onDeleteCategory={handleDeleteCategory}
                    tags={tags} onAddTag={handleAddTag} onUpdateTag={handleUpdateTag} onDeleteTag={handleDeleteTag}
                    activityLogs={activityLogs}
                    timeoutDuration={timeoutDuration} setTimeoutDuration={setTimeoutDuration} onLogout={handleLogout}
                />;
            case 'account-settings': return <AccountSettingsPage onBack={() => handleNavigate('home')} onLogout={handleLogout} />;
            default: return <HomePage onNavigate={handleNavigate} slides={slides} />;
        }
    };
    
    const noHeaderFooterViews: AppView[] = ['login', 'signup', 'forgot-password', 'reset-password', 'admin-login', 'resume-generator'];
    const showHeaderFooter = !noHeaderFooterViews.includes(view);

    return (
        <div className="flex flex-col min-h-screen">
            {showHeaderFooter && <Header onNavigate={handleNavigate} />}
            <main className="flex-grow">
                {renderView()}
            </main>
            {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
        </div>
    );
}

export default App;