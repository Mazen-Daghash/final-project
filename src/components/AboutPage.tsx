import { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import BeardOilSection from './BeardOilSection';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate?: (page: 'home' | 'products' | 'checkout' | 'contact' | 'about') => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  const timelineData = [
    {
      year: 2016,
      title: "Our Beginning",
      description: "We provide the best Beard oil all over the world. We are the market best share for Beard Oil. You can buy our product without any hesitation because we always comes about our product quality and always available it properly so that our Trust and this is our main goal before that.",
      description2: "Some of our customer say's that they trust us and buy our product without any hesitation because they belive us and always happy."
    },
    {
      year: 2017,
      title: "Expansion",
      description: "We expanded our product line and reached more customers worldwide with our premium grooming products."
    },
    {
      year: 2018,
      title: "Innovation",
      description: "Introduced new formulations and packaging to better serve our growing customer base."
    },
    {
      year: 2019,
      title: "Recognition",
      description: "Received industry awards for our commitment to quality and customer satisfaction."
    },
    {
      year: 2020,
      title: "Digital Growth",
      description: "Expanded our online presence and launched new digital platforms to reach customers globally."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      

      {/* Beard Oil Section */}
      <BeardOilSection />

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div 
            className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setVideoPlaying(true)}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1579823062407-9f12af3cdf06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyZGVkJTIwbWFuJTIwcG9ydHJhaXQlMjB2aWRlb3xlbnwxfHx8fDE3NTcxNjEwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Our Story Video"
              className="w-full h-full object-cover"
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white bg-opacity-90 rounded-lg flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300 shadow-lg">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </div>
            </div>
          </div>

          {/* Video Modal (simplified for demo) */}
          {videoPlaying && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setVideoPlaying(false)}
            >
              <div className="relative max-w-4xl w-full mx-4">
                <div className="bg-white p-8 rounded-lg text-center">
                  <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
                  <p className="text-gray-600 mb-6">
                    This is where our brand video would play, showcasing our journey, 
                    values, and commitment to providing the best beard care products.
                  </p>
                  <Button 
                    onClick={() => setVideoPlaying(false)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
<section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="relative">
      {timelineData.map((item, index) => (
        <div 
          key={item.year} 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 ${
            index === selectedTimelineIndex 
              ? 'opacity-100' 
              : 'opacity-0 absolute inset-0'
          }`}
        >
          {/* Left: Year and Text (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-6xl lg:text-7xl font-bold text-gray-900">
              {item.year}
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
              {item.description2 && (
                <p className="text-gray-600 leading-relaxed">
                  {item.description2}
                </p>
              )}
            </div>
          </div>

          {/* Center: Product Image with Year Navigation */}
          <div className="lg:col-span-6 flex items-start gap-8">
            <div className="w-48 h-48 bg-orange-100 rounded-lg p-4 flex-shrink-0">
              <img
                src="../assets/3.png"
                alt="Our Product"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              {timelineData.map((yearItem, idx) => (
                <div 
                  key={yearItem.year}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedTimelineIndex(idx)}
                >
                  <div className={`text-2xl font-bold ${selectedTimelineIndex === idx ? 'text-yellow-500' : 'text-gray-900'}`}>
                    -{yearItem.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Empty (2 columns) */}
          <div className="lg:col-span-2"></div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}