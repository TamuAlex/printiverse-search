
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchInput } from "@/components/SearchInput";
import { FilterSection } from "@/components/FilterSection";
import { ModelCard } from "@/components/ModelCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Heart, MessageSquare, BookmarkCheck, Calendar } from "lucide-react";
import { fetchModels } from "@/services/api";

interface Model {
  id: number;
  name: string;
  thumbnail: string;
  public_url: string;
  creator_name: string;
  creator_url: string;
  f_added: string;
  like_count: number;
  collect_count: number;
  comment_count: number;
  is_nsfw: boolean;
  tags: string[];
  creator_thumbnail: string;
  price: string;
  description: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const { data: models = [], isLoading, error, isError } = useQuery({
    queryKey: ['models', searchQuery, selectedCategory],
    queryFn: () => fetchModels(searchQuery, { category: selectedCategory }),
    enabled: searchQuery.length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

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
          <img 
            src="/lovable-uploads/0d84b7f9-8624-4a6c-ac49-a9e8b0d0d904.png" 
            alt="Modelarium Logo" 
            className="h-24 mx-auto mb-8"
          />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect 3D printable model for your next project
          </p>
          <SearchInput onSearch={handleSearch} />
        </div>

        <FilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading models...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              Error loading models: {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
          </div>
        )}

        {!isLoading && !isError && models.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No models found. Try a different search term.</p>
          </div>
        )}

        {!isLoading && !isError && models.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-fade-in-up">
            {models.map((model) => (
              <ModelCard 
                key={model.id}
                title={model.name}
                description={model.description}
                imageUrl={model.thumbnail}
                fileFormats={[]}
                downloadUrl={model.public_url}
                viewUrl={model.public_url}
                likeCount={model.like_count}
                collectCount={model.collect_count}
                onClick={() => setSelectedModel(model)}
              />
            ))}
          </div>
        )}

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
                    {selectedModel.price !== "free" && (
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedModel.price}
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
                      {formatDate(selectedModel.f_added)}
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

                  {selectedModel.tags && selectedModel.tags.length > 0 && (
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
                  )}

                  <div className="flex justify-center pt-6">
                    <a
                      href={selectedModel.public_url}
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
