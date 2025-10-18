import React from 'react';
import { GuideSection, PromptBlock } from './GuideComponents';

interface CrmBlueprintPageProps {
  onBack: () => void;
}

const CrmBlueprintPage: React.FC<CrmBlueprintPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          &larr; Back to Marketing Toolkit
        </button>

        <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Blueprint: All-in-One CRM Platform</h1>
            <p className="mt-4 text-lg text-slate-600">A complete, copy-paste working prompt & blueprint to build a multi-tier CRM platform inspired by HubSpot, Salesforce, Zoho, and Pipedrive.</p>
        </header>

        <GuideSection title="Master Prompt — Build a CRM platform">
          <PromptBlock>
{`You are an AI system builder. Create a production-ready CRM platform (frontend + backend) that supports free-tier usage, scales to enterprise features, integrates with marketing tools, and prioritizes pipeline-driven sales flows and powerful automation. Deliver a runnable repo with README, Docker setup, OpenAPI, Prisma schema (Postgres), job queue (Redis + BullMQ), auth (JWT + SSO placeholders), tests, and CI.`}
          </PromptBlock>
        </GuideSection>

        <GuideSection title="Required Technology Stack">
          <PromptBlock>
{`Frontend: React + TypeScript, Vite, Tailwind, React Router, React Query, React Flow (for automation/pipeline UI).
Backend: Node.js + TypeScript, Fastify or Express, Prisma + PostgreSQL, Redis + BullMQ, GraphQL optional.
Auth: JWT + refresh tokens; enterprise SSO (SAML/OAuth2) placeholders.
Integrations: Zapier/webhooks, Mailchimp/SendGrid adapter, Stripe billing stub.
Tests: Jest (backend), React Testing Library (frontend).
Deploy: Docker + docker-compose for dev; Dockerfiles for prod; GitHub Actions.`}
          </PromptBlock>
        </GuideSection>
        
        <GuideSection title="Core Features (MVP → Enterprise)">
            <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">MVP (Must-Have)</h3>
             <ul className="list-disc list-inside space-y-2 text-black">
                <li>Multi-tenant accounts (Organizations) with roles.</li>
                <li>Contacts & Companies with CSV import/export.</li>
                <li>Deals with configurable Pipelines & Stages (Kanban board).</li>
                <li>Activities: tasks, calls, meetings, notes.</li>
                <li>Simple automation rules (trigger → condition → action).</li>
                <li>Webhooks for events; email integration.</li>
                <li>Role-based access control.</li>
                <li>Basic dashboard and reports.</li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Enterprise (Add-ons)</h3>
            <ul className="list-disc list-inside space-y-2 text-black">
                <li>Advanced visual automation workflow editor.</li>
                <li>Custom objects & fields.</li>
                <li>SSO (SAML / OAuth2).</li>
                <li>Audit logs and granular permissions.</li>
                <li>Large data import tools and advanced segmentation.</li>
                <li>Integration adapters for other major platforms.</li>
                <li>Billing & subscription plans via Stripe.</li>
            </ul>
        </GuideSection>

        <GuideSection title="Focused Prompts (Part-by-Part Generation)">
          <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Frontend Prompt</h3>
          <PromptBlock>
{`You are a frontend engineer. Build a React + TypeScript frontend for the CRM. Deliver:
Pages: auth, dashboard, contacts, companies, deals (board + list), pipeline config, activities, automation builder, reports, settings, import CSV UI.
Components: responsive navbar, sidebar, Kanban board (drag/drop), modal, table with server pagination, timeline component, visual automation canvas (react-flow).
Use React Query for API calls. Provide RTL tests for deals board and contact profile.`}
          </PromptBlock>
          <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Backend Prompt</h3>
          <PromptBlock>
{`You are a backend engineer. Build a Node.js + TypeScript API server with Fastify/Express and Prisma/Postgres. Deliver:
Auth endpoints (JWT, SSO placeholders).
CRUD endpoints for all core entities (Contacts, Companies, Deals, etc.).
Bulk import endpoint for CSV using a job queue.
Automation engine with trigger evaluation and action execution via a BullMQ worker.
Eventing system with webhook subscriptions.
OpenAPI 3.0 spec.
Jest tests for core endpoints.`}
          </PromptBlock>
        </GuideSection>

        <GuideSection title="Database Schema Sketch (Prisma)">
            <p>A high-level view of the multi-tenant data models.</p>
            <PromptBlock>
{`model Organization {
  id        String   @id @default(uuid())
  name      String
  users     User[]
  contacts  Contact[]
  // ... other relations
}

model User {
  id             String   @id @default(uuid())
  email          String   @unique
  organizationId String
  organization   Organization @relation(...)
  // ... other fields
}

model Contact {
  id             String   @id @default(uuid())
  organizationId String
  organization   Organization @relation(...)
  metadata       Json?    // For custom fields
  tags           ContactTag[]
  // ... other fields
}

model Deal {
  id             String   @id @default(uuid())
  organizationId String
  pipelineId     String
  stageId        String
  title          String
  valueCents     Int
  // ... other fields
}

model Activity {
  id         String   @id @default(uuid())
  organizationId String
  type       String   // task/call/meeting/note
  // ... other fields
}

model Automation {
  id             String   @id @default(uuid())
  organizationId String
  name           String
  flow           Json     // nodes & edges for visual editor
  // ... other fields
}`}
            </PromptBlock>
        </GuideSection>
        
        <GuideSection title="UI Blueprint & Code Examples">
            <h3 className="text-xl font-bold mt-4 mb-2 text-slate-800">Suggested Folder Structure</h3>
            <PromptBlock>
{`/frontend
  /src
    /pages
      Dashboard.tsx
      Contacts.tsx
      DealsBoard.tsx
      Automations.tsx
      ...
    /components
      Sidebar.tsx
      Navbar.tsx
      KanbanBoard.tsx
      DealCard.tsx
      AutomationCanvas.tsx
      ...
  App.tsx`}
            </PromptBlock>
             <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Main App Structure (App.tsx)</h3>
             <PromptBlock>
{`import { BrowserRouter, Routes, Route } from "react-router-dom";
// ... import pages and components

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/deals" element={<DealsBoard />} />
              {/* ... other routes */}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}`}
            </PromptBlock>
            <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Deals Board Page (pages/DealsBoard.tsx)</h3>
             <PromptBlock>
{`import { useState } from "react";
import DealCard from "../components/DealCard";

const sampleStages = [
  { id: "1", name: "Lead", deals: [{ id: "d1", title: "ACME Corp", value: 5000 }] },
  { id: "2", name: "Negotiation", deals: [{ id: "d2", title: "Globex Inc", value: 12000 }] },
  { id: "3", name: "Closed Won", deals: [] },
];

export default function DealsBoard() {
  const [stages, setStages] = useState(sampleStages);

  return (
    <div className="grid grid-cols-3 gap-4">
      {stages.map(stage => (
        <div key={stage.id} className="bg-gray-100 rounded-lg p-3">
          <h2 className="font-bold text-lg mb-3">{stage.name}</h2>
          <div className="space-y-2">
            {stage.deals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`}
            </PromptBlock>
             <h3 className="text-xl font-bold mt-6 mb-2 text-slate-800">Visual Automation Builder (pages/Automations.tsx)</h3>
             <PromptBlock>
{`import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function Automations() {
  const initialNodes = [
    { id: "1", type: "input", position: { x: 0, y: 0 }, data: { label: "Trigger: Contact Created" } },
    { id: "2", position: { x: 250, y: 100 }, data: { label: "Action: Send Email" } },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  return (
    <div className="h-[80vh] bg-white rounded-lg shadow">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}`}
            </PromptBlock>
        </GuideSection>

        <GuideSection title="Acceptance Criteria (MVP)">
            <ol className="list-decimal list-inside space-y-2 text-black">
                <li><code>docker-compose up</code> boots the entire stack with seed data.</li>
                <li>User can register, create an organization, add contacts (manual + CSV), create a pipeline, and manage deals.</li>
                <li>Deals can be moved across stages on the Kanban board.</li>
                <li>A simple automation (e.g., on contact creation, add a tag and create a task) can be created and executed by the worker.</li>
                <li>Webhooks can be registered and receive events.</li>
                <li>API is documented via OpenAPI.</li>
                <li>Core unit tests pass.</li>
            </ol>
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

export default CrmBlueprintPage;
