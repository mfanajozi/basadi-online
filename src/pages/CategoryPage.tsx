
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/food/ProductCard";
import { getProductsByCategory, Product } from "@/data/products";
import { categories } from "@/data/categories";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      const categoryProducts = getProductsByCategory(categoryId);
      setProducts(categoryProducts);
      
      const category = categories.find(cat => cat.id === categoryId);
      setCategoryName(category?.name || categoryId);
      setLoading(false);
    }
  }, [categoryId]);

  // Generate placeholder image URL based on category
  const getCategoryPlaceholder = (categoryId: string) => {
    return `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=768&q=80`;
  };

  return (
    <PageContainer 
      title={categoryName} 
      showBackButton={true}
      className="px-4"
    >
      <div className="mb-6">
        <div className="w-full h-40 relative mb-4">
          <img 
            src={getCategoryPlaceholder(categoryId || "")}
            alt={categoryName}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-2xl font-bold text-white">{categoryName}</h1>
            <p className="text-white/80 text-sm">{products.length} items</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>No products found in this category.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default CategoryPage;
