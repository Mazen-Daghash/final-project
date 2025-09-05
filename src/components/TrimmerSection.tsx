import { useNavigate } from 'react-router-dom';
import exampleImage from 'figma:asset/0af91fe95c501ed0df632e6ea3beb3fd5f709dbb.png';

export default function TrimmerSection() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-slate-800 py-8 lg:py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-4 relative z-10">
            <div className="space-y-3">
              <p className="text-white/80 tracking-wider text-sm">
                VERSATILE. POWERFUL. PERFECT.
              </p>
              <h2 className="text-white text-4xl lg:text-5xl font-bold">
                ABC LC991 Trimmer
              </h2>
            </div>
            
            {/* Orange View More Button */}
            <button 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/products');
              }}
              className="bg-orange-400 hover:bg-orange-500 text-black font-medium px-8 py-3 rounded transition-colors duration-300"
            >
              VIEW MORE
            </button>
          </div>

          {/* Right Content - Trimmer Image */}
          <div className="flex justify-center lg:justify-end relative -mx-4">
            <div className="relative w-full max-w-md h-56 lg:h-72 overflow-hidden">
              <img
                src={exampleImage}
                alt="ABC LC991 Trimmer"
                className="w-full h-full object-contain scale-150 hover:scale-175 transition-transform duration-500 ease-in-out"
                style={{ transformOrigin: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}