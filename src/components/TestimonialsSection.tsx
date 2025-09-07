import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "\"I've been using this beard oil for months and the difference is incredible. My beard has never been softer or more manageable.\"",
      author: "Jacob William",
    },
    {
      id: 2,
      text: "\"The best beard oil I've ever used. The scent is amazing and it keeps my beard looking healthy all day long.\"",
      author: "Michael Johnson",
    },
    {
      id: 3,
      text: "\"My wife loves how my beard feels now! The oil absorbs quickly and doesn't leave any greasy residue. Highly recommend!\"",
      author: "David Wilson",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Large Yellow Quotation Mark */}
        <div className="mb-8">
          <span className="text-6xl font-serif text-yellow-400">"</span>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button 
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Testimonial Text */}
        <div className="mb-8 transition-opacity duration-300 min-h-[120px] flex items-center">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            {testimonials[currentIndex].text}
          </p>
        </div>

        {/* Person Name */}
        <div className="text-center">
          <p className="text-gray-900 font-bold">— {testimonials[currentIndex].author} —</p>
        </div>
        
        
      </div>
    </section>
  );
}