import { Truck, Award, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free home delivery",
    description: "Provide free home delivery for all product over $100"
  },
  {
    id: 2,
    icon: Award,
    title: "Quality Products",
    description: "We ensure the product quality that is our main goal"
  },
  {
    id: 3,
    icon: RotateCcw,
    title: "3 Days Return",
    description: "Return product within 3 days for any product you buy"
  },
  {
    id: 4,
    icon: Headphones,
    title: "Online Support",
    description: "We ensure the product quality that you can trust easily"
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative -mt-8 -mb-8 py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}