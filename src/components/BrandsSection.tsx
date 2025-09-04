import { ImageWithFallback } from './figma/ImageWithFallback';

// Brand data - easily customizable
const brands = [
  {
    id: 1,
    name: "Brand One",
    logo: "https://images.unsplash.com/photo-1622465911368-72162f8da3e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGxvZ28lMjBjb21wYW55fGVufDF8fHx8MTc1NjcxNjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Brand Two",
    logo: "https://images.unsplash.com/photo-1661347998423-b15d37d6f61e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzU2NjQzODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "Brand Three",
    logo: "https://images.unsplash.com/photo-1618329918461-51bb072e0ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjBsb2dvfGVufDF8fHx8MTc1NjY0NjI5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    name: "Brand Four",
    logo: "https://images.unsplash.com/photo-1659893982154-d4f9a9f0922e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxvZ28lMjBkZXNpZ258ZW58MXx8fHwxNzU2NzA5ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    name: "Brand Five",
    logo: "https://images.unsplash.com/photo-1749443213862-c2f1d1f44a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBicmFuZCUyMGxvZ298ZW58MXx8fHwxNzU2NjQ2MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
                src={brand.logo}
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