import React, { useState } from 'react';
import { BriefcaseCheckIcon } from './icons/BriefcaseCheckIcon';
import { UserEditIcon } from './icons/UserEditIcon';
import { StoryIcon } from './icons/StoryIcon';
import { PhoneCallIcon } from './icons/PhoneCallIcon';
import { PencilIcon } from './icons/PencilIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { StarIcon } from './icons/StarIcon';

interface ExpertResumeWriterPageProps {
  onBack: () => void;
}

const testimonials = [
  { name: 'Abhishek M.', rating: 5, image: 'https://i.pravatar.cc/150?img=1', text: 'I am good with the resume; all the details look good and correct.' },
  { name: 'Madhav Z.', rating: 5, image: 'https://i.pravatar.cc/150?img=2', text: 'Great job! The person working on my resume understood my needs and created it accordingly.' },
  { name: 'Nikita C.', rating: 5, image: 'https://i.pravatar.cc/150?img=3', text: 'Outspark has created a fantastic, ATS-friendly, and well-designed resume. I truly appreciate this service.' },
  { name: 'Ravi K.', rating: 5, image: 'https://i.pravatar.cc/150?img=4', text: 'I was using ChatGPT to tweak my resume but something always felt ‘off.’ Your expert version actually brought clarity and punch.' },
];

const trustedByLogos = ['Times Internet', 'HCL', 'Adobe', 'naukri.com', 'TCS', 'Microsoft', 'Flipkart', 'Genpact', 'Dabur', 'adani', 'Paytm', 'Airtel', 'Walmart', 'Amazon', 'IBM', 'Google', 'Sony', 'Bosch', 'Columbia', 'Facebook', 'Philips', 'Nestle', 'Siemens', 'Uber', 'FedEx', 'Abbott'];

const faqs = [
    { q: "Why should I pay for a resume when there are free templates online?", a: "Templates can help with formatting, but they can't tell your story or position you strategically. Our experts write from scratch, tailoring your resume to your exact goals - so it works in the real world." },
    { q: "Is this done using AI or a real human?", a: "We use AI as a tool to assist our expert human writers. Every resume is crafted, reviewed, and finalized by a professional resume writer to ensure quality, nuance, and a personal touch that AI alone cannot provide." },
    { q: "How long does it take?", a: "The first draft is typically delivered within 7-10 working days. We then work with you on any revisions until you are completely satisfied." },
    { q: "What if I don't like the first draft?", a: "We offer unlimited revisions. Our goal is your complete satisfaction. We'll work with you to refine the draft until it perfectly represents your skills and experience." },
    { q: "Can I talk to my resume writer directly?", a: "Yes, our process includes a quick call to understand your goals and experience. Direct communication ensures we capture your unique value proposition." },
];

const ExpertResumeWriterPage: React.FC<ExpertResumeWriterPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const CtaButton = ({ children }: { children: React.ReactNode }) => (
    <button className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-700 transition-colors shadow-lg transform hover:scale-105">
      {children}
    </button>
  );

  return (
    <div className="bg-white text-slate-800 font-sans animate-fade-in">
        <button onClick={onBack} className="absolute top-6 left-6 z-20 bg-white/70 backdrop-blur-sm text-slate-700 font-semibold py-2 px-4 rounded-full hover:bg-slate-200 transition-colors">
            &larr; Back to Home
        </button>

        {/* Hero Section */}
        <section className="relative bg-slate-50 overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">Get the Resume That Gets You Hired</h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-600 mt-2">Crafted by Experts</h2>
                    <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg">We completely rewrite your resume from top to bottom, crafting your story in a way that grabs attention and makes hiring managers say "we need to talk".</p>
                    <div className="mt-8"><CtaButton>Yes, I want an expert-written resume</CtaButton></div>
                    <p className="mt-6 text-sm text-slate-500">Trusted by 100,000+ professionals across 30+ industries</p>
                </div>
                <div className="relative h-96 md:h-auto">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000" alt="Professional Resume Writer" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl z-10" />
                    <img src="https://picsum.photos/seed/resume1/800/600" alt="ATS-Optimized Resume Example" className="absolute top-0 left-0 w-64 rounded-lg shadow-xl transform -rotate-12" />
                    <img src="https://picsum.photos/seed/resume2/800/600" alt="HR Approved Resume Example" className="absolute bottom-0 right-0 w-64 rounded-lg shadow-xl transform rotate-12" />
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Why Professionals Choose an Expert Written Resume?</h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 p-4 rounded-2xl mb-4"><BriefcaseCheckIcon className="h-8 w-8 text-purple-600" /></div>
                        <h3 className="text-xl font-bold mb-2">Positioned for the Role You Actually Want</h3>
                        <p>Not just a list of past roles - your resume is strategically written to match the next level you're aiming for.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 p-4 rounded-2xl mb-4"><UserEditIcon className="h-8 w-8 text-green-600" /></div>
                        <h3 className="text-xl font-bold mb-2">Crafted by Real Experts, Not Templates</h3>
                        <p>Every word is written by a professional who understands hiring psychology - no copy-paste lines, no AI fluff.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 p-4 rounded-2xl mb-4"><StoryIcon className="h-8 w-8 text-blue-600" /></div>
                        <h3 className="text-xl font-bold mb-2">Turns Your Experience Into a Powerful Story</h3>
                        <p>We translate your work into a clear, compelling narrative that communicates leadership, impact, and results.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12">How We Craft a Standout Resume Just for You</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2"></div>
                    <div className="relative grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center bg-slate-50 px-4">
                            <div className="bg-purple-500 p-4 rounded-2xl mb-4 border-4 border-slate-50"><PhoneCallIcon className="h-8 w-8 text-white" /></div>
                            <h3 className="text-xl font-bold mb-2">We Understand You First</h3>
                            <p>Our team gets on a quick call to learn about your experience, goals, and the kind of roles you're targeting.</p>
                        </div>
                        <div className="flex flex-col items-center bg-slate-50 px-4">
                            <div className="bg-cyan-500 p-4 rounded-2xl mb-4 border-4 border-slate-50"><PencilIcon className="h-8 w-8 text-white" /></div>
                            <h3 className="text-xl font-bold mb-2">Our Experts Get to Work</h3>
                            <p>A professional resume writer rewrites your entire resume from scratch, refining content, structure, and keywords.</p>
                        </div>
                        <div className="flex flex-col items-center bg-slate-50 px-4">
                            <div className="bg-pink-500 p-4 rounded-2xl mb-4 border-4 border-slate-50"><DocumentCheckIcon className="h-8 w-8 text-white" /></div>
                            <h3 className="text-xl font-bold mb-2">You Review and Approve</h3>
                            <p>We send you the draft (in 7-10 working days). You review, give feedback, and we fine-tune it until you love it.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12"><CtaButton>Get Started</CtaButton></div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
             <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Don't Take Our Word for It</h2>
                <p className="max-w-2xl mx-auto text-lg mb-12">Hear it from the people we helped.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg border text-left">
                            <div className="flex items-center mb-4">
                                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, j) => <StarIcon key={j} className="h-5 w-5 text-yellow-400" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Trusted By Section */}
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Trusted by Professionals who've worked at</h2>
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                    {trustedByLogos.map(logo => (
                        <span key={logo} className="text-slate-500 font-semibold text-lg grayscale">{logo}</span>
                    ))}
                </div>
            </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-4 text-left font-semibold">
                                {faq.q}
                                <span className={`transition-transform transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {openFaq === i && <div className="p-4 pt-0 text-slate-600 animate-fade-in-down">{faq.a}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Land Your Dream Job?</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8">Your dream job starts with the right resume.</p>
                <CtaButton>Yes, I want an expert-written resume</CtaButton>
            </div>
        </section>

    </div>
  );
};

export default ExpertResumeWriterPage;
