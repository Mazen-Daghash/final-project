import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Arowana</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to providing premium grooming products that enhance your natural beauty and confidence. 
            Our carefully curated collection features the finest ingredients and innovative formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with a passion for quality and innovation, Arowana has been at the forefront of the beauty 
              and grooming industry. We believe that everyone deserves access to premium products that make them 
              look and feel their best.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to excellence drives us to continuously research and develop new formulations that 
              meet the evolving needs of our customers. From skincare to grooming tools, every product in our 
              collection is carefully selected for its quality and effectiveness.
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">Quality ingredients and formulations</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">Sustainable and ethical practices</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">Customer satisfaction and support</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">Innovation and continuous improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}