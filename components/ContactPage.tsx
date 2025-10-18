
import React, { useState } from 'react';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock form submission
        console.log("Form submitted:", formData);
        setFormStatus('Thank you for your message! We will get back to you shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const labelClasses = "block text-sm font-medium text-black mb-1";

    return (
        <div className="bg-white animate-fade-in">
            <div className="bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        &larr; Back to Home
                    </button>
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">Contact Us</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-black">
                            Have a question or want to work with us? We'd love to hear from you.
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                        <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
                        {formStatus ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{formStatus}</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={labelClasses}>Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+91 12345 67890" required />
                                </div>
                                <div>
                                    <label htmlFor="subject" className={labelClasses}>Subject</label>
                                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} required />
                                </div>
                                <div>
                                    <label htmlFor="message" className={labelClasses}>Message</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={inputClasses} required></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-black">Contact Information</h2>
                        <p className="text-black">You can also reach us directly through the channels below.</p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <MailIcon className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-black">Email</h3>
                                    <a href="mailto:readymultiservice@gmail.com" className="text-blue-600 hover:underline">readymultiservice@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <PhoneIcon className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-black">Phone</h3>
                                    <p className="text-black">+91 7887788291</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <LocationMarkerIcon className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-black">Office Address</h3>
                                    <p className="text-black">Near Durga Devi Mandir, Civil Line, Gondia. Maharashtra: 441601.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;