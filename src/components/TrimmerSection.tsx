import exampleImage from 'figma:asset/0af91fe95c501ed0df632e6ea3beb3fd5f709dbb.png';

export default function TrimmerSection() {
  return (
    <section className="bg-slate-800 py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-6">
              <p className="text-white/80 tracking-wider text-sm">
                VERSATILE. POWERFUL. PERFECT.
              </p>
              <h2 className="text-white text-4xl lg:text-5xl font-bold">
                ABC LC991 Trimmer
              </h2>
            </div>
            
            {/* Orange View More Button */}
            <button className="bg-orange-400 hover:bg-orange-500 text-black font-medium px-8 py-3 rounded transition-colors duration-300">
              VIEW MORE
            </button>
          </div>

          {/* Right Content - Trimmer Image */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative">
              <img
                src={exampleImage}
                alt="ABC LC991 Trimmer"
                className="w-full max-w-md h-auto object-contain"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-0 w-2 h-2 bg-white rounded-full opacity-60"></div>
              <div className="absolute bottom-1/3 left-0 w-1 h-1 bg-white rounded-full opacity-40"></div>
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Background decorative diamond shape */}
        <div className="absolute bottom-8 right-8 transform rotate-45">
          <div className="w-12 h-12 border-2 border-white/20"></div>
        </div>
      </div>
    </section>
  );
}