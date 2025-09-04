import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Grid, List, Search, Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cart/cart-context';
import { toast } from 'sonner'; // Import toast

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isOnSale?: boolean;
  category: string;
  tags: string[];
  size?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Beard Care Oil',
    price: 15.50,
    originalPrice: 18.99,
    image: new URL('../assets/1.png', import.meta.url).href,
    rating: 4.5,
    isOnSale: true,
    category: 'Beard Oil',
    tags: ['popular', 'beard', 'oil'],
    size: 'S'
  },
  {
    id: '2',
    name: 'Beard Growth Vitamin',
    price: 25.99,
    image: new URL('../assets/2.png', import.meta.url).href,
    rating: 4.8,
    category: 'Hair Oil',
    tags: ['grooming', 'vitamin', 'growth'],
    size: 'M'
  },
  {
    id: '3',
    name: 'Beard Growth Oil',
    price: 17.50,
    image: new URL('../assets/3.png', import.meta.url).href,
    rating: 4.3,
    isOnSale: true,
    category: 'Beard Oil',
    tags: ['oil', 'growth', 'natural'],
    size: 'L'
  },
  {
    id: '4',
    name: 'Beard Essentials',
    price: 19.90,
    originalPrice: 24.99,
    image: new URL('../assets/4.png', import.meta.url).href,
    rating: 4.6,
    category: 'Grooming Tools',
    tags: ['essential', 'kit', 'grooming'],
    size: 'XL'
  },
  {
    id: '5',
    name: 'Beard Shampoo',
    price: 12.99,
    image: new URL('../assets/5.png', import.meta.url).href,
    rating: 4.2,
    category: 'Beard Oil',
    tags: ['shampoo', 'cleaning', 'care'],
    size: 'M'
  },
  {
    id: '6',
    name: 'Beard Care Oil',
    price: 22.99,
    originalPrice: 28.99,
    image: new URL('../assets/4.png', import.meta.url).href,
    rating: 4.7,
    isOnSale: true,
    category: 'Beard Oil',
    tags: ['premium', 'oil', 'natural'],
    size: 'L'
  },
  {
    id: '7',
    name: 'Beard Growth Vitamins',
    price: 18.99,
    originalPrice: 22.99,
    image: new URL('../assets/7.png', import.meta.url).href,
    rating: 4.4,
    category: 'Hair Oil',
    tags: ['vitamin', 'growth', 'supplement'],
    size: 'XL'
  },
  {
    id: '8',
    name: 'Beard Growth Oil',
    price: 14.99,
    image: new URL('../assets/2.png', import.meta.url).href,
    rating: 4.1,
    category: 'Beard Oil',
    tags: ['oil', 'basic', 'starter'],
    size: 'S'
  },
  {
    id: '9',
    name: 'Beard Care Oil',
    price: 16.99,
    image: new URL('../assets/3.png', import.meta.url).href,
    rating: 4.3,
    isOnSale: true,
    category: 'Beard Oil',
    tags: ['oil', 'care', 'moisturizing'],
    size: 'M'
  },
  {
    id: '10',
    name: 'Beard Growth Oil',
    price: 19.50,
    originalPrice: 23.99,
    image: new URL('../assets/5.png', import.meta.url).href,
    rating: 4.5,
    category: 'Hair Oil',
    tags: ['growth', 'oil', 'strengthening'],
    size: 'L'
  },
  {
    id: '11',
    name: 'Beard Essentials',
    price: 29.99,
    originalPrice: 35.99,
    image: new URL('../assets/1.png', import.meta.url).href,
    rating: 4.8,
    category: 'Grooming Tools',
    tags: ['complete', 'kit', 'professional'],
    size: 'XL'
  },
  {
    id: '12',
    name: 'Beard Growth Vitamins',
    price: 21.99,
    originalPrice: 26.99,
    image: new URL('../assets/1.png', import.meta.url).href,
    rating: 4.6,
    category: 'Hair Oil',
    tags: ['vitamin', 'natural', 'organic'],
    size: 'M'
  }
];

const categories = [
  { name: 'Beard Oil', count: 15 },
  { name: 'Hair Oil', count: 8 },
  { name: 'Body Oil', count: 6 },
  { name: 'Grooming Tools', count: 12 },
  { name: 'Supplements', count: 4 }
];

const topRatedProducts = [
  {
    id: 'top-1',
    name: 'Mint Solid Seal Corer',
    price: 65.99,
    originalPrice: 89.99,
    image: new URL('../assets/7.png', import.meta.url).href,
    rating: 5
  },
  {
    id: 'top-2',
    name: 'Hair Oil Conversion Kit',
    price: 15.50,
    image: new URL('../assets/5.png', import.meta.url).href,
    rating: 5
  },
  {
    id: 'top-3',
    name: 'Oil Spring Conversion',
    price: 23.50,
    image: new URL('../assets/6.png', import.meta.url).href,
    rating: 4
  }
];

const popularTags = [
  'POPULAR', 'BEARD', 'OIL', 'CREAM', 'UK', 'STYLING',
  'USABILITY', 'LGR', 'GIL', 'OIL ORANGE', 'BODY COLOR'
];

const productSizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([5, 50]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => 
      product.tags.some(productTag => productTag.toLowerCase().includes(tag.toLowerCase()))
    );
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size || '');

    return matchesSearch && matchesPrice && matchesCategory && matchesTags && matchesSize;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Show success toast
    toast.success(`${product.name} has been added to your cart!`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Showing 1–12 of {filteredProducts.length} results
                </span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Default Sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Sorting</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div 
                    className="relative bg-gray-50 rounded-lg p-8 mb-4 transition-transform group-hover:scale-105 cursor-pointer"
                    onClick={() => {}}
                  >
                    {/* Product Badge */}
                    {product.isOnSale && (
                      <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 text-xs font-medium rounded">
                        SALE
                      </div>
                    )}

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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
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
                    <h3 className="text-gray-900 font-medium mb-2">{product.name}</h3>
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

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Product Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Product Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    className={`flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-50 ${
                      selectedCategory === category.name ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Objects */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Search Objects</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search your account..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600">
                  Go
                </Button>
              </div>
            </div>

            {/* Filter By Price */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Filter By Price</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Your range:</span>
                  <span>${priceRange[0]} - ${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Top Rated Product */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Top Rated Product</h3>
              <div className="space-y-4">
                {topRatedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="text-xs h-7"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Product Size */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Product Size</h3>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}