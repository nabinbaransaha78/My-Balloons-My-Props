
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CheckoutForm from './CheckoutForm';

const PropsStore = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Balloon Bouquet - Classic',
      price: 25,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      description: 'Beautiful balloon bouquet with 12 colorful balloons'
    },
    {
      id: 2,
      name: 'Birthday Banner Set',
      price: 15,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      description: 'Complete birthday banner with customizable text'
    },
    {
      id: 3,
      name: 'Photo Booth Props Kit',
      price: 35,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      description: '20-piece photo booth props for memorable pictures'
    },
    {
      id: 4,
      name: 'Table Centerpiece',
      price: 40,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      description: 'Elegant table centerpiece with balloons and flowers'
    },
    {
      id: 5,
      name: 'Balloon Arch Kit',
      price: 85,
      image: 'https://images.unsplash.com/photo-1583342926306-3b1185e0c4a1?w=400&h=300&fit=crop',
      description: 'DIY balloon arch kit with 100 balloons and tools'
    },
    {
      id: 6,
      name: 'Party Streamer Pack',
      price: 12,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      description: 'Colorful streamers and confetti for decoration'
    }
  ];

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };

  return (
    <section id="props" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Props</span> <span className="text-gray-800">Store</span>
          </h2>
          
          <div className="w-24 h-1 gradient-festive mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your celebration with our premium party props and decorations. 
            Quality items delivered to make your event unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1 rounded-full font-bold">
                  ${product.price}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {product.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                
                <Button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  🛒 Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-soft p-8 rounded-2xl shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Something Custom?</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              We can create custom props and decorations for your specific theme or event needs.
            </p>
            <Button className="bg-brand-yellow hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Request Custom Props
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedProduct && (
        <CheckoutForm 
          product={selectedProduct}
          onClose={handleCloseCheckout}
        />
      )}
    </section>
  );
};

export default PropsStore;
