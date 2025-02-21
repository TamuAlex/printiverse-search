import { useState, useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { fetchModels } from "@/services/api";
import { HeroSection } from "@/components/home/HeroSection";
import { ModelGrid } from "@/components/home/ModelGrid";
import { ModelDetails } from "@/components/home/ModelDetails";
import { LoadingState } from "@/components/home/LoadingState";
import { SEO } from "@/components/SEO";

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
  tags: any[];
  creator_thumbnail: string;
  price: string;
  description: string;
  repo: string;
}

const Index = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [sortBy, setSortBy] = useState("date");
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 20;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['models', searchQuery, selectedCategory, selectedRepos],
    queryFn: ({ pageParam = 1 }) => fetchModels(
      searchQuery, 
      { 
        category: selectedCategory, 
        repositories: selectedRepos.length > 0 ? selectedRepos : undefined,
        page: pageParam,
        sortBy,
        nsfwEnabled
      }
    ),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined;
    },
    enabled: searchQuery.length > 0,
    initialPageParam: 1,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
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
      rootMargin: "100px",
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
      <SEO 
        title={t('home.title')}
        description={t('home.description')}
        image="/og-image.png"
      />
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <HeroSection 
          onSearch={handleSearch}
          selectedCategory={selectedCategory}
          selectedRepos={selectedRepos}
          onCategoryChange={setSelectedCategory}
          onReposChange={setSelectedRepos}
          sortBy={sortBy}
          onSortChange={setSortBy}
          nsfwEnabled={nsfwEnabled}
          onNsfwChange={setNsfwEnabled}
        />

        {!searchQuery && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.unifiedSearch.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.features.unifiedSearch.description')}</p>
            </div>

            <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.comprehensiveResults.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.features.comprehensiveResults.description')}</p>
            </div>

            <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.smartFiltering.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.features.smartFiltering.description')}</p>
            </div>
          </div>
        )}

        {status === 'pending' && searchQuery && <LoadingState />}

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
            <ModelGrid models={models} onModelClick={setSelectedModel} />
            <div ref={observerTarget} className="h-10 mt-4">
              {isFetchingNextPage && (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {t('home.loadingMore')}
                </p>
              )}
            </div>
          </>
        )}

        <ModelDetails 
          model={selectedModel} 
          onClose={() => setSelectedModel(null)} 
        />
      </div>
    </div>
  );
};

export default Index;
