import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cart/cart-context';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  badge: string;
  badgeColor: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Beard Care Oil",
    price: 149.00,
    originalPrice: 162.00,
    badge: "NEW",
    badgeColor: "bg-orange-400",
    image: new URL('../assets/1.png', import.meta.url).href,
    category: "new"
  },
  {
    id: 2,
    name: "Beard Growth Vitamins",
    price: 129.00,
    originalPrice: 145.00,
    badge: "NEW",
    badgeColor: "bg-orange-400",
    image: new URL('../assets/2.png', import.meta.url).href,
    category: "new"
  },
  {
    id: 3,
    name: "Beard Growth Oil",
    price: 119.00,
    originalPrice: null,
    badge: "SALE",
    badgeColor: "bg-orange-400",
    image: new URL('../assets/3.png', import.meta.url).href,
    category: "sale"
  },
  {
    id: 4,
    name: "Beard Facewash",
    price: 123.00,
    originalPrice: 140.00,
    badge: "NEW",
    badgeColor: "bg-orange-400",
    image: new URL('../assets/4.png', import.meta.url).href,
    category: "new"
  }
];

const filterTabs = [
  { id: 'popular', label: 'POPULAR' },
  { id: 'new', label: 'NEW' },
  { id: 'sale', label: 'BEST SALE' }
];

export default function OurProductsSection() {
  const [activeFilter, setActiveFilter] = useState('popular');
  const [isAdding, setIsAdding] = useState<number | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = activeFilter === 'popular' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(product.id);
    
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
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
    console.log(product);
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Our Products</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            There are many variations of passages of Lorem Ipsum available.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-6 py-3 border border-gray-300 transition-colors ${
                  activeFilter === tab.id
                    ? 'border-black bg-black text-white'
                    : 'bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div 
                className="relative bg-gray-50 rounded-lg p-8 mb-4 transition-transform group-hover:scale-105 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Badge */}
                <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 text-xs font-medium rounded`}>
                  {product.badge}
                </div>

                {/* Product Image */}
                <div className="aspect-square flex items-center justify-center">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain max-w-[200px] max-h-[200px]"
                  />
                </div>
                
                {/* Action Icons */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    onClick={(e) => e.stopPropagation()}
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