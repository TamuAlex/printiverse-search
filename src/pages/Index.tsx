
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { FilterSection } from "@/components/FilterSection";
import { ModelCard } from "@/components/ModelCard";

// Mock data for demonstration
const mockModels = [
  {
    id: 1,
    title: "Low Poly Fox",
    description: "A cute low poly fox model perfect for desktop 3D printing.",
    imageUrl: "https://picsum.photos/seed/1/400",
    fileFormats: ["STL", "OBJ"],
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 2,
    title: "Geometric Planter",
    description: "Modern geometric planter with drainage holes.",
    imageUrl: "https://picsum.photos/seed/2/400",
    fileFormats: ["STL", "3MF"],
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 3,
    title: "Phone Stand",
    description: "Adjustable phone stand with cable management.",
    imageUrl: "https://picsum.photos/seed/3/400",
    fileFormats: ["STL"],
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: 4,
    title: "Desk Organizer",
    description: "Modular desk organizer for office supplies.",
    imageUrl: "https://picsum.photos/seed/4/400",
    fileFormats: ["STL", "OBJ", "3MF"],
    downloadUrl: "#",
    viewUrl: "#",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement actual search logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            3D Model Search
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect 3D printable model for your next project
          </p>
          <SearchInput onSearch={handleSearch} />
        </div>

        <FilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-fade-in-up">
          {mockModels.map((model) => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
