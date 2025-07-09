
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="text-center text-white animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-full p-6 shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          ShopEase
        </h1>
        
        <p className="text-xl mb-8 text-blue-100 max-w-md mx-auto">
          Your one-stop destination for everything you need, delivered right to your door
        </p>
        
        <Button 
          onClick={() => navigate('/auth')}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Splash;
