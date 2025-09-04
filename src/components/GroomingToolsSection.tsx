import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/88f5e322de00e1191afb0c095620b61c4f64fa1c.png';
import { useCart } from '../lib/cart/cart-context';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const groomingProducts: Product[] = [
  {
    id: 1,
    name: 'Beard Oil',
    price: 24.99,
    originalPrice: 34.99,
    image: new URL('../assets/15.png', import.meta.url).href,
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: 'Beard Balm',
    price: 19.99,
    image: new URL('../assets/14.png', import.meta.url).href,
    isNew: true,
  },
  {
    id: 3,
    name: 'Beard Shampoo',
    price: 14.99,
    image: new URL('../assets/13.png', import.meta.url).href,
    isSale: true,
  },
];

export default function GroomingToolsSection() {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<number | null>(null);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(product.id);
    
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      
      toast.success(`${product.name} added to cart!`, {
        position: 'bottom-center',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Failed to add item to cart', {
        position: 'bottom-center',
      });
    } finally {
      setIsAdding(null);
    }
  };

  const handleProductClick = (product: Product) => {
    // Handle product click
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Grooming Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of grooming tools designed for the modern man.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {groomingProducts.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative bg-gray-50 rounded-lg p-8 mb-4 transition-transform group-hover:scale-105 cursor-pointer">
                {/* NEW Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 text-xs font-medium rounded">
                    NEW
                  </div>
                )}

                {/* SALE Badge */}
                {product.isSale && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded">
                    SALE
                  </div>
                )}

                {/* Product Image */}
                <div className="w-full h-48 flex items-center justify-center mb-4">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-contain"
                    fallbackSrc={exampleImage}
                  />
                </div>

                {/* Action Icons */}
                <div 
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  } transition-opacity`}
                >
                  <button 
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    className={`w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer ${
                      isAdding === product.id ? 'opacity-70 cursor-wait' : ''
                    }`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAdding === product.id}
                  >
                    <ShoppingCart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle add to wishlist
                    }}
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-primary mb-2">{product.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-orange-500 font-medium">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}