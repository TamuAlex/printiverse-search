import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { FilterSection } from "@/components/FilterSection";
import { ModelCard } from "@/components/ModelCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";

// Mock data for demonstration
const mockModels = [
  {
    id: 1,
    title: "Low Poly Fox",
    description: "A cute low poly fox model perfect for desktop 3D printing. This detailed model features low-poly aesthetics while maintaining the characteristic features of a fox. Perfect for beginners and experienced makers alike.",
    imageUrl: "https://picsum.photos/seed/1/400",
    fileFormats: ["STL", "OBJ"],
    downloadUrl: "#",
    viewUrl: "#",
    author: "3DCreator",
    likes: 245,
    downloads: 1200,
  },
  {
    id: 2,
    title: "Geometric Planter",
    description: "Modern geometric planter with drainage holes. Features a contemporary design with multiple faces that create interesting light patterns. Includes a built-in drainage system and raised base.",
    imageUrl: "https://picsum.photos/seed/2/400",
    fileFormats: ["STL", "3MF"],
    downloadUrl: "#",
    viewUrl: "#",
    author: "PlantLover3D",
    likes: 189,
    downloads: 856,
  },
  {
    id: 3,
    title: "Phone Stand",
    description: "Adjustable phone stand with cable management. This ergonomic stand can be adjusted to multiple viewing angles and includes clever cable routing to keep your charging cables tidy.",
    imageUrl: "https://picsum.photos/seed/3/400",
    fileFormats: ["STL"],
    downloadUrl: "#",
    viewUrl: "#",
    author: "TechPrints",
    likes: 324,
    downloads: 1500,
  },
  {
    id: 4,
    title: "Desk Organizer",
    description: "Modular desk organizer for office supplies. This customizable organizer system includes multiple compartments for pens, paper clips, and other office essentials. Modules can be printed separately and connected.",
    imageUrl: "https://picsum.photos/seed/4/400",
    fileFormats: ["STL", "OBJ", "3MF"],
    downloadUrl: "#",
    viewUrl: "#",
    author: "OfficePro",
    likes: 421,
    downloads: 2100,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<typeof mockModels[0] | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredModels = mockModels.filter((model) => {
    const matchesSearch = 
      model.title.toLowerCase().includes(searchQuery) ||
      model.description.toLowerCase().includes(searchQuery);
    
    const matchesCategory = 
      selectedCategory === "All" || 
      model.title.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

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
          {filteredModels.map((model) => (
            <ModelCard 
              key={model.id} 
              {...model} 
              onClick={() => setSelectedModel(model)}
            />
          ))}
        </div>

        <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
          <DialogContent className="max-w-2xl">
            {selectedModel && (
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedModel.imageUrl}
                    alt={selectedModel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{selectedModel.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedModel.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>By {selectedModel.author}</span>
                    <div className="flex gap-4">
                      <span>{selectedModel.likes} likes</span>
                      <span>{selectedModel.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedModel.fileFormats.map((format) => (
                      <Badge
                        key={format}
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-800"
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <a
                      href={selectedModel.viewUrl}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Eye className="w-4 h-4" />
                      View Model
                    </a>
                    <a
                      href={selectedModel.downloadUrl}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
