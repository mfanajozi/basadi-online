
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Share2 } from "lucide-react";
import { products as allProducts, Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      const foundProduct = allProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.product} added to your cart`,
      });
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <PageContainer showBackButton={true} title="Product not found">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Product not found.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer showBackButton={true} title={product.product}>
      <div className="flex flex-col pb-16">
        <div className="relative h-64 w-full">
          <img
            src={product.image}
            alt={product.product}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=768&q=80`;
            }}
          />
          <Button 
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold">{product.product}</h1>
            <p className="text-xl font-bold">{formatCurrency(product.price)}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Ingredients</h3>
            <p className="text-gray-700">{product.ingredients.join(", ")}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
              {product.category}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none h-10 w-10"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-bold text-lg">
              {formatCurrency(product.price * quantity)}
            </p>
          </div>

          <Button 
            className="w-full bg-gold hover:bg-gold-600 text-black font-bold py-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;
