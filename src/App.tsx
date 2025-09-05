import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './lib/auth/auth-context';
import { CartProvider } from './lib/cart/cart-context';
import Layout from './components/Layout';
import { LoginPage } from './components/login';
import { RegisterPage } from './components/Register';
import { CartPage } from './components/CartPage'; 
import CheckoutPage from './components/CheckoutPage';
import ProductsPage from './components/ProductsPage';
import HeroSection from './components/HeroSection';
import BeardOilSection from './components/BeardOilSection';
import BeardGrowthSection from './components/BeardGrowthSection';
import OurProductsSection from './components/OurProductsSection';
import TrimmerSection from './components/TrimmerSection';
import GroomingToolsSection from './components/GroomingToolsSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import BrandsSection from './components/BrandsSection';
import FeaturesSection from './components/FeaturesSection';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Handle navigation after auth state changes
  useEffect(() => {
    if (!loading && !isAuthenticated && 
        !['/login', '/register', '/'].includes(window.location.pathname)) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout showSections={false}>
              <HeroSection />
              <BeardOilSection />
              <BeardGrowthSection />
              <OurProductsSection />
              <TrimmerSection />
              <GroomingToolsSection />
              <TestimonialsSection />
              <NewsletterSection />
              <BrandsSection />
              <FeaturesSection />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Layout>
              <CartPage />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Layout>
              <CheckoutPage />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <Layout>
              <ProductsPage />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default App;