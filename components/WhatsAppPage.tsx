import React, { useState } from 'react';
import type { ConnectedAccount, WhatsAppContact, WhatsAppCampaign } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { PresentationChartBarIcon } from './icons/PresentationChartBarIcon';
import { CogIcon } from './icons/CogIcon';

interface WhatsAppPageProps {
    onBack: () => void;
    connectedAccount: ConnectedAccount;
    onConnect: (number: string) => void;
    onDisconnect: () => void;
    contacts: WhatsAppContact[];
    campaigns: WhatsAppCampaign[];
    onAddContact: (contact: Omit<WhatsAppContact, 'id'>) => void;
    onCreateCampaign: (campaign: Omit<WhatsAppCampaign, 'id' | 'status' | 'approvalStatus' | 'recipients' | 'sent' | 'read' | 'replied' | 'createdAt'>) => void;
}

type Tab = 'campaigns' | 'contacts' | 'analytics' | 'settings';

const WhatsAppPage: React.FC<WhatsAppPageProps> = ({ onBack, connectedAccount, onConnect, onDisconnect, contacts, campaigns, onAddContact, onCreateCampaign }) => {
    const [activeTab, setActiveTab] = useState<Tab>('campaigns');

    const renderContent = () => {
        if (connectedAccount.status === 'Disconnected') {
            return <ConnectionSetup onConnect={onConnect} />;
        }
        
        switch(activeTab) {
            case 'campaigns': return <CampaignsTab campaigns={campaigns} contacts={contacts} onCreateCampaign={onCreateCampaign} />;
            case 'contacts': return <ContactsTab contacts={contacts} onAddContact={onAddContact} />;
            case 'analytics': return <AnalyticsTab campaigns={campaigns} />;
            case 'settings': return <SettingsTab connectedAccount={connectedAccount} onDisconnect={onDisconnect} />;
            default: return null;
        }
    };
    
    const tabButtonClasses = (tabName: Tab) => `flex items-center whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tabName ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`;

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center">
                        <WhatsAppIcon className="h-10 w-10 mr-4 text-green-500" />
                        WhatsApp Marketing Tool
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Connect your number, manage contacts, and send bulk messages.</p>
                </header>
                
                {connectedAccount.status === 'Connected' && (
                    <div className="mb-6 border-b border-slate-200 bg-white rounded-t-lg shadow-sm">
                        <nav className="-mb-px flex space-x-4 px-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('campaigns')} className={tabButtonClasses('campaigns')}><PaperAirplaneIcon className="h-5 w-5 mr-2" />Campaigns</button>
                            <button onClick={() => setActiveTab('contacts')} className={tabButtonClasses('contacts')}><UserPlusIcon className="h-5 w-5 mr-2" />Contacts</button>
                            <button onClick={() => setActiveTab('analytics')} className={tabButtonClasses('analytics')}><PresentationChartBarIcon className="h-5 w-5 mr-2" />Analytics</button>
                            <button onClick={() => setActiveTab('settings')} className={tabButtonClasses('settings')}><CogIcon className="h-5 w-5 mr-2" />Settings</button>
                        </nav>
                    </div>
                )}
                
                <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


const ConnectionSetup: React.FC<{ onConnect: (number: string) => void }> = ({ onConnect }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const phoneNumber = '+15551234567'; // Mock phone number

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            onConnect(phoneNumber);
            setIsConnecting(false);
        }, 3000);
    };

    return (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Connect Your WhatsApp Number</h2>
            <p className="text-slate-600 mb-6">Link your WhatsApp account to start sending campaigns. This uses the official WhatsApp Business API.</p>
            {isConnecting ? (
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-4 text-slate-600">Authenticating and connecting your number...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                     <div className="p-4 bg-white border rounded-lg shadow-sm">
                        <QrCodeIcon className="h-48 w-48 text-slate-800" />
                    </div>
                    <p className="text-sm text-slate-500 my-4">1. Open WhatsApp on your phone.<br/>2. Go to Settings &gt; Linked Devices and tap "Link a Device".<br/>3. Scan this QR code.</p>
                    <button onClick={handleConnect} className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                        Simulate Successful Scan
                    </button>
                </div>
            )}
        </div>
    );
};

// ... Placeholder components for Campaigns, Contacts, Analytics, Settings
const CampaignsTab: React.FC<{ campaigns: WhatsAppCampaign[], contacts: WhatsAppContact[], onCreateCampaign: Function }> = ({ campaigns, contacts, onCreateCampaign }) => {
    // Mock implementation
    const getStatusColor = (status: string) => {
        if (status === 'Approved') return 'bg-green-100 text-green-800';
        if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
        if (status === 'Rejected') return 'bg-red-100 text-red-800';
        return 'bg-slate-100 text-slate-800';
    };
    return <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Your Campaigns</h3>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700">New Campaign</button>
        </div>
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50"><tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Approval</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Recipients</th>
            </tr></thead>
            <tbody className="bg-white divide-y divide-slate-200 text-sm">
                {campaigns.map(c => <tr key={c.id}>
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.status}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(c.approvalStatus)}`}>{c.approvalStatus}</span></td>
                    <td className="px-4 py-3">{c.recipients}</td>
                </tr>)}
            </tbody>
        </table>
    </div>;
};
const ContactsTab: React.FC<{ contacts: WhatsAppContact[], onAddContact: Function }> = ({ contacts, onAddContact }) => {
    // Mock implementation
    return <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Your Contacts</h3>
            <div>
                 <button className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-slate-300 mr-2">
                    <DocumentArrowUpIcon className="h-4 w-4 inline-block mr-1"/>
                    Import CSV
                </button>
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700">
                    <UserPlusIcon className="h-4 w-4 inline-block mr-1"/>
                    Add Contact
                </button>
            </div>
        </div>
        <table className="min-w-full divide-y divide-slate-200">
             <thead className="bg-slate-50"><tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Phone</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Group</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Tags</th>
            </tr></thead>
             <tbody className="bg-white divide-y divide-slate-200 text-sm">
                 {contacts.map(c => <tr key={c.id}>
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.group}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-1">{c.tags.map(t => <span key={t} className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{t}</span>)}</td>
                </tr>)}
            </tbody>
        </table>
    </div>;
};
const AnalyticsTab: React.FC<{ campaigns: WhatsAppCampaign[] }> = ({ campaigns }) => {
    // Mock implementation
    const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
    const totalRead = campaigns.reduce((sum, c) => sum + c.read, 0);
    const totalReplied = campaigns.reduce((sum, c) => sum + c.replied, 0);

    return <div>
        <h3 className="text-xl font-bold mb-4">Campaign Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{totalSent}</p><p className="text-sm text-slate-600">Total Sent</p></div>
            <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{totalRead}</p><p className="text-sm text-slate-600">Total Read</p></div>
            <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{totalReplied}</p><p className="text-sm text-slate-600">Total Replies</p></div>
        </div>
    </div>;
};
const SettingsTab: React.FC<{ connectedAccount: ConnectedAccount, onDisconnect: () => void }> = ({ connectedAccount, onDisconnect }) => (
    <div>
        <h3 className="text-lg font-bold">Connection Status</h3>
        <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center justify-between">
            <p className="text-green-800 font-semibold">
                Connected with number: <span className="font-mono">{connectedAccount.number}</span>
            </p>
            <button onClick={onDisconnect} className="bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-600">Disconnect</button>
        </div>
    </div>
);

export default WhatsAppPage;