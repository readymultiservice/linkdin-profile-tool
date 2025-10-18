export type AppView =
  | 'home'
  | 'instant-score'
  | 'job-match'
  | 'content-strategy'
  | 'keyword-research'
  | 'hashtag-generator'
  | 'resume-generator'
  | 'seo-analyzer'
  | 'whatsapp'
  | 'services'
  | 'guides'
  | 'blog'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'admin-login'
  | 'admin'
  | 'admin-slides'
  | 'admin-users'
  | 'admin-whatsapp'
  | 'admin-pages'
  | 'admin-services'
  | 'admin-settings'
  | 'admin-logs'
  | 'admin-posts'
  | 'admin-categories'
  | 'admin-tags'
  | 'admin-blueprint'
  | 'construction-ret-calculator'
  | 'account-settings'
  | 'marketing-toolkit'
  | 'landing-page-optimizer'
  | 'email-marketing-guide'
  | 'simple-email-sender'
  | 'crm-blueprint'
  | 'expert-resume-writer';

export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface ProfileData {
  fullName: string;
  headline: string;
  summary: string;
  experiences: Experience[];
  skills: string;
}

export interface ScoreDetail {
  score: number;
  feedback: string;
}

export interface ProfileScore {
  overall: number;
  breakdown: {
    headline: ScoreDetail;
    summary: ScoreDetail;
    experience: ScoreDetail;
    skills: ScoreDetail;
  };
}

export interface ImprovedExperience {
    originalJobTitle: string;
    improvedDescription: string;
}

export interface AnalysisResult {
  suggestions: {
    headline: string;
    summary: string;
    experiences: ImprovedExperience[];
  };
  score: ProfileScore;
}

export interface InstantScoreData {
    profileText: string;
    targetJobTitle: string;
    industry: string;
    hasPhoto: boolean;
    hasFeaturedContent: boolean;
    connectionsCount: string;
}

export interface InstantScoreDetail {
    score: number;
    feedback: string;
}

export interface ImprovementTip {
    suggestion: string;
    impact: number;
    ease: number;
}

export interface InstantScoreResult {
    overallScore: number;
    breakdown: {
        clarity: InstantScoreDetail;
        relevance: InstantScoreDetail;
        impact: InstantScoreDetail;
        keywords: InstantScoreDetail;
        completeness: InstantScoreDetail;
    };
    currentStatus: {
        strengths: string[];
        weaknesses: string[];
    };
    improvementTips: {
        headline: ImprovementTip[];
        summary: ImprovementTip[];
        experience: ImprovementTip[];
        skills: ImprovementTip[];
    };
    keywordRecommendations: string[];
    optimizedHeadlines: string[];
    optimizedSummary: string;
    comparison?: {
        summary: string;
        missingInLinkedIn: string[];
        missingInResume: string[];
    };
}

export interface FileData {
    base64: string;
    mimeType: string;
}

export interface ResumeData {
    targetJobTitle: string;
    industry: string;
}

export interface CompareData {
    profileText: string;
    targetJobTitle: string;

    industry: string;
}

export interface ActionableSuggestion {
    section: string;
    text: string;
    impact: number;
    ease: number;
}

export interface OptimizedContent {
    headlines: string[];
    summaries: string[];
    experienceBullets: string[];
}

export interface JobMatchAnalysisResult {
    overallScore: number;
    sections: {
        headline: { score: number; explanation: string };
        summary: { score: number; explanation: string };
        experience: { score: number; explanation: string };
        skills: { score: number; explanation: string };
        formatting: { score: number; explanation: string };
    };
    missingKeywords: { keyword: string; importance: 'MUST' | 'NICE-TO-HAVE' }[];
    suggestions: ActionableSuggestion[];
    optimizedContent: OptimizedContent;
    keywordPlacements: { keyword: string; place: string }[];
    atsReadiness: { check: string; status: 'Pass' | 'Fail' | 'Warn'; recommendation: string }[];
}


export interface ContentStrategyInput {
    industry: string;
    audience: string;
    goal: string;
    style: string;
}

export interface PostDraft {
    hook: string;
    body: string;
    cta: string;
    hashtags: string[];
}

export interface ContentStrategyResult {
    contentCalendar: { day: number; postType: string; topicIdea: string }[];
    trendingTopics: string[];
    postDrafts: PostDraft[];
    engagementTips: {
        postingTimes: string;
        strategies: string[];
    };
}

export interface KeywordResearchInput {
    primaryKeyword: string;
    audience: string;
    goal: string;
}

export interface ContentOutlineNode {
    heading: string;
    children?: ContentOutlineNode[];
}

export interface KeywordResearchResult {
    keywordList: {
        keyword: string;
        volume: 'Low' | 'Medium' | 'High';
        difficulty: 'Easy' | 'Medium' | 'Hard';
        intent: string;
        suggestedUse: string;
    }[];
    topKeywords: string[];
    titleSuggestions: string[];
    contentOutline: ContentOutlineNode;
    hashtags: string[];
}


export interface HashtagStrategyInput {
    topic: string;
    platform: string;
    audienceGoal: string;
    contentType: string;
}

export interface HashtagStrategyResult {
    fullHashtagList: {
        highReach: string[];
        mediumCompetition: string[];
        niche: string[];
    };
    topHashtags: string[];
    postingStrategy: {
        howMany: string;
        combination: string;
        placement: string;
    };
    emergingHashtags: string[];
}

export interface Slide {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonView: AppView;
    order: number;
    isVisible: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    imageUrl: string;
    content: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Admin' | 'Super Admin';
    plan: 'Free' | 'Pro' | 'Premium';
    status: 'Active' | 'Suspended';
    lastLogin: string;
}

export type TimeoutDuration = 30 | 60 | 120 | 'never';

export interface ConnectedAccount {
    status: 'Connected' | 'Disconnected' | 'Pending';
    number?: string;
}

export interface WhatsAppContact {
    id: number;
    name: string;
    phone: string;
    group: string;
    tags: string[];
}

export interface WhatsAppTemplate {
    id: number;
    name: string;
    content: string;
    category: string;
}

export interface WhatsAppCampaign {
    id: number;
    name: string;
    status: 'Draft' | 'Scheduled' | 'Sent' | 'Failed';
    approvalStatus: 'Pending' | 'Approved' | 'Rejected';
    recipients: number;
    sent: number;
    read: number;
    replied: number;
    createdAt: string;
    templateId: number;
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    content: string;
    menuPlacement: 'top' | 'footer' | 'none';
    isVisible: boolean;
    status: 'published' | 'draft' | 'archived';
    order: number;
}

export interface ServiceCategory {
    id: number;
    name: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    price: string;
    icon: string;
    categoryId: number;
    isFeatured: boolean;
    relatedToolView: AppView | 'none';
    status: 'published' | 'draft' | 'archived';
    order: number;
}

export interface ActivityLog {
    id: number;
    user: string;
    action: string;
    entityType: string;
    entityName: string;
    timestamp: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImageUrl: string;
  categoryId: number;
  tagIds: number[];
  author: string; // Could be userId in a real app
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
}

export interface ResumeFormData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    targetRole: string;
    summary: string;
    experiences: Experience[];
    projects: Project[];
    education: string;
    certifications: string;
    skills: string;
    languages: string;
    awards: string;
    interests: string;
    profilePhoto: string;
    coreCompetencies: string;
}

export interface EditorContact {
    id: number;
    name: string;
    role: string;
    date: string;
    avatar: string;
}