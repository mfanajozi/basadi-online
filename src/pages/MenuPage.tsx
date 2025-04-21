
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/food/ProductCard";
import { categories } from "@/data/categories";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory } from "@/data/products";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const navigate = useNavigate();
  const categoryProducts = getProductsByCategory(activeCategory);

  return (
    <PageContainer title="Menu">
      <div className="px-4">
        {/* Categories Accordion */}
        <div className="py-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <Accordion type="single" collapsible>
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getProductsByCategory(category.id).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Products */}
        {/*
        <div className="pb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{categories.find(c => c.id === activeCategory)?.name || ""}</h2>
            <button 
              className="text-gold-500 text-sm"
              onClick={() => navigate(`/category/${activeCategory}`)}
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        </div>
        */}
      </div>
    </PageContainer>
  );
};

export default MenuPage;
