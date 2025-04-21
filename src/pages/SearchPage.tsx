
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/food/ProductCard";
import { Search } from "lucide-react";
import { products } from "@/data/products";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.product.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query)
      )
    );
  });

  return (
    <PageContainer 
      title="Search" 
      showBackButton 
      showSearch={false}
    >
      <div className="container-custom py-4">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search products, categories, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchQuery && filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found for "{searchQuery}"
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
