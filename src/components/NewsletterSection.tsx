import { useState } from 'react';
import exampleImage from 'figma:asset/4a4e0f686f29eb13ff7f174cd35e926b95e6ba78.png';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
  };

  return (
    <section 
      className="relative py-20 lg:py-32 bg-gray-100"
      style={{
        backgroundImage: `url(${exampleImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-90"></div>
      
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-primary mb-6">
          We make your inbox better
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Sign up to our newsletter to receive grooming tips, style inspiration, 
          exclusive access to pre-launch product pricing and more.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}