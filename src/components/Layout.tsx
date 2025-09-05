import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showSections?: boolean;
}

export default function Layout({ children, showSections = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {children}
        {showSections && (
          <div className="mt-auto">
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}