'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Star, 
  Award,
  Package,
  Zap,
  Headphones
} from 'lucide-react';

export default function ProductSpecs({ product }) {
  // Mock specifications based on product type
  const getSpecs = (productName) => {
    if (productName.toLowerCase().includes('headphones')) {
      return [
        { label: 'Driver Size', value: '40mm Dynamic' },
        { label: 'Frequency Response', value: '20Hz - 20kHz' },
        { label: 'Impedance', value: '32 Ohm' },
        { label: 'Battery Life', value: '30 Hours' },
        { label: 'Charging Time', value: '2 Hours' },
        { label: 'Weight', value: '250g' },
      ];
    } else if (productName.toLowerCase().includes('watch')) {
      return [
        { label: 'Display', value: '1.4" AMOLED' },
        { label: 'Battery Life', value: '7 Days' },
        { label: 'Water Resistance', value: '5ATM' },
        { label: 'GPS', value: 'Built-in' },
        { label: 'Storage', value: '32GB' },
        { label: 'Weight', value: '45g' },
      ];
    } else if (productName.toLowerCase().includes('speaker')) {
      return [
        { label: 'Output Power', value: '20W' },
        { label: 'Frequency Range', value: '80Hz - 20kHz' },
        { label: 'Bluetooth', value: '5.0' },
        { label: 'Battery Life', value: '12 Hours' },
        { label: 'Water Rating', value: 'IPX7' },
        { label: 'Range', value: '30 meters' },
      ];
    } else {
      return [
        { label: 'Dimensions', value: '10 x 5 x 2 cm' },
        { label: 'Weight', value: '150g' },
        { label: 'Material', value: 'Premium Aluminum' },
        { label: 'Connectivity', value: 'USB-C, Wireless' },
        { label: 'Compatibility', value: 'Universal' },
        { label: 'Warranty', value: '2 Years' },
      ];
    }
  };

  const specifications = getSpecs(product.name);

  const features = [
    {
      icon: <Truck className="h-5 w-5 text-green-600" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50'
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: '2 Year Warranty',
      description: 'Comprehensive coverage included'
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-purple-600" />,
      title: '30-Day Returns',
      description: 'Easy returns and exchanges'
    },
    {
      icon: <Headphones className="h-5 w-5 text-orange-600" />,
      title: '24/7 Support',
      description: 'Expert customer service'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Product Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span>What&apos;s Included</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span>Specifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index}>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900">{spec.label}</span>
                  <Badge variant="secondary">{spec.value}</Badge>
                </div>
                {index < specifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-blue-600" />
            <span>Key Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-green-600" />
              <span className="text-sm">Premium build quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Advanced technology</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Reliable performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Award-winning design</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
