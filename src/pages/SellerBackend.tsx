
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Upload, Download, Package, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { products as initialProducts } from '../data/products';

const SellerBackend = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [products, setProducts] = useState(initialProducts);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: '',
    isNewArrival: false,
    images: [''],
    features: [''],
    specifications: { Brand: '', Material: '', Color: '' },
  });

  const categories = [
    'Makeup & Beauty',
    'Electronics',
    'Home Decor',
    'Gym & Fitness',
    'Bags',
    'Books',
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      originalPrice: parseInt(newProduct.originalPrice) || parseInt(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock) || 0,
      stockCount: parseInt(newProduct.stock) || 0,
      inStock: parseInt(newProduct.stock) > 0,
      isNewArrival: newProduct.isNewArrival,
      image: newProduct.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      images: newProduct.images.filter(img => img.trim() !== ''),
      description: newProduct.description,
      features: newProduct.features.filter(f => f.trim() !== ''),
      specifications: newProduct.specifications,
      rating: 4.0,
      reviews: 0,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      description: '',
      isNewArrival: false,
      images: [''],
      features: [''],
      specifications: { Brand: '', Material: '', Color: '' },
    });
    setShowAddProduct(false);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, inStock: !p.inStock, stockCount: p.inStock ? 0 : 10 }
        : p
    ));
    toast.success('Product status updated!');
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Price,Original Price,Category,Stock,Status,New Arrival\n"
      + products.map(p => 
          `"${p.name}",${p.price},${p.originalPrice},"${p.category}",${p.stockCount},"${p.inStock ? 'In Stock' : 'Out of Stock'}",${p.isNewArrival}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Products exported to CSV!');
  };

  const addImageField = () => {
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, '']
    });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...newProduct.images];
    newImages[index] = value;
    setNewProduct({ ...newProduct, images: newImages });
  };

  const addFeatureField = () => {
    setNewProduct({
      ...newProduct,
      features: [...newProduct.features, '']
    });
  };

  const updateFeatureField = (index: number, value: string) => {
    const newFeatures = [...newProduct.features];
    newFeatures[index] = value;
    setNewProduct({ ...newProduct, features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your products and inventory - Lovable India</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Arrivals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.isNewArrival).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => !p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
        <Button 
          variant="outline"
          onClick={exportToCSV}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddProduct && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                <Input
                  type="number"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                  placeholder="1299"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  placeholder="50"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="newArrival"
                  checked={newProduct.isNewArrival}
                  onChange={(e) => setNewProduct({...newProduct, isNewArrival: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="newArrival" className="text-sm font-medium">Mark as New Arrival</label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Product Description</label>
              <Textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Enter product description..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images (URLs)</label>
              {newProduct.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={img}
                    onChange={(e) => updateImageField(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Features</label>
              {newProduct.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeatureField(index, e.target.value)}
                    placeholder="Enter product feature"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeatureField}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory ({products.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-medium">₹{product.price}</span>
                          {product.originalPrice !== product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={product.inStock ? 'default' : 'destructive'}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        {product.isNewArrival && (
                          <Badge variant="secondary">New Arrival</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-600">Stock: {product.stockCount}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleProductStatus(product.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Toggle Status
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerBackend;
