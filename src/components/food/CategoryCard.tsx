
import { useNavigate } from "react-router-dom";

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="w-full h-32 relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/300x200/FFD700/000000?text=${category.name}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4 w-full">
        <h3 className="font-bold text-lg text-center">{category.name}</h3>
      </div>
    </div>
  );
}
