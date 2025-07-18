
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import BottomNavigation from '../components/BottomNavigation';
import OrderDetails from '../components/OrderDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Package, MapPin, Clock, CheckCircle, Truck, RotateCcw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Orders = () => {
  const location = useLocation();
  const { addItem } = useCart();
  const newOrder = location.state?.newOrder;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // Only show orders that come from actual checkout
  const orders = newOrder ? [{
    id: newOrder.id,
    date: new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    total: newOrder.total,
    status: 'confirmed',
    items: newOrder.items,
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    products: newOrder.products || [{
      name: newOrder.productName || 'Recent Purchase',
      image: newOrder.productImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      quantity: newOrder.items || 1,
    }]
  }] : [];

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setIsCancelDialogOpen(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      toast({
        title: "Order Cancelled",
        description: `Order #${orderToCancel} has been cancelled successfully.`,
      });
      setIsCancelDialogOpen(false);
      setOrderToCancel(null);
    }
  };

  const handleReorder = (order: any) => {
    // Add all items from the order to cart
    order.products.forEach((product: any) => {
      for (let i = 0; i < product.quantity; i++) {
        addItem({
          id: product.id || Math.random().toString(),
          name: product.name,
          price: parseFloat(order.total.replace('₹', '').replace(',', '')) / order.products.length,
          image: product.image
        });
      }
    });

    toast({
      title: "Items Added to Cart",
      description: `${order.products.length} items from order #${order.id} have been added to your cart.`,
    });
  };

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
            Your order history will appear here after you make your first purchase
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
                    <span className="font-semibold">₹{order.total}</span>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleReorder(order)}
                      >
                        Reorder
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-red-600 hover:text-red-700"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetails
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        order={selectedOrder}
        onReorder={handleReorder}
        onCancel={handleCancelOrder}
      />

      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-gray-600">
              💬 "Are you sure you want to cancel this order? We'd hate to see it go, but we're here if you change your mind!"
            </p>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
              className="flex-1"
            >
              Keep Order
            </Button>
            <Button
              onClick={confirmCancelOrder}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Orders;
