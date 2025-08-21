import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductHighlights from '@/components/ProductHighlights';
import Footer from '@/components/Footer';
import products from '@/lib/data/products.json';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <ProductHighlights products={products} />
      </main>
      
      <Footer />
    </div>
  );
}
