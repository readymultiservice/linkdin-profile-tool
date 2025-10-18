import React, { useState } from 'react';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

const SimpleEmailSenderPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate sending email
        setTimeout(() => {
            console.log('Sending email:', { to, subject, message });
            setStatus('sent');
            setTimeout(() => {
                setStatus('idle');
                setTo('');
                setSubject('');
                setMessage('');
            }, 3000); // Reset form after 3 seconds
        }, 1500);
    };

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Marketing Toolkit
                </button>
                <header className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Simple Email Sender</h1>
                    <p className="mt-4 text-lg text-black max-w-3xl mx-auto">Compose and send a test email. (This is a frontend simulation).</p>
                </header>
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="to" className={labelClasses}>To</label>
                            <input type="email" id="to" value={to} onChange={e => setTo(e.target.value)} className={inputClasses} placeholder="recipient@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="subject" className={labelClasses}>Subject</label>
                            <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} className={inputClasses} placeholder="Your email subject" required />
                        </div>
                        <div>
                            <label htmlFor="message" className={labelClasses}>Message</label>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={10} className={inputClasses} placeholder="Compose your email..." required />
                        </div>
                        <div>
                            <button type="submit" disabled={status === 'sending'} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                                {status === 'sending' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                                        Send Email
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {status === 'sent' && (
                        <div className="mt-4 text-center p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg animate-fade-in">
                            Email sent successfully! (Simulation)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleEmailSenderPage;