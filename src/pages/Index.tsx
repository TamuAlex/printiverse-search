import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { FilterSection } from "@/components/FilterSection";
import { ModelCard } from "@/components/ModelCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Heart, MessageSquare, BookmarkCheck, Calendar } from "lucide-react";

interface Model {
  id: number;
  name: string;
  thumbnail: string;
  url: string;
  creator_name: string;
  creator_url: string;
  date_added: string;
  like_count: number;
  collect_count: number;
  comment_count: number;
  tags: string[];
  price: number;
  description: string;
}

// Mock data for demonstration
const mockModels: Model[] = [
  {
    id: 1,
    name: "Low Poly Fox",
    thumbnail: "https://picsum.photos/seed/1/400",
    url: "#",
    creator_name: "3DCreator",
    creator_url: "#",
    date_added: "2024-02-15",
    like_count: 245,
    collect_count: 120,
    comment_count: 35,
    tags: ["animals", "low-poly", "cute", "desktop"],
    price: 0,
    description: "A cute low poly fox model perfect for desktop 3D printing. This detailed model features low-poly aesthetics while maintaining the characteristic features of a fox. Perfect for beginners and experienced makers alike.",
  },
  {
    id: 2,
    name: "Geometric Planter",
    thumbnail: "https://picsum.photos/seed/2/400",
    url: "#",
    creator_name: "PlantLover3D",
    creator_url: "#",
    date_added: "2024-02-16",
    like_count: 189,
    collect_count: 85,
    comment_count: 20,
    tags: ["plants", "geometric", "planter"],
    price: 0,
    description: "Modern geometric planter with drainage holes. Features a contemporary design with multiple faces that create interesting light patterns. Includes a built-in drainage system and raised base.",
  },
  {
    id: 3,
    name: "Phone Stand",
    thumbnail: "https://picsum.photos/seed/3/400",
    url: "#",
    creator_name: "TechPrints",
    creator_url: "#",
    date_added: "2024-02-17",
    like_count: 324,
    collect_count: 150,
    comment_count: 30,
    tags: ["electronics", "phone", "stand"],
    price: 0,
    description: "Adjustable phone stand with cable management. This ergonomic stand can be adjusted to multiple viewing angles and includes clever cable routing to keep your charging cables tidy.",
  },
  {
    id: 4,
    name: "Desk Organizer",
    thumbnail: "https://picsum.photos/seed/4/400",
    url: "#",
    creator_name: "OfficePro",
    creator_url: "#",
    date_added: "2024-02-18",
    like_count: 421,
    collect_count: 210,
    comment_count: 40,
    tags: ["office", "organizer", "supplies"],
    price: 0,
    description: "Modular desk organizer for office supplies. This customizable organizer system includes multiple compartments for pens, paper clips, and other office essentials. Modules can be printed separately and connected.",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredModels = mockModels.filter((model) => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery) ||
      model.description.toLowerCase().includes(searchQuery) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    
    const matchesCategory = 
      selectedCategory === "All" || 
      model.tags.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          {filteredModels.map((model) => (
            <ModelCard 
              key={model.id}
              title={model.name}
              description={model.description}
              imageUrl={model.thumbnail}
              fileFormats={[]}
              downloadUrl={model.url}
              viewUrl={model.url}
              likeCount={model.like_count}
              collectCount={model.collect_count}
              onClick={() => setSelectedModel(model)}
            />
          ))}
        </div>

        <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
          <DialogContent className="max-w-4xl">
            {selectedModel && (
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedModel.thumbnail}
                    alt={selectedModel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-bold">{selectedModel.name}</h2>
                    {selectedModel.price > 0 && (
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${selectedModel.price}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <a 
                      href={selectedModel.creator_url}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      By {selectedModel.creator_name}
                    </a>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedModel.date_added)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {selectedModel.like_count} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <BookmarkCheck className="w-4 h-4" />
                      {selectedModel.collect_count} collections
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {selectedModel.comment_count} comments
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedModel.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedModel.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center pt-6">
                    <a
                      href={selectedModel.url}
                      className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Model
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
