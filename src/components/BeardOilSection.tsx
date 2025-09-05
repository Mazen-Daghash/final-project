import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function BeardOilSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-muted-foreground">Provide the best</h4>
              <h3 className="text-primary">Beard Oil For You</h3>
              <p className="text-muted-foreground leading-relaxed">
                We provide the best Beard oil all over the world. We are the world's best store for Beard Oil. You can buy our product without any hesitation because we always focus about our product quality and always maintain it properly so you can trust and this is our main goal we believe that...
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Some of our customers say that they trust us and buy our product without any hesitation because they believe us and are always happy.
              </p>
            </div>
            
            {/* Custom Animated Button */}
            <button 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/products');
              }}
              className="view-more-btn relative overflow-hidden border-2 border-black bg-white text-black px-8 py-3 rounded-lg transition-colors duration-300 hover:text-black"
            >
              <span className="relative z-10">VIEW MORE</span>
              <div className="absolute inset-0 bg-yellow-400 transform -translate-x-full transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>

          {/* Right Content - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655394009794-df4f7cd8582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyZCUyMG9pbCUyMGJvdHRsZSUyMGdyb29taW5nJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY2NDU0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Premium Beard Oil Bottle"
                className="w-full h-auto object-contain"
                style={{ maxHeight: '358px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}