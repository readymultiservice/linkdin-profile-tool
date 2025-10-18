import React, { useState, useEffect } from 'react';
import type { Slide, AppView } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface HeroSliderProps {
    slides: Slide[];
    onNavigate: (view: AppView) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (slides.length > 1) {
            const slideInterval = setInterval(nextSlide, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [currentIndex, slides.length]);

    if (!slides || slides.length === 0) {
        return null; // Don't render anything if there are no slides
    }

    return (
        <section className="h-[60vh] md:h-[70vh] w-full m-auto relative group">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
                className="w-full h-full bg-center bg-cover duration-500"
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
                    <div className="text-white px-6 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                            {slides[currentIndex].title}
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg mt-4 drop-shadow-md">
                           {slides[currentIndex].subtitle}
                        </p>
                        <div className="mt-8">
                             <button
                                onClick={() => onNavigate(slides[currentIndex].buttonView)}
                                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
                            >
                                {slides[currentIndex].buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ArrowLeftIcon onClick={prevSlide} className="w-6 h-6" />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ArrowRightIcon onClick={nextSlide} className="w-6 h-6" />
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`cursor-pointer h-3 w-3 rounded-full transition-colors ${
                            currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
