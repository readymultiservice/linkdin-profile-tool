import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface EmailMarketingGuidePageProps {
  onBack: () => void;
}

const EmailMarketingGuidePage: React.FC<EmailMarketingGuidePageProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to Marketing Toolkit
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Email Marketing Automation: Strategy & Copy Guide</h1>
            <p className="mt-4 text-lg text-slate-600">A comprehensive AI prompt to generate a complete email marketing plan, from strategy to execution.</p>
        </header>

        <GuideSection title="The Master Prompt for Email Marketing Strategy">
          <p>Use this detailed prompt with a powerful AI model (like Gemini) to generate a robust email marketing and automation strategy tailored to your business needs.</p>
          <PromptBlock>
{`I want you to act as an email marketing & automation expert. I am launching/promoting [Product / Service / Offer] aimed at [Target Audience: describe demographics, interests, pain‐points, behavior]. I need you to help me build a complete email marketing plan including:

1. Key objectives (e.g. awareness, lead generation, sales, retention) and metrics to track.
2. Segmentation strategy – how to divide my audience (e.g. by behavior, purchase history, engagement, demographics).
3. Automation flow(s) / sequence(s) – triggered emails from subscribe / cart abandonment / post-purchase / re‐engagement etc. For each flow, propose timing (when each email is sent), content type, subject line, body copy structure, CTA.
4. Personalization ideas – what personalization tokens or dynamic content should be used (e.g. name, past purchase, location, behavior).
5. Best practices for subject lines, send times, frequency, deliverability, avoiding spam.
6. A/B testing ideas: subject lines, content, send time, offers.
7. A sample of 2-3 email templates for key emails: Welcome email, Cart Abandonment, Post-Purchase / Thank you, Re-engagement.
8. Tools / platforms recommendation & how to integrate (e.g. which email service provider, what automation features, what analytics).

Use a tone that reflects [choose tone: e.g. friendly, professional, casual, authoritative], aligned with my brand which is [describe brand style / values]. Also, consider [any constraints: budget, frequency, compliance (GDPR etc), international / time‐zone issues].

Please deliver the plan, the flow diagrams (if possible in text), subject lines, and sample emails.`}
          </PromptBlock>
        </GuideSection>

        <GuideSection title="Why This Prompt is Effective">
            <ul className="list-disc list-inside space-y-2 text-black">
                <li><strong>Comprehensive Coverage:</strong> It covers both high-level strategy (objectives, segmentation) and tactical execution (copy, content, flows).</li>
                <li><strong>Forces Clarity:</strong> It requires you to define your audience, tone, and brand constraints, ensuring the AI's output is highly tailored.</li>
                <li><strong>Action-Oriented:</strong> The prompt asks for multiple essential automation flows like welcome series, cart abandonment, and re-engagement campaigns.</li>
                <li><strong>Focus on Optimization:</strong> By including A/B testing and best practices, it sets you up for continuous performance improvement.</li>
                <li><strong>Practical & Adaptable:</strong> It requests personalization ideas and tool recommendations, making the strategy actionable and adaptable to your specific tech stack.</li>
            </ul>
        </GuideSection>

        <GuideSection title="Example: How to Use the Prompt">
          <p>Here’s an example of how you might fill in the bracketed information for a fictional online photography course, followed by a sample of the AI's potential output.</p>
          <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Filled-in Prompt Example</h3>
          <PromptBlock>
{`I am promoting an online course for beginners to learn digital photography. My target audience is aged 25-45, mostly hobbyists, interested in travel & nature photography, who have little formal training but want to improve.

1. My objectives are: get more signups for the free preview → convert to paid; reduce cart abandonment; increase lifetime value. Track metrics like open rate, click-through rate, conversion rate, churn.
2. Segment by: (a) new subscribers who haven’t purchased, (b) customers who bought the free preview, (c) customers who bought full course, (d) inactive subscribers.
3. Automation flows:
   a) Welcome flow: 3 emails over first week.
   b) Cart abandonment: reminder after 4 hours; follow up next day with benefit comparison; final reminder 3 days later with discount.
   c) Post-purchase: Thank you + how to get started; follow up 1 week with tips; later ask for review / upsell.
   d) Re-engagement: for inactive audience after 30 days.
4. Personalization: include first name; mention their interest (e.g. “animal photography” if known); recommend content based on their past clicks.
5. Best practices: subject lines under 50 chars; send in morning / early evening; frequency no more than 1-2 per week; ensure compliance with GDPR.
6. A/B tests: subject lines (benefit vs curiosity), send times (morning vs evening), offer vs no-offer.
7. Sample templates: Welcome email; Cart abandonment; Re-engagement.
8. Tools: use something like Mailchimp / ActiveCampaign / Klaviyo; integrate website event triggers; use analytics dashboard; ensure double-opt-in.

Tone: friendly, helpful, expert. Brand style: inspiring, encouraging, hands-on, value-driven. Budget constraint: low cost tools; compliance: GDPR.`}
          </PromptBlock>

           <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Abridged Sample AI Output</h3>
           <div className="space-y-4 text-black">
               <div>
                   <h4 className="font-semibold">Objective & Metrics:</h4>
                   <ul className="list-disc list-inside text-sm">
                       <li>Increase free preview signups by 25% over 3 months.</li>
                       <li>Reduce cart abandonment from 60% to 40%.</li>
                       <li>Improve open rate from 20% to 30%; CTR from 5% to 8%.</li>
                   </ul>
               </div>
                <div>
                   <h4 className="font-semibold">Cart Abandonment Flow Example:</h4>
                   <ul className="list-disc list-inside text-sm">
                        <li><strong>Email 1 (4h after abandon):</strong> Subject: “You left something behind…” — Body: Empathetic reminder, show cart items, CTA: “Resume where you left off”.</li>
                        <li><strong>Email 2 (24h later):</strong> Subject: “Don’t miss out on learning photography” — Body: Focus on course benefits and include testimonials.</li>
                        <li><strong>Email 3 (72h later):</strong> Subject: “Final chance — save 10% today” — Body: Introduce a small discount and create scarcity.</li>
                   </ul>
               </div>
               <div>
                  <h4 className="font-semibold">Sample Welcome Email Template:</h4>
                  <PromptBlock>
{`Subject: Welcome, [First Name]! Ready to start your photography journey?

Hi [First Name],

Thank you for joining the [Brand Name] community! Whether you're just picking up a camera or looking to refine your skills, you're in the right place.

Here’s what you get as a free preview: [list 2-3 lessons].

To help you hit the ground running, here’s a quick tip: [use natural light to your advantage].

If you have any questions or want suggestions on what to focus on first, just reply — I’d love to help.

Cheers,
[Your Name]`}
                  </PromptBlock>
               </div>
           </div>
        </GuideSection>
        
        <GuideSection title="Developer Blueprint: Building a Creator Platform (ConvertKit-like)">
            <p className="text-slate-600 mb-6">A production-ready prompt for generating a full-stack creator marketing platform with email, automations, landing pages, and digital product sales.</p>
            
            <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Master Prompt: Creator Platform</h3>
            <PromptBlock>
{`You are an AI system builder. Build a production-ready Creator Platform inspired by ConvertKit: email broadcasts + sequences, visual automations, subscriber tagging & fields, hosted forms & landing pages, simple commerce (digital products / paid subscriptions), and creator-focused analytics. Deliver a runnable repo (frontend + backend), Prisma schema, OpenAPI, Docker compose for dev, tests, CI, and README with env variables and setup.`}
            </PromptBlock>

            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Technology Stack</h3>
            <PromptBlock>
{`Frontend: React + TypeScript, Vite, Tailwind CSS, React Router, React Query (or SWR), React Hook Form + Zod.
Backend: Node.js + TypeScript, Fastify or Express, Prisma + PostgreSQL, Redis, BullMQ (queue).
Email: SendGrid adapter (or nodemailer SMTP fallback).
Payments: Stripe (test mode) for one-time & subscription sales.
Deployment: Docker + docker-compose for local dev; Dockerfiles for production; GitHub Actions for CI.
Tests: Jest (backend), React Testing Library (frontend).
Docs: OpenAPI 3.0 (YAML) + Postman collection.`}
            </PromptBlock>

            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Core Features & Requirements</h3>
            <ol className="list-decimal list-inside space-y-2 text-black">
                <li><strong>Auth & Accounts:</strong> Multi-tenant accounts with team members and roles.</li>
                <li><strong>Subscribers:</strong> CRUD operations, CSV import/export, custom fields, and tags. Subscriber profile with activity log.</li>
                <li><strong>Email:</strong> Broadcasts (one-off emails) and Sequences (automated email series with delays). Simple template system with variables.</li>
                <li><strong>Automations:</strong> Visual flow editor (trigger → filter → action) for creator workflows.</li>
                <li><strong>Forms & Landing Pages:</strong> Hosted, embeddable forms and a simple landing page builder. Actions include adding tags and triggering automations.</li>
                <li><strong>Creator Commerce:</strong> Stripe integration for selling digital products and subscriptions. Access granted via tags after payment.</li>
                <li><strong>Tracking & Analytics:</strong> Open/click tracking, form submission and purchase conversion tracking. Creator-focused dashboard.</li>
                <li><strong>Integrations:</strong> Outgoing webhooks for key events, Zapier-friendly structure.</li>
            </ol>
            
            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">API Endpoint Examples</h3>
            <PromptBlock>
{`POST /auth/register, POST /auth/login
GET /api/subscribers, POST /api/subscribers/import
GET /api/tags, POST /api/subscribers/:id/tags
GET /api/sequences, POST /api/sequences
POST /api/automations, GET /api/automations/:id/run
POST /api/forms, GET /f/:formSlug (public), POST /f/:formSlug/submit
POST /api/products, POST /api/checkout-session (Stripe), POST /webhooks/stripe
GET /t/open/:campaignId/:subscriberId (pixel)`}
            </PromptBlock>

             <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Database Schema (Prisma Models)</h3>
             <PromptBlock>
{`model User { ... }
model Account { ... }
model Subscriber { ... }
model Tag { ... }
model Sequence { ... }
model Broadcast { ... }
model Automation { ... }
model Form { ... }
model Product { ... }
model Purchase { ... }
model Event { ... }`}
            </PromptBlock>

            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Acceptance Criteria</h3>
            <ul className="list-disc list-inside space-y-1 text-black">
                <li>App boots with `docker-compose up` with seeded demo data.</li>
                <li>Creator can sign up, import subscribers, create a sequence, and schedule a broadcast.</li>
                <li>Forms must add subscribers and trigger an automation.</li>
                <li>Product checkout flow works in Stripe test mode and grants access via a tag.</li>
                <li>Open & click tracking must record events in the database.</li>
                <li>API is documented via OpenAPI.</li>
            </ul>
        </GuideSection>


        <div className="text-center mt-12">
            <button onClick={onBack} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105">
              Back to Marketing Toolkit
            </button>
        </div>
      </div>
    </div>
  );
};

export default EmailMarketingGuidePage;