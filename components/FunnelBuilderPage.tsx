import React, { useState } from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CogIcon } from './icons/CogIcon';
import { MailIcon } from './icons/MailIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import Tooltip from './Tooltip';
import { InformationCircleIcon } from './icons/InformationCircleIcon';


interface FunnelBuilderPageProps {
  onBack: () => void;
}

interface BenefitPoint {
    id: number;
    text: string;
}

interface LandingPageConfig {
    headline: string;
    subheadline: string;
    ctaText: string;
    imageUrl: string;
    bgColor: string;
    textColor: string;
    benefits: BenefitPoint[];
}

interface ThankYouPageConfig {
    mainMessage: string;
    subMessage: string;
    showUpsell: boolean;
    upsellHeadline: string;
    upsellDescription: string;
    upsellCta: string;
}

interface FunnelSettings {
    emailProvider: 'none' | 'mailchimp' | 'convertkit' | 'activecampaign';
    apiKey: string;
    enableAnalytics: boolean;
    analyticsId: string;
}

const FunnelBuilderPage: React.FC<FunnelBuilderPageProps> = ({ onBack }) => {
    const [landingConfig, setLandingConfig] = useState<LandingPageConfig>({
        headline: 'Discover the Secret to Effortless Productivity',
        subheadline: 'Join 10,000+ subscribers who get our weekly tips on mastering their workflow and achieving more with less stress.',
        ctaText: 'Get My Free Ebook',
        imageUrl: 'https://picsum.photos/1200/800?random=1',
        bgColor: '#f8fafc',
        textColor: '#0f172a',
        benefits: [
            { id: 1, text: 'Save 10+ hours per week.' },
            { id: 2, text: 'Increase your focus and clarity.' },
            { id: 3, text: 'Unlock your full potential.' },
        ]
    });

    const [thankYouConfig, setThankYouConfig] = useState<ThankYouPageConfig>({
        mainMessage: "Thanks for Subscribing!",
        subMessage: "Your free ebook is on its way to your inbox. Check your email!",
        showUpsell: true,
        upsellHeadline: "ONE-TIME OFFER: Get the Full Course for 75% Off!",
        upsellDescription: "Upgrade now to get lifetime access to our complete productivity masterclass, including video lessons, templates, and a private community.",
        upsellCta: "Yes, I Want to Upgrade for Just $49!"
    });
    
    const [settingsConfig, setSettingsConfig] = useState<FunnelSettings>({
        emailProvider: 'none',
        apiKey: '',
        enableAnalytics: false,
        analyticsId: '',
    });

    const [activeControl, setActiveControl] = useState<'landing' | 'thankyou' | 'settings'>('landing');
    const [preview, setPreview] = useState<'landing' | 'thankyou'>('landing');
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const handleLandingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLandingConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleBenefitChange = (id: number, text: string) => {
        setLandingConfig(prev => ({
            ...prev,
            benefits: prev.benefits.map(b => b.id === id ? { ...b, text } : b)
        }));
    };

    const addBenefit = () => {
        if (landingConfig.benefits.length < 4) {
            setLandingConfig(prev => ({
                ...prev,
                benefits: [...prev.benefits, { id: Date.now(), text: 'New Benefit' }]
            }));
        }
    };

    const removeBenefit = (id: number) => {
        setLandingConfig(prev => ({
            ...prev,
            benefits: prev.benefits.filter(b => b.id !== id)
        }));
    };


    const handleThankYouChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setThankYouConfig(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setThankYouConfig(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             setSettingsConfig(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setSettingsConfig(prev => ({ ...prev, [name]: value }));
        }
    }
    
    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";
    const previewWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                 <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Marketing Toolkit
                </button>
                 <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Landing Page & Funnel Builder</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Build a 2-step lead generation funnel. Customize your landing page and thank you page, then preview the results live.</p>
                </header>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
                        <div className="border-b border-slate-200 mb-4">
                            <nav className="-mb-px flex space-x-4">
                                <button onClick={() => setActiveControl('landing')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeControl === 'landing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Landing Page</button>
                                <button onClick={() => setActiveControl('thankyou')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeControl === 'thankyou' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Thank You</button>
                                <button onClick={() => setActiveControl('settings')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeControl === 'settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><CogIcon className="h-5 w-5 inline-block mr-1"/>Settings</button>
                            </nav>
                        </div>
                        
                        {activeControl === 'landing' && (
                            <div className="space-y-4 animate-fade-in">
                                <div><label htmlFor="headline" className={labelClasses}>Headline</label><input type="text" id="headline" name="headline" value={landingConfig.headline} onChange={handleLandingChange} className={inputClasses} /></div>
                                <div><label htmlFor="subheadline" className={labelClasses}>Sub-headline</label><textarea id="subheadline" name="subheadline" value={landingConfig.subheadline} onChange={handleLandingChange} rows={3} className={inputClasses}></textarea></div>
                                
                                <div>
                                    <label className={labelClasses}>Benefits</label>
                                    <div className="space-y-2">
                                        {landingConfig.benefits.map(b => (
                                            <div key={b.id} className="flex items-center gap-2">
                                                <input type="text" value={b.text} onChange={e => handleBenefitChange(b.id, e.target.value)} className={inputClasses} />
                                                <button onClick={() => removeBenefit(b.id)} className="text-slate-400 hover:text-red-600 p-1"><TrashIcon className="h-5 w-5"/></button>
                                            </div>
                                        ))}
                                    </div>
                                    {landingConfig.benefits.length < 4 && <button onClick={addBenefit} className="text-sm text-blue-600 mt-2">+ Add Benefit</button>}
                                </div>
                                
                                <div><label htmlFor="ctaText" className={labelClasses}>CTA Button Text</label><input type="text" id="ctaText" name="ctaText" value={landingConfig.ctaText} onChange={handleLandingChange} className={inputClasses} /></div>
                                <div><label htmlFor="imageUrl" className={labelClasses}>Image URL</label><input type="text" id="imageUrl" name="imageUrl" value={landingConfig.imageUrl} onChange={handleLandingChange} className={inputClasses} /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label htmlFor="bgColor" className={labelClasses}>BG Color</label><input type="color" id="bgColor" name="bgColor" value={landingConfig.bgColor} onChange={handleLandingChange} className="w-full h-10 p-1 border" /></div>
                                    <div><label htmlFor="textColor" className={labelClasses}>Text Color</label><input type="color" id="textColor" name="textColor" value={landingConfig.textColor} onChange={handleLandingChange} className="w-full h-10 p-1 border" /></div>
                                </div>
                            </div>
                        )}
                        {activeControl === 'thankyou' && (
                             <div className="space-y-4 animate-fade-in">
                                <div><label htmlFor="mainMessage" className={labelClasses}>Main Message</label><input type="text" id="mainMessage" name="mainMessage" value={thankYouConfig.mainMessage} onChange={handleThankYouChange} className={inputClasses} /></div>
                                <div><label htmlFor="subMessage" className={labelClasses}>Sub-message</label><textarea id="subMessage" name="subMessage" value={thankYouConfig.subMessage} onChange={handleThankYouChange} rows={2} className={inputClasses}></textarea></div>
                                <div className="flex items-center"><input type="checkbox" id="showUpsell" name="showUpsell" checked={thankYouConfig.showUpsell} onChange={handleThankYouChange} className="h-4 w-4" /><label htmlFor="showUpsell" className="ml-2 text-black">Show Upsell Offer</label></div>
                                {thankYouConfig.showUpsell && (
                                    <div className="space-y-4 border-t pt-4">
                                        <div><label htmlFor="upsellHeadline" className={labelClasses}>Upsell Headline</label><input type="text" id="upsellHeadline" name="upsellHeadline" value={thankYouConfig.upsellHeadline} onChange={handleThankYouChange} className={inputClasses} /></div>
                                        <div><label htmlFor="upsellDescription" className={labelClasses}>Upsell Description</label><textarea id="upsellDescription" name="upsellDescription" value={thankYouConfig.upsellDescription} onChange={handleThankYouChange} rows={3} className={inputClasses}></textarea></div>
                                        <div><label htmlFor="upsellCta" className={labelClasses}>Upsell CTA Text</label><input type="text" id="upsellCta" name="upsellCta" value={thankYouConfig.upsellCta} onChange={handleThankYouChange} className={inputClasses} /></div>
                                    </div>
                                )}
                            </div>
                        )}
                         {activeControl === 'settings' && (
                             <div className="space-y-6 animate-fade-in">
                                <div>
                                    <h4 className="font-semibold text-black mb-2 flex items-center gap-1.5"><MailIcon className="h-5 w-5"/>Email Integration <Tooltip text="Connect your email service provider to automatically add new subscribers to your list."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></h4>
                                    <label htmlFor="emailProvider" className={labelClasses}>Provider</label>
                                    <select id="emailProvider" name="emailProvider" value={settingsConfig.emailProvider} onChange={handleSettingsChange} className={inputClasses}>
                                        <option value="none">None</option><option value="mailchimp">Mailchimp</option><option value="convertkit">ConvertKit</option><option value="activecampaign">ActiveCampaign</option>
                                    </select>
                                    {settingsConfig.emailProvider !== 'none' && <div><label htmlFor="apiKey" className={`${labelClasses} mt-2`}>API Key</label><input type="text" id="apiKey" name="apiKey" value={settingsConfig.apiKey} onChange={handleSettingsChange} className={inputClasses} placeholder="Paste API key here" /></div>}
                                </div>
                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-black mb-2 flex items-center gap-1.5"><ChartBarIcon className="h-5 w-5"/>Analytics <Tooltip text="Enter your Google Analytics Measurement ID (e.g., G-XXXXXXXXXX) to track page views and conversions."><InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-pointer"/></Tooltip></h4>
                                    <div className="flex items-center"><input type="checkbox" id="enableAnalytics" name="enableAnalytics" checked={settingsConfig.enableAnalytics} onChange={handleSettingsChange} className="h-4 w-4" /><label htmlFor="enableAnalytics" className="ml-2 text-black">Enable Google Analytics</label></div>
                                    {settingsConfig.enableAnalytics && <div><label htmlFor="analyticsId" className={`${labelClasses} mt-2`}>Tracking ID</label><input type="text" id="analyticsId" name="analyticsId" value={settingsConfig.analyticsId} onChange={handleSettingsChange} className={inputClasses} placeholder="e.g., G-XXXXXXXXXX" /></div>}
                                </div>
                             </div>
                        )}
                    </div>
                     {/* Preview */}
                    <div className="lg:col-span-2">
                         <div className="mb-4 flex items-center justify-between">
                            <div className="flex space-x-2 rounded-lg bg-slate-200 p-1">
                                {(['desktop', 'tablet', 'mobile'] as const).map(device => (
                                     <button key={device} onClick={() => setPreviewDevice(device)} className={`px-3 py-1 text-sm font-semibold rounded-md capitalize ${previewDevice === device ? 'bg-white shadow' : 'text-slate-600'}`}>{device}</button>
                                ))}
                            </div>
                             <div className="flex space-x-2 rounded-lg bg-slate-200 p-1">
                                <button onClick={() => setPreview('landing')} className={`px-3 py-1 text-sm font-semibold rounded-md ${preview === 'landing' ? 'bg-white shadow' : 'text-slate-600'}`}>Landing Page</button>
                                <button onClick={() => setPreview('thankyou')} className={`px-3 py-1 text-sm font-semibold rounded-md ${preview === 'thankyou' ? 'bg-white shadow' : 'text-slate-600'}`}>Thank You Page</button>
                            </div>
                         </div>
                        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border mx-auto transition-all" style={{ maxWidth: previewWidths[previewDevice] }}>
                            {preview === 'landing' ? (
                                 <div className="grid grid-cols-1 md:grid-cols-2 items-center transition-all" style={{ backgroundColor: landingConfig.bgColor, color: landingConfig.textColor }}>
                                    <div className="p-8 md:p-12 order-2 md:order-1">
                                        <h1 className="text-3xl md:text-4xl font-extrabold">{landingConfig.headline}</h1>
                                        <p className="mt-4 text-md md:text-lg">{landingConfig.subheadline}</p>
                                        <ul className="mt-6 space-y-2">
                                            {landingConfig.benefits.map(b => (
                                                <li key={b.id} className="flex items-center"><CheckIcon className="h-5 w-5 mr-2 flex-shrink-0" />{b.text}</li>
                                            ))}
                                        </ul>
                                        <div className="mt-6">
                                            <input type="email" placeholder="Enter your email..." className="w-full px-4 py-2 rounded-md text-black" />
                                            <button className="w-full mt-2 font-bold py-3 px-8 rounded-lg text-lg" style={{ backgroundColor: landingConfig.textColor, color: landingConfig.bgColor }}>
                                                {landingConfig.ctaText}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-64 md:h-full bg-cover bg-center order-1 md:order-2" style={{ backgroundImage: `url(${landingConfig.imageUrl})` }}></div>
                                </div>
                            ) : (
                                <div className="p-8 md:p-16 text-center transition-all">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-green-600">{thankYouConfig.mainMessage}</h1>
                                    <p className="mt-4 text-lg text-black">{thankYouConfig.subMessage}</p>
                                    {thankYouConfig.showUpsell && (
                                        <div className="mt-8 pt-8 border-t-2 border-dashed">
                                            <h2 className="text-2xl md:text-3xl font-bold text-blue-700">{thankYouConfig.upsellHeadline}</h2>
                                            <p className="mt-3 max-w-2xl mx-auto text-black">{thankYouConfig.upsellDescription}</p>
                                            <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105">
                                                {thankYouConfig.upsellCta}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunnelBuilderPage;
