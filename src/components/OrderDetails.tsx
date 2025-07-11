
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, CheckCircle, Truck, RotateCcw, Package } from 'lucide-react';

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onReorder: (order: any) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ isOpen, onClose, order, onReorder }) => {
  if (!order) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order.id}</span>
            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Order Info */}
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{order.date}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold">₹{order.total}</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium mb-3">Items Ordered</h4>
            <div className="space-y-3">
              {order.products.map((product: any, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{product.name}</h5>
                    <p className="text-xs text-gray-600">Qty: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          {order.status !== 'cancelled' && (
            <div className="bg-blue-50 p-3 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium text-sm">Delivery Information</span>
              </div>
              <p className="text-sm text-blue-700">
                {order.status === 'delivered' 
                  ? `Delivered on ${order.deliveryDate}`
                  : `Expected delivery: ${order.deliveryDate}`
                }
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Will be delivered to your default address
              </p>
            </div>
          )}

          {/* Order Tracking */}
          {order.status === 'shipped' && (
            <div className="bg-orange-50 p-3 rounded">
              <h4 className="font-medium text-orange-800 mb-2">Tracking Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Order confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Packed and shipped</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Out for delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {order.status === 'delivered' && (
              <Button 
                onClick={() => {
                  onReorder(order);
                  onClose();
                }}
                className="flex-1"
              >
                Reorder
              </Button>
            )}
            {order.status === 'confirmed' && (
              <Button 
                variant="outline" 
                className="flex-1 text-red-600 hover:text-red-700"
              >
                Cancel Order
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
