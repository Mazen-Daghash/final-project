import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-4">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Arowana</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Lorem Ipsum is Simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Brooklyn, New York, United States</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>+012-345-6789</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>example@example.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors cursor-pointer">
                <Youtube className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">All Products</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Locations Map</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Order tracking</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Wish List</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Login</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">My account</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Promotional Offers</a></li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Login</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">My account</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Wish List</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Order tracking</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Subscribe to our weekly Newsletter and receive updates via email.
            </p>
            
            {/* Email Subscription */}
            <div className="flex mb-6">
              <Input 
                type="email" 
                placeholder="Email*" 
                className="rounded-r-none border-r-0 bg-white"
              />
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600 px-4">
                <span className="text-sm">✓</span>
              </Button>
            </div>

            {/* Payment Methods */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 text-sm">We Accept</h5>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">PayPal</div>
                <div className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-semibold">VISA</div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-semibold">DISCOVER</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 mt-12 pt-4">
        <div className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-300 mb-2 sm:mb-0">
                All Rights Reserved at Company 2025
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Claim</a>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy & Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}