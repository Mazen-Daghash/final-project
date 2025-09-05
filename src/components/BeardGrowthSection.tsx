import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const growthImage = "https://images.unsplash.com/photo-1659223165847-f131ed27941c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGJlYXJkJTIwZ3Jvd3RoJTIwc3RhcnRpbmclMjBmYWNiYWwlMjBoYWlyfGVufDF8fHx8MTc1Njg5NzY1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const groomingImage = "https://images.unsplash.com/photo-1656587324100-6bb6a6223a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBsdXNjaW91cyUyMGZ1bGwlMjBiZWFyZCUyMGdyb29taW5nfGVufDF8fHx8MTc1Njg5NzY1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function BeardGrowthSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[250px]">
        {/* Left Side - GROW IT */}
        <div className="relative overflow-hidden group">
          <ImageWithFallback 
            src={growthImage}
            alt="Young man with starting beard growth"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
            <div className="text-left">
              <p className="text-xs font-medium text-white mb-1 tracking-wider opacity-90">
                GROW IT
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Just<br />Starting?
              </h2>
              <Button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/products');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-none font-medium text-xs tracking-wide transition-all hover:scale-105"
              >
                TRY A GROWTH KIT
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - GROOM IT */}
        <div className="relative overflow-hidden group">
          <ImageWithFallback 
            src={groomingImage}
            alt="Man with luscious full beard"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
            <div className="text-right">
              <p className="text-xs font-medium text-white mb-1 tracking-wider opacity-90">
                GROOM IT
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Luscious<br />Beard?
              </h2>
              <Button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/products');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-none font-medium text-xs tracking-wide transition-all hover:scale-105"
              >
                TRY A GROWTH KIT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}