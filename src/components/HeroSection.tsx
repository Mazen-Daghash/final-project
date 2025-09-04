import { useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const slides = [
  {
    id: 1,
    welcomeText: "Welcome to our shop",
    title: "Explore Top Brand Face Toner!",
    description: "Predictive analytics is drastically changing the real estate industry. In the past, providing data for quick",
    image: new URL('../assets/11.png', import.meta.url).href,
    imageAlt: "Thesia Makeup Remover with Orange and Herbs",
    textOnLeft: true
  },
  {
    id: 2,
    welcomeText: "Discover premium skincare",
    title: "Advanced Serum Collection",
    description: "Transform your skincare routine with our premium serum collection. Formulated with cutting-edge ingredients for visible results.",
    image: new URL('../assets/1-1.png', import.meta.url).href,
    imageAlt: "Premium Skincare Serum",
    textOnLeft: false
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const ContentSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">{slide.welcomeText}</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
          {slide.title.split(' ').map((word, index) => (
            index === slide.title.split(' ').length - 1 ? (
              <span key={index}><br />{word}</span>
            ) : (
              <span key={index}>{word} </span>
            )
          ))}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {slide.description}
        </p>
      </div>
      
      <Button 
        className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-8 py-3 rounded-lg transition-colors"
      >
        SHOP NOW
      </Button>
    </div>
  );

  const ImageSection = () => (
    <div className="relative flex justify-center lg:justify-center">
      <div className="relative">
        <div className="animate-float-circle">
          <ImageWithFallback
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full max-w-md h-auto object-contain transition-all duration-500"
          />
        </div>
        
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 min-h-[80vh] flex items-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-500">
          {slide.textOnLeft ? (
            <>
              {/* Text on Left */}
              <div className="order-1 lg:order-1">
                <ContentSection />
              </div>
              {/* Image on Right */}
              <div className="order-2 lg:order-2">
                <ImageSection />
              </div>
            </>
          ) : (
            <>
              {/* Image on Left */}
              <div className="order-2 lg:order-1">
                <ImageSection />
              </div>
              {/* Text on Right */}
              <div className="order-1 lg:order-2">
                <ContentSection />
              </div>
            </>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index 
                  ? 'bg-amber-400' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}