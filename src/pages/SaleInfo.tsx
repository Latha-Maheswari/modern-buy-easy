import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tag, Clock, Gift, Star, Zap } from 'lucide-react';

const SaleInfo = () => {
  const navigate = useNavigate();

  const currentOffers = [
    {
      id: '1',
      title: 'Weekend Flash Sale',
      description: 'Up to 70% off on electronics and gadgets',
      discount: '70% OFF',
      validUntil: 'Ends Sunday',
      category: 'Electronics',
      icon: Zap,
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Beauty Bonanza',
      description: 'Buy 2 Get 1 Free on all makeup products',
      discount: 'Buy 2 Get 1',
      validUntil: 'This Week Only',
      category: 'Beauty',
      icon: Star,
      color: 'bg-pink-500'
    },
    {
      id: '3',
      title: 'Home Decor Deals',
      description: 'Flat 50% off on home & kitchen items',
      discount: '50% OFF',
      validUntil: '3 Days Left',
      category: 'Home & Kitchen',
      icon: Gift,
      color: 'bg-green-500'
    }
  ];

  const upcomingSales = [
    {
      id: '4',
      title: 'Mega Fashion Week',
      description: 'Biggest sale of the year on fashion items',
      discount: 'Up to 80%',
      startDate: 'Starts Next Monday',
      category: 'Fashion'
    },
    {
      id: '5',
      title: 'Fitness Frenzy',
      description: 'Special discounts on gym and fitness equipment',
      discount: 'Up to 60%',
      startDate: 'Coming Soon',
      category: 'Fitness'
    }
  ];

  const seasonalOffers = [
    {
      id: '6',
      title: 'Winter Special',
      description: 'Cozy up with our winter collection',
      discount: '40% OFF',
      category: 'Winter Wear'
    },
    {
      id: '7',
      title: 'New Year, New You',
      description: 'Refresh your style with our latest arrivals',
      discount: '30% OFF',
      category: 'New Arrivals'
    }
  ];

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
          <h1 className="text-lg font-semibold">Sales & Offers</h1>
        </div>
        <Tag className="h-5 w-5 text-orange-600" />
      </div>

      <div className="p-4 space-y-6">
        {/* Current Offers */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-orange-600" />
            Hot Deals
          </h2>
          <div className="space-y-3">
            {currentOffers.map((offer) => {
              const Icon = offer.icon;
              return (
                <Card key={offer.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className={`w-2 ${offer.color}`}></div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`p-2 rounded-full ${offer.color} bg-opacity-20`}>
                              <Icon className={`h-5 w-5 ${offer.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                              <p className="text-sm text-gray-600 mb-1">{offer.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {offer.category}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {offer.validUntil}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${offer.color} text-white font-bold`}>
                              {offer.discount}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sales */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Coming Soon
          </h2>
          <div className="space-y-3">
            {upcomingSales.map((sale) => (
              <Card key={sale.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{sale.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{sale.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {sale.category}
                        </Badge>
                        <span className="text-xs text-blue-600 font-medium">
                          {sale.startDate}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {sale.discount}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seasonal Offers */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Gift className="h-5 w-5 mr-2 text-green-600" />
            Seasonal Specials
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {seasonalOffers.map((offer) => (
              <Card key={offer.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {offer.category}
                      </Badge>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      {offer.discount}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Notice */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-orange-900 mb-1">Member Exclusive</h3>
            <p className="text-sm text-orange-800 mb-3">
              Get early access to all sales and additional 10% off on your first purchase!
            </p>
            <Button 
              onClick={() => navigate('/profile')}
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
            >
              View Membership Benefits
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SaleInfo;