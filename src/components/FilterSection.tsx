
import { Badge } from "@/components/ui/badge";

interface FilterSectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All",
  "Toys",
  "Home Decor",
  "Gadgets",
  "Art",
  "Tools",
  "Mechanical",
];

export const FilterSection = ({
  selectedCategory,
  onCategoryChange,
}: FilterSectionProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-6">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
            selectedCategory === category
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};
