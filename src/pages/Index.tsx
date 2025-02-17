import { useState, useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/SearchInput";
import { FilterSection } from "@/components/FilterSection";
import { ModelCard } from "@/components/ModelCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Heart, MessageSquare, BookmarkCheck, Calendar } from "lucide-react";
import { fetchModels } from "@/services/api";
import { Header } from "@/components/Header";

interface Tag {
  absolute_url?: string;
  count?: number;
  name: string;
  tag?: string;
  things_url?: string;
  url?: string;
}

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
  tags: Tag[];
  creator_thumbnail: string;
  price: string;
  description: string;
}

const Index = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['models', searchQuery, selectedCategory],
    queryFn: ({ pageParam = 1 }) => fetchModels(searchQuery, { category: selectedCategory }, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
    enabled: searchQuery.length > 0,
    initialPageParam: 1,
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

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onIntersect]);

  const models = data?.pages.flat() || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center space-y-6 animate-fade-in">
          <img 
            src="/lovable-uploads/0d84b7f9-8624-4a6c-ac49-a9e8b0d0d904.png" 
            alt="Modelarium Logo" 
            className="h-24 mx-auto mb-8"
          />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.title')}
          </p>
          <SearchInput onSearch={handleSearch} />
        </div>

        <FilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {status === 'pending' && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">{t('home.loading')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              {t('home.error')} {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
          </div>
        )}

        {status === 'success' && models.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">{t('home.noResults')}</p>
          </div>
        )}

        {status === 'success' && models.length > 0 && (
          <>
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
            
            <div 
              ref={observerTarget}
              className="h-10 mt-4"
            >
              {isFetchingNextPage && (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {t('home.loadingMore')}
                </p>
              )}
            </div>
          </>
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
                      {selectedModel.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 dark:bg-gray-800"
                        >
                          {typeof tag === 'string' ? tag : tag.name}
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
                      {t('home.downloadModel')}
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
