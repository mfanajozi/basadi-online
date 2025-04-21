
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { CategoryCard } from "@/components/food/CategoryCard";
import { ProductCard } from "@/components/food/ProductCard";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getPopularProducts, Product } from "@/data/products";

const Index = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts(4));
    setPopularProducts(getPopularProducts(4));
  }, []);

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="relative w-full h-64 mb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Basadi's Kitchen</h1>
          <p className="text-xl mb-4">Delicious food delivered to your door</p>
          <Button 
            className="bg-gold hover:bg-gold-600 text-black"
            onClick={() => navigate('/menu')}
          >
            Order Now
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="py-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <Button 
            variant="link" 
            className="text-gold-500 hover:text-gold-700"
            onClick={() => navigate('/menu')}
          >
            See All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-6 px-4 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Items</h2>
          <Button 
            variant="link" 
            className="text-gold-500 hover:text-gold-700"
            onClick={() => navigate('/menu')}
          >
            See All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Popular Products */}
      <div className="py-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popular Items</h2>
          <Button 
            variant="link" 
            className="text-gold-500 hover:text-gold-700"
            onClick={() => navigate('/menu')}
          >
            See All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </div>

      {/* About and Info */}
      <div className="py-6 px-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">About Basadi's Kitchen</h2>
        <p className="text-gray-700 mb-4">
          Basadi's Kitchen and Confectionery serves delicious local food. We offer delivery within 5km of our location or you can collect your order at our store.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-bold mr-2">Delivery:</span>
            <span>Within 5km radius</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-2">Payment:</span>
            <span>Cash, Card, Online payment</span>
          </div>
          <Button 
            className="bg-gold hover:bg-gold-600 text-black mt-4"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
