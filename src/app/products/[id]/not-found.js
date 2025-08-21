import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Product Not Found
              </h1>
              
              <p className="text-gray-600 mb-8">
                Sorry, we couldn&apos;t find the product you&apos;re looking for. 
                It might have been removed or the URL might be incorrect.
              </p>

              <div className="space-y-3">
                <Link href="/products">
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Browse All Products</span>
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Back to Home</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
