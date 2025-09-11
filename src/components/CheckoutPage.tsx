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
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('check');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: user?.email || '',
    orderNotes: '',
    createAccount: false,
    shipToDifferentAddress: false,
  });
  
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const shipping = 15.00;
  const tax = subtotal * 0.08; // 8% tax
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'leggera20') {
      const discountAmount = subtotal * 0.2; // 20% discount
      setDiscount(discountAmount);
      setIsCouponApplied(true);
      toast.success('Coupon applied successfully! 20% discount added.');
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
      toast.error('Invalid coupon code');
    }
  };
  
  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setIsCouponApplied(false);
    toast.info('Coupon removed');
  };
  
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      'firstName', 'lastName', 'streetAddress', 
      'city', 'state', 'postcode', 'phone', 'email'
    ] as const;
    
    requiredFields.forEach(field => {
      if (!billingDetails[field]) {
        errors[field] = '<span style="color: red;">This field is required</span>';
      } else if (field === 'email' && !/\S+@\S+\.\S+/.test(billingDetails.email)) {
        errors.email = '<span style="color: red;">Please enter a valid email</span>';
      } else if (field === 'phone' && !/^[0-9\-+ ]+$/.test(billingDetails.phone)) {
        errors.phone = '<span style="color: red;">Please enter a valid phone number</span>';
      }
    });
    
    setFormErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      firstError: Object.keys(errors)[0] || null
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, firstError } = validateForm();
    
    if (!isValid && firstError) {
      // Wait for the next render cycle to ensure errors are displayed
      requestAnimationFrame(() => {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus({ preventScroll: true });
        }
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear cart
      clearCart();
      
      // Show success message
      toast.success('Order placed successfully!', {
        description: 'Thank you for your purchase. Your order has been received.'
      });
      
      // Scroll to top before navigation
      window.scrollTo({ top: 0 });
      
      // Redirect to home page
      navigate('/', { replace: true });
      
    } catch (error) {
      toast.error('Failed to place order', {
        description: 'There was an error processing your order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Click here to enter your code (LEGGERA20)
            </button>
          </p>
        </div>

        {/* Coupon Form (if shown) */}
        {showCoupon && (
          <div className="bg-white border p-6 mb-8 rounded">
            <p className="text-sm text-gray-600 mb-4">
              If you have a coupon code, please apply it below.
            </p>
            <div className="flex items-center gap-2">
              <Input 
                type="text" 
                placeholder="Coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
                disabled={isCouponApplied}
              />
              {isCouponApplied ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleRemoveCoupon}
                  className="whitespace-nowrap"
                >
                  Remove Coupon
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleApplyCoupon}
                  className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap"
                >
                  Apply Coupon
                </Button>
              )}
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
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={billingDetails.firstName} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                  {formErrors.firstName && (
                    <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.firstName }} />
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={billingDetails.lastName} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                  {formErrors.lastName && (
                    <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.lastName }} />
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={billingDetails.email} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                  {formErrors.email && (
                    <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.email }} />
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    name="phone" 
                    value={billingDetails.phone} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                  {formErrors.phone && (
                    <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.phone }} />
                  )}
                </div>
                <div>
                  <Label htmlFor="company">Company name (optional)</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={billingDetails.company} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="companyAddress">Company address (optional)</Label>
                  <Input 
                    id="companyAddress" 
                    name="companyAddress" 
                    value={billingDetails.companyAddress} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <h3 className="font-medium mb-4">Country</h3>
              <div className="max-w-md">
                <Select>
                  <SelectTrigger>
                    <SelectValue 
                      placeholder="Select Country *" 
                      value={billingDetails.country} 
                      onChange={handleInputChange} 
                      name="country" 
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.country && (
                  <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.country }} />
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-medium mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="streetAddress">House number and street name *</Label>
                  <Input 
                    id="streetAddress" 
                    name="streetAddress" 
                    value={billingDetails.streetAddress} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                  {formErrors.streetAddress && (
                    <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.streetAddress }} />
                  )}
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment, suite, unit etc. (optional)</Label>
                  <Input 
                    id="apartment" 
                    name="apartment" 
                    value={billingDetails.apartment} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Town / City *</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={billingDetails.city} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                    {formErrors.city && (
                      <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.city }} />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={billingDetails.state} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                    {formErrors.state && (
                      <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.state }} />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postcode">Zip *</Label>
                    <Input 
                      id="postcode" 
                      name="postcode" 
                      value={billingDetails.postcode} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                    {formErrors.postcode && (
                      <div className="text-red-500 text-sm mt-1" dangerouslySetInnerHTML={{ __html: formErrors.postcode }} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <h3 className="font-medium mb-4">Order Notes (optional)</h3>
              <Textarea 
                id="orderNotes" 
                name="orderNotes" 
                value={billingDetails.orderNotes} 
                onChange={handleInputChange} 
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
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Discount (20% OFF)</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">LEGGERA20</span>
                  </div>
                  <span className="text-green-600 font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-left">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-medium"
            size="lg"
            onClick={handleSubmitOrder}
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
          </Button>
        </div>
      </div>
    </div>
  );
}