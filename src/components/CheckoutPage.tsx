import { useState } from 'react';
import { useCart } from '../lib/cart/cart-context';
import { useAuth } from '../lib/auth/auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('check');

  const subtotal = totalPrice;
  const shipping = 15.00;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Coupon Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-sm text-gray-700">
            Have a coupon?{' '}
            <button 
              onClick={() => setShowCoupon(!showCoupon)}
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Click here to enter your code
            </button>
          </p>
        </div>

        {/* Coupon Form (if shown) */}
        {showCoupon && (
          <div className="bg-white border p-6 mb-8 rounded">
            <p className="text-sm text-gray-600 mb-4">
              If you have a coupon code, please apply it below.
            </p>
            <div className="flex gap-4">
              <Input placeholder="Coupon code" className="flex-1" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                APPLY COUPON
              </Button>
            </div>
          </div>
        )}

        {/* Billing Details */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-medium mb-6">Billing Details</h2>
          
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email address *</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input id="phone" type="tel" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company">Company name (optional)</Label>
                  <Input id="company" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="companyAddress">Company address (optional)</Label>
                  <Input id="companyAddress" className="mt-1" />
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <h3 className="font-medium mb-4">Country</h3>
              <div className="max-w-md">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-medium mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address1">House number and street name *</Label>
                  <Input id="address1" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="address2">Apartment, suite, unit etc. (optional)</Label>
                  <Input id="address2" className="mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Town / City *</Label>
                    <Input id="city" placeholder="City" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="State" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip *</Label>
                    <Input id="zip" placeholder="Zip" className="mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Create Account */}
            <div className="flex items-center space-x-2">
              <Checkbox id="createAccount" />
              <Label htmlFor="createAccount" className="text-sm">
                Create an account?
              </Label>
            </div>

            {/* Order Notes */}
            <div>
              <h3 className="font-medium mb-4">Order Notes (optional)</h3>
              <Textarea 
                placeholder="Notes about your order, e.g. special notes for delivery"
                className="min-h-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Payment Method and Cart Totals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Payment Method */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              {/* Check Payments */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="check" id="check" />
                  <Label htmlFor="check" className="font-medium">Check payments</Label>
                </div>
                {paymentMethod === 'check' && (
                  <div className="mt-3 text-sm text-gray-600">
                    Pay with cash upon delivery.
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="font-medium">Cash on delivery</Label>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="mt-3 text-sm text-gray-600">
                    Pay with cash upon delivery.
                  </div>
                )}
              </div>

              {/* PayPal */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="font-medium flex items-center gap-2">
                    PayPal
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs">Visa</div>
                      <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center text-white text-xs">MC</div>
                      <div className="w-8 h-5 bg-blue-800 rounded-sm flex items-center justify-center text-white text-xs">AE</div>
                      <div className="w-8 h-5 bg-orange-600 rounded-sm flex items-center justify-center text-white text-xs">DC</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6 text-sm text-gray-600">
              Your personal data will be used to process your order, support your experience throughout 
              this website, and for other purposes described in our privacy policy.
            </div>
          </div>

          {/* Cart Totals */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">Cart Totals</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Shipping and Handling</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">VAT</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
                <span className="font-medium text-lg">Order Total</span>
                <span className="font-medium text-lg text-orange-500">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-left">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-medium"
            size="lg"
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  );
}