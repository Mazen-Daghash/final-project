import { ImageWithFallback } from './figma/ImageWithFallback';

// Brand data - easily customizable
const brands = [
  {
    id: 1,
    name: "Brand One",
    image: new URL('../assets/1(1).png', import.meta.url).href,
  },
  {
    id: 2,
    name: "Brand Two",
    image: new URL('../assets/2(1).png', import.meta.url).href,
  },
  {
    id: 3,
    name: "Brand Three",
    image: new URL('../assets/3(1).png', import.meta.url).href,
  },
  {
    id: 4,
    name: "Brand Four",
    image: new URL('../assets/4(1).png', import.meta.url).href,
  },
  {
    id: 5,
    name: "Brand Five",
    image: new URL('../assets/5(1).png', import.meta.url).href,
  },
];

export default function BrandsSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="w-[85%] mx-auto">
        {/* Brands Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 xl:gap-20">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <ImageWithFallback
                src={brand.image}
                alt={brand.name}
                className="h-16 sm:h-20 lg:h-24 w-auto max-w-[200px] lg:max-w-[250px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}