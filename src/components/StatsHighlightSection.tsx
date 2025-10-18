import React, { useState, useEffect, useRef } from 'react';

interface StatsHighlightSectionProps {
    onGetStarted: () => void;
}

const StatCounter: React.FC<{ endValue: number; suffix: string; text: string }> = ({ endValue, suffix, text }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentElement = ref.current;
        if (!currentElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    
                    const counter = setInterval(() => {
                        start++;
                        const progress = start / totalFrames;
                        const currentCount = Math.round(endValue * progress);
                        setCount(currentCount);

                        if (start === totalFrames) {
                            clearInterval(counter);
                            setCount(endValue); // Ensure it ends on the exact number
                        }
                    }, frameRate);
                    
                    // Unobserve the element once the animation has started to prevent re-triggering.
                    // FIX: Pass the element to unobserve as required by the IntersectionObserver API.
                    observer.unobserve(currentElement);
                }
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(currentElement);

        return () => {
            // Cleanup: unobserve the element when the component unmounts.
            // FIX: Pass the element to unobserve as required by the IntersectionObserver API.
            observer.unobserve(currentElement);
        };
    }, [endValue]);

    // FIX: Added missing return statement to render the component's JSX.
    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-blue-500">
                {count.toLocaleString()}{suffix}
            </p>
            <p className="mt-1 text-sm md:text-base font-medium text-slate-300">{text}</p>
        </div>
    );
};


const StatsHighlightSection: React.FC<StatsHighlightSectionProps> = ({ onGetStarted }) => {
    return (
        <div className="bg-slate-900 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCounter endValue={50000} suffix="+" text="Profiles Scored" />
                    <StatCounter endValue={98} suffix="%" text="User Satisfaction" />
                    <StatCounter endValue={70} suffix="%" text="Faster Interview Callbacks" />
                </div>
                
                <div className="mt-16 text-center max-w-3xl mx-auto">
                     <p className="text-2xl font-medium text-slate-200">
                        <span className="text-yellow-400">⭐⭐⭐⭐⭐</span> “Helped me land interviews in just 2 weeks.”
                    </p>
                    <p className="mt-2 text-slate-400">— Sarah J., Product Manager</p>
                     <div className="mt-8 flex justify-center">
                         <button
                            onClick={onGetStarted}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
                         >
                            Get My Free Profile Score
                         </button>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">AS SEEN ON</p>
                    <div className="mt-4 flex justify-center items-center space-x-8 opacity-60">
                        <p className="font-bold text-xl text-slate-400">Forbes</p>
                        <p className="font-bold text-xl text-slate-400">TechCrunch</p>
                        <p className="font-bold text-xl text-slate-400">Product Hunt</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsHighlightSection;
