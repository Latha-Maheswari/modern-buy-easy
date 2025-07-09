
import { useLocation } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Clock, CheckCircle, Truck, RotateCcw } from 'lucide-react';

const Orders = () => {
  const location = useLocation();
  const newOrder = location.state?.newOrder;

  // Mock orders data
  const orders = [
    ...(newOrder ? [{
      id: newOrder.id,
      date: new Date().toLocaleDateString(),
      total: newOrder.total,
      status: 'confirmed',
      items: newOrder.items,
      deliveryDate: 'Dec 12, 2024',
      products: [
        {
          name: 'Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
          quantity: 1,
        }
      ]
    }] : []),
    {
      id: 'ORD789012',
      date: 'Dec 8, 2024',
      total: '149.98',
      status: 'delivered',
      items: 2,
      deliveryDate: 'Dec 10, 2024',
      products: [
        {
          name: 'Smart Watch',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
          quantity: 1,
        },
        {
          name: 'Phone Case',
          image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200',
          quantity: 1,
        }
      ]
    },
    {
      id: 'ORD456789',
      date: 'Dec 5, 2024',
      total: '79.99',
      status: 'shipped',
      items: 1,
      deliveryDate: 'Dec 11, 2024',
      products: [
        {
          name: 'Laptop Backpack',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200',
          quantity: 1,
        }
      ]
    },
    {
      id: 'ORD123456',
      date: 'Dec 1, 2024',
      total: '199.99',
      status: 'cancelled',
      items: 1,
      deliveryDate: 'Cancelled',
      products: [
        {
          name: 'Wireless Speaker',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
          quantity: 1,
        }
      ]
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-lg font-semibold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 mt-20">
          <Package className="h-20 w-20 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
          <p className="text-gray-500 text-center mb-6">
            Your order history will appear here
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Order Products */}
                <div className="space-y-3 mb-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items > order.products.length && (
                    <p className="text-sm text-gray-600 text-center py-2">
                      +{order.items - order.products.length} more items
                    </p>
                  )}
                </div>

                {/* Order Details */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-semibold">${order.total}</span>
                  </div>
                  
                  {order.status !== 'cancelled' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {order.status === 'delivered' 
                          ? `Delivered on ${order.deliveryDate}`
                          : `Expected delivery: ${order.deliveryDate}`
                        }
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Reorder
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    )}
                  </div>
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

export default Orders;
