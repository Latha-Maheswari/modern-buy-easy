
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '../contexts/WishlistContext';

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    inStock: boolean;
  };
  className?: string;
  size?: 'sm' | 'default';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  className = '', 
  size = 'sm' 
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
      });
    }
  };

  return (
    <Button
      size={size}
      variant="ghost"
      onClick={handleToggleWishlist}
      className={`h-8 w-8 p-0 bg-white/80 hover:bg-white ${className}`}
    >
      <Heart 
        className={`h-4 w-4 ${
          isLiked 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-600 hover:text-red-500'
        }`} 
      />
    </Button>
  );
};

export default WishlistButton;
