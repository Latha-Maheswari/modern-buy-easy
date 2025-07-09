
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Zap, Shield, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { getProductById } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Product not found</h2>
          <Button onClick={() => navigate('/home')}>Go back to home</Button>
        </div>
      </div>
    );
  }

  const reviews = [
    {
      id: 1,
      user: 'Priya S.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Amazing product! Perfect quality and fast delivery. Highly recommend!',
    },
    {
      id: 2,
      user: 'Anjali M.',
      rating: 4,
      date: '1 month ago',
      comment: 'Great quality and the price is very reasonable. Good value for money.',
    },
    {
      id: 3,
      user: 'Kavya R.',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent product! Exactly as described and works perfectly.',
    },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white">
        <div className="relative">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl font-semibold flex-1">{product.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              In Stock ({product.stockCount})
            </Badge>
            {product.isNewArrival && (
              <Badge className="bg-green-500">New Arrival</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
          <Badge variant="destructive" className="text-sm">
            Save ₹{(product.originalPrice - product.price)}
          </Badge>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Truck className="h-5 w-5 mx-auto text-green-600 mb-1" />
            <span className="text-xs text-gray-600">Free Delivery</span>
          </div>
          <div className="text-center">
            <Shield className="h-5 w-5 mx-auto text-blue-600 mb-1" />
            <span className="text-xs text-gray-600">100% Authentic</span>
          </div>
          <div className="text-center">
            <Zap className="h-5 w-5 mx-auto text-orange-600 mb-1" />
            <span className="text-xs text-gray-600">Same Day Delivery</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="mt-2">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">About this product</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="mt-2">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card className="mt-2">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Product Details</h3>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Customer Reviews ({product.reviews})</h3>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{review.user}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                {review.id !== reviews[reviews.length - 1]?.id && (
                  <Separator className="mt-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="flex items-center space-x-3 max-w-md mx-auto">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="h-10 w-10"
            >
              -
            </Button>
            <span className="px-3 py-2 min-w-[3rem] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10"
            >
              +
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            <Zap className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductDetails;
