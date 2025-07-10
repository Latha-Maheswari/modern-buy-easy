
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Wireless Earbuds',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      inStock: true
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
      inStock: true
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
      inStock: false
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">My Wishlist</h1>
          <p className="text-sm text-gray-600">{wishlistItems.length} items</p>
        </div>
        <Heart className="h-5 w-5 text-pink-600" />
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 mt-20">
          <Heart className="h-20 w-20 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Add items you love to your wishlist
          </p>
          <Button onClick={() => navigate('/home')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-lg font-semibold text-orange-600">₹{item.price.toLocaleString()}</p>
                    <p className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Wishlist;
