import { ChevronLeft, ChevronRight } from 'lucide-react';
import exampleImage from 'figma:asset/82e384c5bcfb1ccc77ed1b8188bc8b42d742cc69.png';

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Large Yellow Quotation Mark */}
        <div className="mb-8">
          <span className="text-6xl font-serif text-yellow-400">"</span>
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Testimonial Text */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates consequatur obcaecati nisi similique ipsum molestiae sit sequi quam odit odio."
          </p>
        </div>

        {/* Person Name */}
        <div className="text-center">
          <p className="text-gray-900 font-bold">— By Jacob William —</p>
        </div>
      </div>
    </section>
  );
}